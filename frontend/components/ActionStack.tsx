import { ActionItem } from "@/types/simulation";

interface ActionStackProps {
  actionStack: ActionItem[];
  onExport: () => void;
}

export default function ActionStack({
  actionStack,
  onExport,
}: ActionStackProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/30 bg-red-500/5 text-red-300";
      case "medium":
        return "border-yellow-500/30 bg-yellow-500/5 text-yellow-300";
      case "low":
        return "border-green-500/30 bg-green-500/5 text-green-300";
      default:
        return "border-gray-500/30 bg-gray-500/5 text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return "📚";
      case "project":
        return "🔨";
      case "certification":
        return "🏆";
      case "experience":
        return "💼";
      default:
        return "📄";
    }
  };

  return (
    <div className="glass-card p-8 neon-glow-cyan relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/5"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h3 className="text-4xl font-black text-white mb-3 flex items-center font-['Orbitron']">
              <span className="text-5xl mr-4 animate-pulse">🎯</span>
              ACTION STACK
            </h3>
            <p className="text-white/70 font-medium text-lg">
              Your personalized roadmap to career transformation
            </p>
          </div>

          <button
            onClick={onExport}
            className="mt-6 md:mt-0 btn-secondary group relative overflow-hidden"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl group-hover:animate-bounce">📋</span>
              <span className="font-bold text-lg">Export Full Plan</span>
              <span className="text-2xl group-hover:animate-bounce">⚡</span>
            </div>
          </button>
        </div>

        {/* Action Items */}
        <div className="space-y-6">
          {actionStack.map((action, idx) => (
            <div
              key={action.id}
              className="glass-card glass-card-hover p-6 group relative overflow-hidden"
              style={{
                animationDelay: `${idx * 150}ms`,
                transform: "translateX(-20px) opacity-0",
                animation: `slideInRight 0.6s ease-out ${idx * 150}ms both`,
              }}
            >
              {/* Priority indicator */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(
                    action.priority
                  )}`}
                >
                  {action.priority.toUpperCase()} PRIORITY
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-start">
                <div className="flex-1 pr-4">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-4xl flex-shrink-0 group-hover:animate-bounce">
                      {getTypeIcon(action.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-black text-xl leading-tight mb-2 group-hover:text-gradient-accent transition-all">
                        {action.title}
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed mb-3">
                        {action.description}
                      </p>

                      {/* Action details */}
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 flex items-center">
                          <span className="mr-1">⏱️</span>
                          {action.duration_weeks} weeks
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30 flex items-center">
                          <span className="mr-1">💪</span>
                          {action.effort}
                        </span>
                        {action.cost_estimate && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30 flex items-center">
                            <span className="mr-1">💰</span>$
                            {action.cost_estimate}
                          </span>
                        )}
                      </div>

                      {/* Prerequisites */}
                      {action.prerequisites &&
                        action.prerequisites.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-orange-300 font-bold text-sm mb-2 flex items-center">
                              <span className="mr-2">📋</span>
                              Prerequisites:
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {action.prerequisites.map((prereq, prereqIdx) => (
                                <span
                                  key={prereqIdx}
                                  className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-md text-xs border border-orange-500/30"
                                >
                                  {prereq}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Why this matters */}
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-green-400 text-xl flex-shrink-0">
                        💡
                      </span>
                      <div>
                        <h5 className="text-green-300 font-bold text-sm mb-1">
                          WHY THIS MATTERS
                        </h5>
                        <p className="text-green-100 font-medium text-sm leading-relaxed">
                          {action.why}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Priority number */}
                <div className="mt-4 md:mt-0 md:ml-6 text-center">
                  <div className="glass-card p-4 text-center group-hover:neon-glow-blue transition-all">
                    <div className="text-4xl font-black text-gradient-primary mb-1">
                      #{idx + 1}
                    </div>
                    <div className="text-xs text-white/60 font-mono">
                      PRIORITY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="glass-card p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-3xl animate-pulse">💪</span>
              <span className="text-white font-bold text-lg">
                Complete these actions sequentially for maximum career
                trajectory success!
              </span>
              <span className="text-3xl animate-pulse">🚀</span>
            </div>
            <p className="text-white/60 text-sm mt-2">
              Total estimated time:{" "}
              {actionStack.reduce(
                (sum, action) => sum + action.duration_weeks,
                0
              )}{" "}
              weeks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
