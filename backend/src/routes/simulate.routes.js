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
        role_title: "Senior Frontend Engineer (Mock)",
        success_probability: 92,
        estimated_salary_range: { min: 95000, max: 145000 },
        summary: "This path targets a high-velocity career trajectory in modern frontend engineering, focusing on scalable architecture, performance optimization, and leadership skills.",
        timeline: [
          { 
            phase: "Phase 1: Foundations & Architecture", 
            duration: "Weeks 1-4",
            goals: ["Master React Internal Architecture", "Advanced TypeScript Patterns"], 
            milestones: ["Build Custom Hook Library", "Contribute to Open Source"], 
            projects: ["SaaS Dashboard with Real-time Data"],
            risks: ["Tutorial Hell", "Over-engineering simple solutions"], 
            checkpoints: ["Deploy to Vercel with CI/CD", "100% Unit Test Coverage"],
            skills_developed: ["React 18", "TypeScript", "Vite", "Jest"]
          },
          { 
            phase: "Phase 2: Performance & Scale", 
            duration: "Weeks 5-8",
            goals: ["Web Vitals Optimization", "State Management Mastery"], 
            milestones: ["Reduce Bundle Size by 40%", "Implement Server-Side Rendering"], 
            projects: ["E-commerce Platform with Next.js"],
            risks: ["Premature Optimization", "Complexity Creep"], 
            checkpoints: ["Lighthouse Score > 95", "Implement Redis Caching"],
            skills_developed: ["Next.js", "Redis", "GraphQL", "Performance Profiling"]
          }
        ],
        skill_gaps: ["System Design", "Cloud Infrastructure (AWS/GCP)"],
        action_stack: [
          { 
            type: "learn", 
            title: "Advanced React Patterns", 
            description: "Deep dive into Compound Components, Render Props, and Custom Hooks.", 
            priority: "high",
            why: "Essential for building maintainable enterprise-grade applications.",
            effort: "high",
            estimated_weeks: 2 
          },
          { 
            type: "project", 
            title: "Full-Stack MERN Application", 
            description: "Build and deploy a production-ready social media clone.", 
            priority: "medium",
            why: "Demonstrates end-to-end capability to potential employers.",
            effort: "high",
            estimated_weeks: 4 
          },
          { 
            type: "network", 
            title: "Tech Conference Speaking", 
            description: "Submit a CFP to a local meetup or conference.", 
            priority: "low",
            why: "Builds authority and personal brand in the industry.",
            effort: "medium",
            estimated_weeks: 1 
          }
        ],
        rationale: "Optimized for maximum market value and long-term career growth."
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
