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
        role_title: "Product-Minded Engineer (Variant Mock)",
        success_probability: 88,
        estimated_salary_range: { min: 90000, max: 135000 },
        summary: "A specialized path merging technical prowess with product strategy. Ideal for roles in high-growth startups or product-led growth companies.",
        timeline: [
          { 
            phase: "Phase 1: Product & UX Focus", 
            duration: "Weeks 1-4",
            goals: ["Understand User Psychology", "Master Figma for Devs"], 
            milestones: ["Design System Implementation", "User Journey Mapping"], 
            projects: ["Interactive Product Prototype"],
            risks: ["Losing Technical Depth", "Scope Creep"], 
            checkpoints: ["Conduct 5 User Interviews", "Prototype validated"],
            skills_developed: ["UI/UX Design", "Figma", "User Research"]
          },
          { 
            phase: "Phase 2: MVP & Iteration", 
            duration: "Weeks 5-8",
            goals: ["Rapid Prototyping", "A/B Testing Frameworks"], 
            milestones: ["Launch MVP to Beta Users", "Implement Feature Flags"], 
            projects: ["Growth Hacking Dashboard"],
            risks: ["Technical Debt accumulation", "Burnout"], 
            checkpoints: ["100 Active Users", "Weekly Release Cycle"],
            skills_developed: ["Analytics", "Feature Flagging", "Growth Engineering"]
          }
        ],
        skill_gaps: ["Data Analysis (SQL)", "Marketing Automation"],
        action_stack: [
          { 
            id: "var_act_1",
            type: "practice", 
            title: "Design Systems Engineering", 
            description: "Build a reusable component library with Storybook.", 
            priority: "high",
            why: "Bridges the gap between design and engineering.",
            effort: "medium",
            duration_weeks: 3,
            estimated_weeks: 3,
            cost_estimate: 150
          },
          { 
            id: "var_act_2",
            type: "learn", 
            title: "Product Metrics", 
            description: "Master Mixpanel or Amplitude for user tracking.", 
            priority: "medium",
            why: "Data-driven decisions are key for product engineers.",
            effort: "low",
            duration_weeks: 1,
            estimated_weeks: 1,
            cost_estimate: 50
          }
        ],
        rationale: "Shift towards product impact rather than pure code optimization.",
        deltas: [
          { 
            phase: "Phase 1: Product & UX Focus", 
            field: "goals", 
            change: "Shift from 'Architecture' to 'User Psychology'" 
          },
          { 
            phase: "Phase 1: Product & UX Focus", 
            field: "projects", 
            change: "Replaced 'SaaS Dashboard' with 'Interactive Prototype'" 
          }
        ],
        comparison_summary: "This variant prioritizes product impact and user experience over deep system architecture. It offers faster feedback loops but requires broader soft skills."
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
