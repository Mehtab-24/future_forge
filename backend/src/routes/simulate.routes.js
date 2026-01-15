const { Router } = require('express');
const { z } = require('zod');
const { baselineSchema, schemaTextForPrompt } = require('../schemas/simulation');
const { baselinePrompt } = require('../prompts/baseline');
const { tryJsonParse, jsonRepair } = require('../utils/jsonrepair');
const { generateOnce, generateStream } = require('../lib/openai');
// const { requireAuth } = require('../middlewares/auth'); // Removed auth requirement for simulation

const router = Router();

const intakeSchema = z.object({
  user_skills: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  constraints: z.array(z.string()).default([]),
});

function strictSuffix() {
  return '\n\nReturn only valid JSON. No prose, no backticks, no code fences.';
}

function isMock(req) {
  return process.env.MOCK_MODE === '1' || req.query.mock === '1';
}

function sseInit(res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();
}

function sse(res, event, data) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${typeof data === 'string' ? data : JSON.stringify(data)}\n\n`);
}

router.post('/', async (req, res, next) => { // Removed requireAuth middleware
  try {
    const { user_skills, interests, constraints } = intakeSchema.parse(req.body || {});
    const schemaText = schemaTextForPrompt();
    const prompt = baselinePrompt({ user_skills, interests, constraints }, schemaText);
    const streaming = req.query.stream === '1';

    if (isMock(req)) {
      const mock = {
        role_title: "Frontend Developer (Mock)",
        success_probability: 85,
        estimated_salary_range: { min: 80000, max: 120000 },
        summary: "This path focuses on rapid acquisition of React and modern frontend tools. High success probability due to high demand.",
        timeline: [
          { 
            phase: "Week 1", 
            duration: "1 week",
            goals: ["Setup"], 
            milestones: ["Scaffold"], 
            projects: ["Personal Portfolio"],
            risks: ["Time"], 
            checkpoints: ["Repo ready"],
            skills_developed: ["React", "CSS"]
          }
        ],
        skill_gaps: ["Testing"],
        action_stack: [{ 
          type: "learn", 
          title: "React basics", 
          description: "Docs & tutorials", 
          priority: "high",
          why: "Core requirement",
          effort: "medium",
          estimated_weeks: 1 
        }],
        rationale: "Starter path for demo"
      };
      if (streaming) {
        sseInit(res);
        sse(res, 'delta', JSON.stringify(mock).slice(0, 50) + '...');
        sse(res, 'result', mock);
        sse(res, 'end', 'ok');
        return res.end();
      }
      return res.json(mock);
    }

    if (!streaming) {
      let text = await generateOnce(prompt);
      let parsed = tryJsonParse(text);
      if (!parsed.ok) {
        text = await generateOnce(prompt + strictSuffix(), { maxOutputTokens: 768 });
        parsed = tryJsonParse(text);
      }
      if (!parsed.ok) {
        const repaired = jsonRepair(text);
        if (repaired.ok) parsed = repaired;
      }
      if (!parsed.ok) {
        return res.status(502).json({
          code: 'MODEL_JSON_PARSE_FAILED',
          message: 'Model output was not valid JSON after retry and repair',
          hint: 'Try again or simplify inputs',
        });
      }
      const valid = baselineSchema.safeParse(parsed.value);
      if (!valid.success) {
        return res.status(502).json({
          code: 'SCHEMA_VALIDATION_FAILED',
          message: 'Output did not match required schema',
          issues: valid.error.issues,
        });
      }
      return res.json(valid.data);
    } else {
      sseInit(res);
      let buffer = '';
      const text = await generateStream(prompt + strictSuffix(), { maxOutputTokens: 768 }, (delta) => {
        buffer += delta;
        sse(res, 'delta', delta);
      });

      let parsed = tryJsonParse(text);
      if (!parsed.ok) {
        const repaired = jsonRepair(text);
        if (repaired.ok) parsed = repaired;
      }
      if (!parsed.ok) {
        sse(res, 'error', { code: 'MODEL_JSON_PARSE_FAILED', message: 'Unable to parse streamed JSON' });
        sse(res, 'end', 'error');
        return res.end();
      }
      const valid = baselineSchema.safeParse(parsed.value);
      if (!valid.success) {
        sse(res, 'error', { code: 'SCHEMA_VALIDATION_FAILED', issues: valid.error.issues });
        sse(res, 'end', 'error');
        return res.end();
      }
      sse(res, 'result', valid.data);
      sse(res, 'end', 'ok');
      return res.end();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;