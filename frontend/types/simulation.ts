export interface IntakeData {
  skills: string[];
  interests: string[];
  constraints: string[];
  oneChange?: string;
}

export interface Timeline {
  phase: string;
  duration: string;
  goals: string[];
  projects: string[];
  risks: string[];
  checkpoints: string[];
  skills_developed: string[];
}

export interface SimulationResult {
  role_title: string;
  summary: string;
  timeline: Timeline[];
  skill_gaps: string[];
  action_stack: ActionItem[];
  rationale: string;
  success_probability: number;
  estimated_salary_range: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface ActionItem {
  id: string;
  type: "course" | "project" | "certification" | "experience";
  title: string;
  description: string;
  why: string;
  effort: string;
  duration_weeks: number;
  priority: "high" | "medium" | "low";
  cost_estimate?: number;
  prerequisites?: string[];
}

export interface VariantResult extends SimulationResult {
  deltas: {
    phase: string;
    change: string;
    impact: string;
    probability_change: number;
  }[];
  comparison_summary: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  description: string;
}
