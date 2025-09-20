"use client";
import { useState, useEffect } from "react";
import {
  Brain,
  Zap,
  TrendingUp,
  Target,
  ArrowLeft,
  BarChart3,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import {
  SimulationResult,
  VariantResult,
  IntakeData,
  Timeline,
  ActionItem,
} from "@/types/simulation";
import Navigation from "./Navigation";
import TimelineCard from "./TimelineCard";
import ActionStack from "./ActionStack";

interface SimulationViewProps {
  intakeData: IntakeData;
}

export default function SimulationView({ intakeData }: SimulationViewProps) {
  const [baseline, setBaseline] = useState<SimulationResult | null>(null);
  const [variant, setVariant] = useState<VariantResult | null>(null);
  const [loading, setLoading] = useState({ baseline: true, variant: false });
  const [loadingStage, setLoadingStage] = useState(
    "Initializing quantum simulation..."
  );
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    simulateBaseline();
  }, []);

  const simulateBaseline = async () => {
    setLoading((prev) => ({ ...prev, baseline: true }));

    const stages = [
      "Initializing quantum simulation...",
      "Analyzing skill matrix and interests...",
      "Processing market trends and opportunities...",
      "Calculating probability vectors...",
      "Generating timeline trajectories...",
      "Optimizing career pathways...",
      "Finalizing recommendations...",
    ];

    for (let i = 0; i < stages.length; i++) {
      setLoadingStage(stages[i]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    const mockData: SimulationResult = {
      role_title: generateRoleTitle(intakeData),
      summary: generateSummary(intakeData),
      timeline: generateTimeline(intakeData),
      skill_gaps: generateSkillGaps(intakeData),
      action_stack: generateActionStack(intakeData),
      rationale: generateRationale(intakeData),
      success_probability: Math.floor(Math.random() * 15) + 75,
      estimated_salary_range: {
        min: 85000,
        max: 140000,
        currency: "USD",
      },
    };

    setBaseline(mockData);
    setLoading((prev) => ({ ...prev, baseline: false }));
  };

  const simulateVariant = async () => {
    if (!intakeData.oneChange) return;

    setLoading((prev) => ({ ...prev, variant: true }));

    const stages = [
      "Applying butterfly effect parameters...",
      "Recalculating probability matrices...",
      "Generating alternative timelines...",
      "Computing impact differentials...",
      "Finalizing variant simulation...",
    ];

    for (let i = 0; i < stages.length; i++) {
      setLoadingStage(stages[i]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    const mockVariant: VariantResult = generateVariantResult(
      intakeData,
      baseline
    );

    setVariant(mockVariant);
    setLoading((prev) => ({ ...prev, variant: false }));
  };

  const exportPlan = () => {
    const content = generateExportContent(intakeData, baseline, variant);

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `futureforge-career-plan-${
      new Date().toISOString().split("T")[0]
    }.md`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification(
      "Career plan exported successfully! Check your downloads folder."
    );
  };

  const showNotification = (message: string) => {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-20 right-4 glass-card p-4 text-white z-50 neon-glow-cyan animate-[slideInRight_0.5s_ease-out] flex items-center space-x-3";
    notification.innerHTML = `
      <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.5s ease-in both";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <Navigation />

      {/* Hero Section */}
      <div className="pt-28 pb-12 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl float-animation"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-cyan-400 text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4 mr-2" />
              Career Simulation Results
            </div>

            <h1 className="text-5xl md:text-6xl font-black font-['Orbitron'] mb-4">
              <span className="text-gradient-primary">Career</span>{" "}
              <span className="text-gradient-accent">Simulation</span> Results
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Your personalized journey through parallel career universes
            </p>

            {/* User profile summary */}
            <div className="glass-card p-6 mt-8 max-w-4xl mx-auto neon-glow-cyan">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="text-cyan-400 font-bold mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Skills Portfolio
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {intakeData.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs border border-cyan-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                    {intakeData.skills.length > 4 && (
                      <span className="px-2 py-1 bg-slate-600/30 text-slate-400 rounded-lg text-xs border border-slate-500/30">
                        +{intakeData.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-purple-400 font-bold mb-3 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Career Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {intakeData.interests.slice(0, 3).map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs border border-purple-500/30"
                      >
                        {interest}
                      </span>
                    ))}
                    {intakeData.interests.length > 3 && (
                      <span className="px-2 py-1 bg-slate-600/30 text-slate-400 rounded-lg text-xs border border-slate-500/30">
                        +{intakeData.interests.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-emerald-400 font-bold mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Butterfly Factor
                  </h4>
                  <p className="text-slate-300 text-xs bg-slate-800/50 p-2 rounded-lg border border-slate-600/30">
                    {intakeData.oneChange || "No alternative path specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Results Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
            {/* Baseline Column */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-white flex items-center font-['Orbitron']">
                  <Target className="w-8 h-8 mr-4 text-cyan-400" />
                  Primary Timeline
                </h2>
                {loading.baseline && (
                  <div className="text-cyan-400 font-mono text-sm animate-pulse flex items-center">
                    <Brain className="w-4 h-4 mr-2 animate-spin" />
                    {loadingStage}
                  </div>
                )}
              </div>

              {loading.baseline && (
                <div className="text-center py-20">
                  <div className="relative mb-8">
                    <Brain className="w-24 h-24 text-cyan-400 mx-auto animate-pulse mb-4" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-4">
                    AI Quantum Simulation in Progress
                  </h3>
                  <p className="text-slate-400 text-lg mb-6">{loadingStage}</p>
                  <div className="max-w-md mx-auto bg-slate-800/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full animate-pulse transition-all duration-1000"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <p className="text-slate-500 text-sm mt-4 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analyzing thousands of career data points...
                  </p>
                </div>
              )}

              {baseline && (
                <>
                  {/* Role Summary Card */}
                  <div className="glass-card p-6 mb-8 neon-glow-cyan">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-black mb-4 text-gradient-accent">
                        {baseline.role_title}
                      </h3>
                      <div className="grid grid-cols-2 gap-6 mb-4">
                        <div className="text-center glass-card p-4 bg-green-500/10 border border-green-500/20">
                          <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                            <div className="text-2xl font-black text-green-400">
                              {baseline.success_probability}%
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            Success Probability
                          </div>
                        </div>
                        <div className="text-center glass-card p-4 bg-blue-500/10 border border-blue-500/20">
                          <div className="flex items-center justify-center mb-2">
                            <DollarSign className="w-5 h-5 text-blue-400 mr-2" />
                            <div className="text-lg font-black text-blue-400">
                              $
                              {baseline.estimated_salary_range.min.toLocaleString()}{" "}
                              - $
                              {baseline.estimated_salary_range.max.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            Salary Range
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-center bg-slate-800/30 p-4 rounded-lg border border-slate-600/20">
                      {baseline.summary}
                    </p>
                  </div>

                  {/* Timeline Cards */}
                  <div className="space-y-6">
                    {baseline.timeline.map((timeline, idx) => (
                      <TimelineCard key={idx} timeline={timeline} index={idx} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Variant Column */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-white flex items-center font-['Orbitron']">
                  <Sparkles className="w-8 h-8 mr-4 text-purple-400 animate-pulse" />
                  Butterfly Timeline
                  {intakeData.oneChange && (
                    <span className="text-sm ml-3 font-normal text-purple-300 font-mono max-w-xs truncate bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/30">
                      &quot;{intakeData.oneChange}&quot;
                    </span>
                  )}
                </h2>
                {intakeData.oneChange && !variant && !loading.variant && (
                  <button
                    onClick={simulateVariant}
                    className="btn-secondary group relative overflow-hidden flex items-center space-x-3"
                  >
                    <Zap className="w-5 h-5 group-hover:animate-spin" />
                    <span className="font-bold">Generate Butterfly</span>
                  </button>
                )}
              </div>

              {!intakeData.oneChange && (
                <div className="text-center py-20 glass-card">
                  <Sparkles className="w-20 h-20 text-slate-600 mx-auto mb-6 opacity-50" />
                  <h3 className="text-slate-400 font-bold text-xl mb-2">
                    No Butterfly Factor Specified
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Return to the intake form to add a &quot;one change&quot;
                    and explore alternative career paths
                  </p>
                  <button
                    onClick={() => window.history.back()}
                    className="btn-primary flex items-center space-x-2 mx-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Intake Form</span>
                  </button>
                </div>
              )}

              {loading.variant && (
                <div className="text-center py-20">
                  <div className="relative mb-8">
                    <Sparkles className="w-24 h-24 text-purple-400 mx-auto animate-pulse mb-4" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border-4 border-purple-400/20 border-t-purple-400 rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-4">
                    Butterfly Effect Simulation
                  </h3>
                  <p className="text-purple-300 text-lg mb-6">{loadingStage}</p>
                  <div className="max-w-md mx-auto bg-slate-800/50 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full animate-pulse"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              )}

              {variant && (
                <>
                  {/* Variant Summary Card */}
                  <div className="glass-card p-6 mb-8 neon-glow-indigo">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-black mb-4 text-gradient-primary">
                        {variant.role_title}
                      </h3>
                      <div className="grid grid-cols-2 gap-6 mb-4">
                        <div className="text-center glass-card p-4 bg-purple-500/10 border border-purple-500/20">
                          <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
                            <div className="text-2xl font-black text-purple-400">
                              {variant.success_probability}%
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            Success Probability
                          </div>
                        </div>
                        <div className="text-center glass-card p-4 bg-indigo-500/10 border border-indigo-500/20">
                          <div className="flex items-center justify-center mb-2">
                            <DollarSign className="w-5 h-5 text-indigo-400 mr-2" />
                            <div className="text-lg font-black text-indigo-400">
                              $
                              {variant.estimated_salary_range.min.toLocaleString()}{" "}
                              - $
                              {variant.estimated_salary_range.max.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            Salary Range
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-center mb-4 bg-slate-800/30 p-4 rounded-lg border border-slate-600/20">
                      {variant.summary}
                    </p>

                    {/* Comparison summary */}
                    <div className="glass-card p-4 bg-orange-500/10 border border-orange-500/20">
                      <h4 className="text-orange-300 font-bold text-sm mb-2 flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Impact Analysis
                      </h4>
                      <p className="text-orange-200 text-sm">
                        {variant.comparison_summary}
                      </p>
                    </div>
                  </div>

                  {/* Variant Timeline Cards */}
                  <div className="space-y-6">
                    {variant.timeline.map((timeline, idx) => {
                      const delta = variant.deltas.find((d) =>
                        d.phase
                          .toLowerCase()
                          .includes(timeline.phase.toLowerCase().split(":")[0])
                      );
                      return (
                        <TimelineCard
                          key={idx}
                          timeline={timeline}
                          isVariant={true}
                          delta={delta?.change}
                          index={idx}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Comparison Toggle */}
          {baseline && variant && (
            <div className="text-center mb-8">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="btn-primary flex items-center space-x-2 mx-auto"
              >
                <BarChart3 className="w-5 h-5" />
                <span>
                  {showComparison ? "Hide" : "Show"} Detailed Comparison
                </span>
              </button>
            </div>
          )}

          {/* Detailed Comparison */}
          {showComparison && baseline && variant && (
            <div className="glass-card p-8 mb-12 neon-glow-indigo">
              <h3 className="text-3xl font-black text-white mb-6 text-center font-['Orbitron'] flex items-center justify-center">
                <BarChart3 className="w-8 h-8 mr-4 text-indigo-400" />
                Timeline Comparison Analysis
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-cyan-400 font-bold text-xl mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Primary Path Advantages
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 glass-card bg-cyan-500/5 border border-cyan-500/20">
                      <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">
                        Faster market entry and income generation
                      </span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 glass-card bg-cyan-500/5 border border-cyan-500/20">
                      <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">
                        Lower risk and more predictable outcomes
                      </span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 glass-card bg-cyan-500/5 border border-cyan-500/20">
                      <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">
                        Builds on existing strengths and experience
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-purple-400 font-bold text-xl mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Butterfly Path Advantages
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 glass-card bg-purple-500/5 border border-purple-500/20">
                      <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">
                        Higher ceiling for expertise and innovation
                      </span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 glass-card bg-purple-500/5 border border-purple-500/20">
                      <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">
                        Unique positioning in emerging markets
                      </span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 glass-card bg-purple-500/5 border border-purple-500/20">
                      <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">
                        Potential for breakthrough impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Stack */}
          {baseline && (
            <ActionStack
              actionStack={baseline.action_stack}
              onExport={exportPlan}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Helper functions with proper typing
function generateRoleTitle(intakeData: IntakeData): string {
  const aiInterests = intakeData.interests.some(
    (i) => i.toLowerCase().includes("ai") || i.toLowerCase().includes("ml")
  );
  const hasReact = intakeData.skills.some((s) =>
    s.toLowerCase().includes("react")
  );
  const hasData = intakeData.skills.some(
    (s) =>
      s.toLowerCase().includes("data") || s.toLowerCase().includes("python")
  );

  if (aiInterests && hasData) return "Senior AI Product Manager";
  if (hasReact && aiInterests) return "AI-Powered Frontend Architect";
  if (hasReact) return "Senior Full-Stack Engineering Lead";
  if (hasData) return "Data Science Team Lead";
  return "Senior Technology Specialist";
}

function generateSummary(intakeData: IntakeData): string {
  return `Based on your strong foundation in ${intakeData.skills
    .slice(0, 3)
    .join(", ")} and passion for ${intakeData.interests
    .slice(0, 2)
    .join(
      " and "
    )}, this career path leverages your existing expertise while building strategic leadership capabilities. The projected timeline accounts for your constraints and maximizes growth opportunities in emerging technology sectors.`;
}

function generateTimeline(intakeData: IntakeData): Timeline[] {
  return [
    {
      phase: "Year 1-2: Foundation & Acceleration",
      duration: "24 months",
      goals: [
        "Master advanced frameworks and methodologies",
        "Build cross-functional leadership experience",
        "Establish industry network and thought leadership",
      ],
      projects: [
        "Lead development of 3 major product features with 50k+ users",
        "Complete advanced certification program",
        "Mentor junior team members and drive best practices",
      ],
      risks: [
        "Rapid technology evolution requiring continuous upskilling",
        "Increased responsibility may impact work-life balance",
        "Market competition from AI-native solutions",
      ],
      checkpoints: [
        "First major product launch with measurable impact",
        "Promotion to senior/lead role with team responsibilities",
        "Industry speaking engagement or publication",
      ],
      skills_developed: [
        "Advanced Architecture",
        "Team Leadership",
        "Strategic Planning",
        "Stakeholder Management",
      ],
    },
    {
      phase: "Year 3-5: Leadership & Innovation",
      duration: "36 months",
      goals: [
        "Drive strategic product initiatives and roadmaps",
        "Build and scale high-performing engineering teams",
        "Establish expertise in emerging technology domains",
      ],
      projects: [
        "Launch innovative platform serving 500k+ users globally",
        "Scale engineering team from 5 to 20+ members",
        "Patent 2-3 novel technical solutions or methodologies",
      ],
      risks: [
        "Executive transition challenges and stakeholder alignment",
        "Technology stack evolution requiring architectural decisions",
        "Competitive pressure from funded startups and tech giants",
      ],
      checkpoints: [
        "Successful team scaling with maintained code quality",
        "Industry award or recognition for technical innovation",
        "Revenue impact exceeding $2M annually",
      ],
      skills_developed: [
        "Executive Communication",
        "Technical Strategy",
        "Innovation Management",
        "Market Analysis",
      ],
    },
  ];
}

function generateSkillGaps(intakeData: IntakeData): string[] {
  const gaps = [];
  if (!intakeData.skills.some((s) => s.toLowerCase().includes("leadership"))) {
    gaps.push("Technical Leadership & Team Management");
  }
  if (
    !intakeData.skills.some((s) => s.toLowerCase().includes("architecture"))
  ) {
    gaps.push("System Architecture & Design Patterns");
  }
  gaps.push(
    "Strategic Business Planning",
    "Advanced Data Analytics",
    "Executive Communication"
  );
  return gaps.slice(0, 4);
}

function generateActionStack(intakeData: IntakeData): ActionItem[] {
  return [
    {
      id: "action-1",
      type: "certification",
      title: "Advanced Cloud Architecture Certification",
      description:
        "AWS Solutions Architect Professional or equivalent cloud certification",
      why: "Essential for scaling applications and leading technical architecture decisions in senior roles",
      effort: "8-12 hours/week",
      duration_weeks: 12,
      priority: "high",
      cost_estimate: 400,
      prerequisites: [
        "Basic cloud knowledge",
        "1+ years development experience",
      ],
    },
    {
      id: "action-2",
      type: "project",
      title: "Build and Launch SaaS MVP",
      description:
        "Create a full-stack application that solves a real problem in your interest area",
      why: "Demonstrates end-to-end product thinking and provides portfolio evidence of technical leadership",
      effort: "15-20 hours/week",
      duration_weeks: 16,
      priority: "high",
      cost_estimate: 200,
    },
    {
      id: "action-3",
      type: "experience",
      title: "Lead Cross-Functional Project",
      description:
        "Volunteer to lead a high-visibility project involving multiple teams",
      why: "Builds leadership experience and demonstrates ability to drive results across organizational boundaries",
      effort: "5-10 hours/week additional",
      duration_weeks: 24,
      priority: "medium",
    },
    {
      id: "action-4",
      type: "course",
      title: "Executive Communication & Strategy",
      description:
        "Business communication course focused on technical leadership",
      why: "Critical for senior roles requiring stakeholder management and strategic planning",
      effort: "4-6 hours/week",
      duration_weeks: 10,
      priority: "medium",
      cost_estimate: 800,
    },
  ];
}

function generateRationale(intakeData: IntakeData): string {
  return `This career simulation is optimized for your profile combining ${
    intakeData.skills.length
  } technical skills with ${
    intakeData.interests.length
  } strategic interests. The timeline balances rapid skill development with sustainable growth, accounting for your specified constraints: ${
    intakeData.constraints.join(", ") || "standard career progression"
  }. Success probability is high due to strong market demand and your existing foundation.`;
}

function generateVariantResult(
  intakeData: IntakeData,
  baseline: SimulationResult | null
): VariantResult {
  return {
    role_title: "AI Research Engineering Lead",
    summary: `By pursuing ${intakeData.oneChange}, you shift toward deeper technical specialization with higher innovation potential. This path trades faster commercial progression for breakthrough impact and industry thought leadership.`,
    timeline: [
      {
        phase: "Year 1-2: Research Specialization",
        duration: "24 months",
        goals: [
          "Master advanced AI/ML research methodologies",
          "Publish 2+ peer-reviewed papers",
          "Build academic and industry network",
        ],
        projects: [
          "Complete research internship at top AI lab",
          "Contribute to open-source ML framework",
          "Co-author breakthrough research publication",
        ],
        risks: [
          "Longer path to financial returns",
          "High competition in research roles",
          "Funding uncertainty",
        ],
        checkpoints: [
          "First-author publication acceptance",
          "Research conference presentation",
          "Industry collaboration agreement",
        ],
        skills_developed: [
          "Advanced Mathematics",
          "Research Methodology",
          "Academic Writing",
          "Grant Writing",
        ],
      },
      {
        phase: "Year 3-5: Research Leadership",
        duration: "36 months",
        goals: [
          "Lead independent research program",
          "Bridge academia-industry gap",
          "Establish thought leadership",
        ],
        projects: [
          "5+ high-impact publications",
          "Industry partnership worth $500k+",
          "Patent portfolio development",
        ],
        risks: [
          "Academic politics navigation",
          "Research-to-product translation",
          "Long development cycles",
        ],
        checkpoints: [
          "Research team leadership role",
          "Industry consulting opportunities",
          "Technology transfer success",
        ],
        skills_developed: [
          "Research Management",
          "Technology Transfer",
          "Innovation Strategy",
          "Scientific Leadership",
        ],
      },
    ],
    skill_gaps: [
      "Advanced Mathematics",
      "Research Methodology",
      "Academic Writing",
      "Grant Acquisition",
    ],
    action_stack: generateVariantActionStack(),
    rationale: `The butterfly effect of "${intakeData.oneChange}" fundamentally alters your trajectory toward research excellence. While requiring longer investment, this path offers potential for breakthrough impact and unique market positioning.`,
    success_probability: Math.floor(Math.random() * 10) + 70,
    estimated_salary_range: { min: 95000, max: 180000, currency: "USD" },
    deltas: [
      {
        phase: "Year 1-2",
        change: `${intakeData.oneChange} instead of direct industry progression`,
        impact: "Deeper technical expertise but delayed financial returns",
        probability_change: -10,
      },
      {
        phase: "Year 3-5",
        change: "Research leadership vs product management track",
        impact: "Higher innovation ceiling but longer path to market influence",
        probability_change: 5,
      },
    ],
    comparison_summary:
      "The research path offers 25% higher long-term earning potential and significantly higher impact ceiling, but requires 40% more time investment and carries higher uncertainty.",
  };
}

function generateVariantActionStack(): ActionItem[] {
  return [
    {
      id: "variant-1",
      type: "course",
      title: "Advanced Machine Learning Theory (PhD-level)",
      description: "Stanford CS229/Andrew Ng or equivalent advanced ML course",
      why: "Build theoretical foundation essential for research-level innovation",
      effort: "20-25 hours/week",
      duration_weeks: 16,
      priority: "high",
      cost_estimate: 1200,
    },
    {
      id: "variant-2",
      type: "project",
      title: "Original Research Project with Novel Contributions",
      description:
        "Develop and execute independent research with publication potential",
      why: "Essential for building research portfolio and academic credibility",
      effort: "25-30 hours/week",
      duration_weeks: 32,
      priority: "high",
    },
  ];
}

function generateExportContent(
  intakeData: IntakeData,
  baseline: SimulationResult | null,
  variant: VariantResult | null
): string {
  return `# 🚀 FutureForge Career Simulation Results

Generated on: ${new Date().toLocaleDateString()}
Simulation ID: ${Math.random().toString(36).substring(7).toUpperCase()}

## 📊 Your Profile Analysis
- **Skills Portfolio**: ${intakeData.skills.join(", ")}
- **Career Interests**: ${intakeData.interests.join(", ")}
- **Constraints**: ${intakeData.constraints.join(", ") || "None specified"}
${intakeData.oneChange ? `- **Butterfly Factor**: ${intakeData.oneChange}` : ""}

## 🎯 Primary Timeline: ${baseline?.role_title}

### Executive Summary
${baseline?.summary}

**Success Probability**: ${baseline?.success_probability}%
**Estimated Salary Range**: $${baseline?.estimated_salary_range.min.toLocaleString()} - $${baseline?.estimated_salary_range.max.toLocaleString()}

### Strategic Rationale
${baseline?.rationale}

### 📈 Career Timeline
${baseline?.timeline
  .map(
    (t) => `
**${t.phase}** (${t.duration})

🎯 **Objectives:**
${t.goals.map((goal) => `- ${goal}`).join("\n")}

🚀 **Key Projects:**
${t.projects.map((project) => `- ${project}`).join("\n")}

⚠️ **Risk Factors:**
${t.risks.map((risk) => `- ${risk}`).join("\n")}

✅ **Success Milestones:**
${t.checkpoints.map((checkpoint) => `- ${checkpoint}`).join("\n")}

🧠 **Skills Developed:** ${t.skills_developed.join(", ")}
`
  )
  .join("\n")}

### 🎯 Priority Action Stack
${baseline?.action_stack
  .map(
    (action, idx) => `
${idx + 1}. **${action.title}** (${action.duration_weeks} weeks, ${
      action.effort
    })
   - Type: ${action.type.charAt(0).toUpperCase() + action.type.slice(1)}
   - Priority: ${action.priority.toUpperCase()}
   - Investment: ${
     action.cost_estimate ? `$${action.cost_estimate}` : "Time only"
   }
   - Why: ${action.why}
   ${
     action.prerequisites
       ? `- Prerequisites: ${action.prerequisites.join(", ")}`
       : ""
   }
`
  )
  .join("")}

### 📚 Skills to Develop
${baseline?.skill_gaps.map((skill) => `- ${skill}`).join("\n")}

${
  variant
    ? `
## 🦋 Butterfly Timeline: ${variant.role_title}

### Alternative Strategy Overview
${variant.summary}

**Success Probability**: ${variant.success_probability}%
**Estimated Salary Range**: $${variant.estimated_salary_range.min.toLocaleString()} - $${variant.estimated_salary_range.max.toLocaleString()}

### Impact Analysis
${variant.comparison_summary}

### 🔄 Key Changes from Primary Path
${variant.deltas
  .map(
    (d) => `
**${d.phase}**: ${d.change}
- Impact: ${d.impact}
- Probability Change: ${d.probability_change > 0 ? "+" : ""}${
      d.probability_change
    }%
`
  )
  .join("")}

### 📈 Alternative Timeline
${variant.timeline
  .map(
    (t) => `
**${t.phase}** (${t.duration})

🎯 **Objectives:**
${t.goals.map((goal) => `- ${goal}`).join("\n")}

🚀 **Key Projects:**
${t.projects.map((project) => `- ${project}`).join("\n")}

⚠️ **Risk Factors:**
${t.risks.map((risk) => `- ${risk}`).join("\n")}

✅ **Success Milestones:**
${t.checkpoints.map((checkpoint) => `- ${checkpoint}`).join("\n")}

🧠 **Skills Developed:** ${t.skills_developed.join(", ")}
`
  )
  .join("\n")}

### 🎯 Alternative Action Stack
${variant.action_stack
  .map(
    (action, idx) => `
${idx + 1}. **${action.title}** (${action.duration_weeks} weeks, ${
      action.effort
    })
   - Type: ${action.type.charAt(0).toUpperCase() + action.type.slice(1)}
   - Priority: ${action.priority.toUpperCase()}
   - Investment: ${
     action.cost_estimate ? `$${action.cost_estimate}` : "Time only"
   }
   - Why: ${action.why}
`
  )
  .join("")}
`
    : ""
}

---

## 🎯 Next Steps Recommendation

1. **Review both timelines** carefully and consider which aligns better with your risk tolerance and long-term vision
2. **Start with the highest priority action** from your chosen path within the next 7 days
3. **Set up accountability systems** to track progress on your action stack
4. **Reassess quarterly** and adjust the plan based on market changes and personal growth

---

*Generated by FutureForge - AI-Powered Career Simulation Platform*
*This is a strategic planning tool. Adapt recommendations to your unique circumstances and always consider multiple perspectives when making career decisions.*

**Disclaimer**: This simulation is based on current market trends, typical career progression patterns, and AI analysis. Actual results may vary based on economic conditions, personal circumstances, and unforeseen opportunities.
`;
}
