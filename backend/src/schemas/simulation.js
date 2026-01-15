const { z } = require('zod');

const timelineEntry = z.object({
  phase: z.string().min(1),
  duration: z.string().min(1),
  goals: z.array(z.string().min(1)).min(1),
  milestones: z.array(z.string().min(1)).min(1),
  projects: z.array(z.string().min(1)).min(1),
  risks: z.array(z.string().min(1)).min(1),
  checkpoints: z.array(z.string().min(1)).min(1),
  skills_developed: z.array(z.string().min(1)).min(1),
});

const actionItem = z.object({
  type: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  estimated_weeks: z.number().int().min(0),
});

const baselineSchema = z.object({
  role_title: z.string().min(1),
  success_probability: z.number().int().min(0).max(100),
  estimated_salary_range: z.object({
    min: z.number().int().min(0),
    max: z.number().int().min(0),
  }),
  summary: z.string().min(1),
  timeline: z.array(timelineEntry).min(1),
  skill_gaps: z.array(z.string().min(1)).min(0),
  action_stack: z.array(actionItem).min(1),
  rationale: z.string().min(1),
});

const variantSchema = baselineSchema.extend({
  deltas: z.array(z.object({
    field: z.enum(['goals', 'milestones', 'risks', 'checkpoints']).optional(),
    description: z.string().min(1),
  })).min(1),
});

function schemaTextForPrompt() {
  return `
{
  "role_title": string,
  "success_probability": number, // 0-100
  "estimated_salary_range": {
    "min": number,
    "max": number
  },
  "summary": string,
  "timeline": [
    {
      "phase": string,
      "duration": string,
      "goals": string[],
      "milestones": string[],
      "projects": string[],
      "risks": string[],
      "checkpoints": string[]
    }
  ],
  "skill_gaps": string[],
  "action_stack": [
    {
      "type": string,
      "title": string,
      "description": string,
      "estimated_weeks": number
    }
  ],
  "rationale": string
}
`.trim();
}

function variantSchemaTextForPrompt() {
  return `
{
  "role_title": string,
  "timeline": [
    {
      "phase": string,
      "goals": string[],
      "milestones": string[],
      "projects": string[],
      "risks": string[],
      "checkpoints": string[],
      "skills_developed": string[]
    }
  ],
  "skill_gaps": string[],
  "action_stack": [
    {
      "type": string,
      "title": string,
      "description": string,
      "estimated_weeks": number
    }
  ],
  "rationale": string,
  "deltas": [
    {
      "field": "goals" | "milestones" | "risks" | "checkpoints",
      "description": string
    }
  ]
}
`.trim();
}

module.exports = {
  baselineSchema,
  variantSchema,
  schemaTextForPrompt,
  variantSchemaTextForPrompt,
};