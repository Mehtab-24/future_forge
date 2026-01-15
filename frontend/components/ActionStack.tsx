import { ActionItem } from "@/types/simulation";
import {
  BookOpen,
  Wrench,
  Award,
  Briefcase,
  FileText,
  Download,
  Clock,
  DollarSign,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  Star,
  BarChart3,
} from "lucide-react";

interface ActionStackProps {
  actionStack: ActionItem[];
  onExport: () => void;
  isExporting?: boolean;
}

export default function ActionStack({
  actionStack,
  onExport,
  isExporting = false,
}: ActionStackProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          badge: "bg-red-500/20 text-red-300 border-red-500/30",
          icon: <Zap className="w-3 h-3" />,
        };
      case "medium":
        return {
          badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
          icon: <Target className="w-3 h-3" />,
        };
      case "low":
        return {
          badge: "bg-green-500/20 text-green-300 border-green-500/30",
          icon: <CheckCircle className="w-3 h-3" />,
        };
      default:
        return {
          badge: "bg-slate-500/20 text-slate-300 border-slate-500/30",
          icon: <FileText className="w-3 h-3" />,
        };
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "course":
        return {
          icon: <BookOpen className="w-5 h-5" />,
          color: "text-cyan-400",
          bg: "bg-cyan-500/20",
          border: "border-cyan-500/30",
        };
      case "project":
        return {
          icon: <Wrench className="w-5 h-5" />,
          color: "text-blue-400",
          bg: "bg-blue-500/20",
          border: "border-blue-500/30",
        };
      case "certification":
        return {
          icon: <Award className="w-5 h-5" />,
          color: "text-purple-400",
          bg: "bg-purple-500/20",
          border: "border-purple-500/30",
        };
      case "experience":
        return {
          icon: <Briefcase className="w-5 h-5" />,
          color: "text-emerald-400",
          bg: "bg-emerald-500/20",
          border: "border-emerald-500/30",
        };
      default:
        return {
          icon: <FileText className="w-5 h-5" />,
          color: "text-slate-400",
          bg: "bg-slate-500/20",
          border: "border-slate-500/30",
        };
    }
  };

  const totalWeeks = actionStack.reduce(
    (sum, action) => sum + action.duration_weeks,
    0
  );
  const totalCost = actionStack.reduce(
    (sum, action) => sum + (action.cost_estimate || 0),
    0
  );

  return (
    <div>
      {/* Centered Header Section */}
      <div className="text-center mb-8">
        {/* Centered Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-cyan-400 text-sm font-medium">
            <BarChart3 className="w-4 h-4 mr-2" />
            Priority Action Roadmap
          </div>
        </div>

        {/* Centered Title */}
        <h2 className="text-4xl md:text-5xl font-black font-['Orbitron']  mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Your Action Stack
        </h2>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
          Prioritized roadmap to career transformation with detailed timelines
          and resources
        </p>

        {/* Summary Cards - Each with Its Own Themed Glow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="glass-card p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 neon-glow-cyan">
            <div className="flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-cyan-400 mr-2" />
              <span className="text-2xl font-black text-cyan-400">
                {totalWeeks}
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium text-center">
              Total Weeks
            </p>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 neon-glow-green">
            <div className="flex items-center justify-center mb-3">
              <DollarSign className="w-6 h-6 text-emerald-400 mr-2" />
              <span className="text-2xl font-black text-emerald-400">
                ${totalCost.toLocaleString()}
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium text-center">
              Investment
            </p>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 neon-glow-purple">
            <div className="flex items-center justify-center mb-3">
              <Star className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-2xl font-black text-purple-400">
                {actionStack.length}
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium text-center">
              Actions
            </p>
          </div>
        </div>
      </div>

      {/* Action Items - Properly Sized Container */}
      <div className="max-w-4xl mx-auto space-y-8 mb-12">
        {actionStack.map((action, index) => {
          const priorityConfig = getPriorityConfig(action.priority);
          const typeConfig = getTypeConfig(action.type);

          return (
            <div
              key={action.id || `action-${index}`}
              className="glass-card p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 transition-all duration-300 hover:scale-[1.01] neon-glow-cyan"
            >
              {/* Action Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {/* Step Number */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-black text-lg">
                    {index + 1}
                  </div>

                  {/* Type Icon and Title */}
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg ${typeConfig.bg} ${typeConfig.border} border`}
                    >
                      <div className={typeConfig.color}>{typeConfig.icon}</div>
                    </div>
                    <h3 className="text-xl font-black text-white ">
                      {action.title}
                    </h3>
                  </div>
                </div>

                {/* Priority Badge */}
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 border ${priorityConfig.badge}`}
                >
                  {priorityConfig.icon}
                  <span>{(action.priority || 'medium').toUpperCase()}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-cyan-400 font-bold text-sm mb-3 flex items-center ">
                  <FileText className="w-4 h-4 mr-2" />
                  What You&apos;ll Do
                </h4>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600/20">
                  <p className="text-slate-300 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* Why It Matters */}
              <div className="mb-6">
                <h4 className="text-purple-400 font-bold text-sm mb-3 flex items-center ">
                  <Target className="w-4 h-4 mr-2" />
                  Why This Matters
                </h4>
                <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  <p className="text-slate-300 leading-relaxed">{action.why}</p>
                </div>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-600/20 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-blue-400 font-bold text-sm">Duration</p>
                  <p className="text-slate-300 text-xs">
                    {action.duration_weeks} weeks
                  </p>
                </div>

                <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-600/20 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-emerald-400 font-bold text-sm">Effort</p>
                  <p className="text-slate-300 text-xs">{action.effort}</p>
                </div>

                <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-600/20 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-yellow-400 font-bold text-sm">Cost</p>
                  <p className="text-slate-300 text-xs">
                    {action.cost_estimate ? `$${action.cost_estimate}` : "Free"}
                  </p>
                </div>

                <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-600/20 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className={typeConfig.color}>{typeConfig.icon}</div>
                  </div>
                  <p className={`font-bold text-sm ${typeConfig.color}`}>
                    Type
                  </p>
                  <p className="text-slate-300 text-xs capitalize">
                    {action.type}
                  </p>
                </div>
              </div>

              {/* Prerequisites */}
              {action.prerequisites && action.prerequisites.length > 0 && (
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <h5 className="text-blue-300 font-bold text-sm mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Prerequisites
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {action.prerequisites.map((prereq, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs border border-blue-500/30"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Export Section */}
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-8 neon-glow-cyan bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
          <h3 className="text-2xl font-black text-white mb-4 font-['Orbitron'] flex items-center justify-center">
            <Download className="w-6 h-6 mr-3 text-cyan-400" />
            Export Your Career Plan
          </h3>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Download your complete career action plan with timelines,
            priorities, and detailed guidance in PDF format.
          </p>

          <button
            onClick={onExport}
            disabled={isExporting}
            className={`transition-all duration-300 rounded-2xl group ${
              isExporting
                ? "cursor-not-allowed opacity-75"
                : "hover:scale-[1.02]"
            }`}
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 neon-glow-cyan">
              {isExporting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span className="font-bold text-lg text-white">
                    Generating PDF...
                  </span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-white group-hover:animate-bounce" />
                  <span className="font-bold text-lg text-white">
                    Download PDF Plan
                  </span>
                  <FileText className="w-5 h-5 text-white" />
                </>
              )}
            </div>
          </button>

          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-slate-500">
            <span className="flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              PDF Format
            </span>
            <span>•</span>
            <span className="flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Complete Guide
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Download className="w-3 h-3 mr-1" />
              Instant Download
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
