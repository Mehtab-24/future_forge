const { Router } = require('express');
const { z } = require('zod');
const { variantSchema, variantSchemaTextForPrompt } = require('../schemas/simulation');
const { butterflyPrompt } = require('../prompts/butterfly');
const { tryJsonParse, jsonRepair } = require('../utils/jsonrepair');
const { generateOnce, generateStream } = require('../lib/openai');
// const { requireAuth } = require('../middlewares/auth'); // Removed auth requirement for simulation variant

const router = Router();

const intakeSchema = z.object({
  user_skills: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  constraints: z.array(z.string()).default([]),
  one_change: z.string().min(1, 'one_change is required'),
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
    const { user_skills, interests, constraints, one_change } = intakeSchema.parse(req.body || {});
    const schemaText = variantSchemaTextForPrompt();
    const prompt = butterflyPrompt({ user_skills, interests, constraints }, one_change, schemaText);
    const streaming = req.query.stream === '1';

    if (isMock(req)) {
      const mock = {
        role_title: "Frontend Developer (Variant Mock)",
        success_probability: 80,
        estimated_salary_range: { min: 85000, max: 125000 },
        summary: "A specialized frontend path focusing on UI/UX patterns.",
        timeline: [
          { 
            phase: "Week 1", 
            duration: "1 week",
            goals: ["Setup"], 
            milestones: ["Scaffold"], 
            projects: ["Component Library"],
            risks: ["Time"], 
            checkpoints: ["Repo ready"],
            skills_developed: ["UI Design", "Figma"]
          }
        ],
        skill_gaps: ["Testing"],
        action_stack: [{ 
          type: "practice", 
          title: "UI patterns", 
          description: "Build small comps", 
          priority: "high",
          why: "Key for role",
          effort: "medium",
          estimated_weeks: 1 
        }],
        rationale: "Minor shift based on one_change",
        deltas: [{ phase: "Week 1", field: "milestones", change: "More UI-focused tasks" }],
        comparison_summary: "This path offers a more specialized route into frontend development with a higher focus on design systems."
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
        });
      }
      const valid = variantSchema.safeParse(parsed.value);
      if (!valid.success) {
        return res.status(502).json({
          code: 'SCHEMA_VALIDATION_FAILED',
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
        sse(res, 'error', { code: 'MODEL_JSON_PARSE_FAILED' });
        sse(res, 'end', 'error');
        return res.end();
      }
      const valid = variantSchema.safeParse(parsed.value);
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