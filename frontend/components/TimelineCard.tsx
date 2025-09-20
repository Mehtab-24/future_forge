import { Timeline } from "@/types/simulation";

interface TimelineCardProps {
  timeline: Timeline;
  isVariant?: boolean;
  delta?: string;
  index?: number;
}

export default function TimelineCard({
  timeline,
  isVariant = false,
  delta,
  index = 0,
}: TimelineCardProps) {
  return (
    <div
      className={`glass-card glass-card-hover p-6 transition-all duration-500 ${
        isVariant
          ? "border-purple-500/30 neon-glow-purple"
          : "border-cyan-500/30 neon-glow-blue"
      }`}
      style={{
        animationDelay: `${index * 200}ms`,
        transform: "translateY(20px)",
        animation: `slideUp 0.6s ease-out ${index * 200}ms both`,
      }}
    >
      {/* Phase Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-black text-white mb-2 font-['Orbitron']">
            {timeline.phase}
          </h3>
          <div className="flex items-center space-x-4">
            <div
              className={`h-1 w-20 rounded-full ${
                isVariant
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500"
              }`}
            ></div>
            <span className="text-white/60 text-sm font-mono">
              {timeline.duration}
            </span>
          </div>
        </div>

        {delta && (
          <div className="flex items-center space-x-2 glass-card p-3 bg-orange-500/10 border-orange-500/30">
            <span className="text-orange-400 text-2xl animate-pulse">🦋</span>
            <span className="text-orange-300 text-xs font-bold border border-orange-500/30 px-2 py-1 rounded-full">
              BUTTERFLY EFFECT
            </span>
          </div>
        )}
      </div>

      {/* Delta explanation */}
      {delta && (
        <div className="mb-6 glass-card p-4 bg-orange-500/5 border border-orange-500/20">
          <div className="flex items-start space-x-3">
            <span className="text-orange-400 text-xl flex-shrink-0">🔄</span>
            <div>
              <h4 className="text-orange-300 font-bold text-sm mb-1">
                ALTERNATIVE PATH
              </h4>
              <p className="text-orange-200 text-sm leading-relaxed">{delta}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Goals */}
        <div className="space-y-3">
          <h4 className="text-green-400 font-black text-lg flex items-center font-['Orbitron']">
            <span className="text-2xl mr-3 animate-pulse">🎯</span>
            OBJECTIVES
          </h4>
          <div className="grid gap-2">
            {timeline.goals.map((goal, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-3 glass-card bg-green-500/5 border border-green-500/10 hover:bg-green-500/10 transition-all group"
              >
                <span className="text-green-400 text-sm flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                  ▶
                </span>
                <span className="text-white font-medium text-sm leading-relaxed">
                  {goal}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-3">
          <h4
            className={`font-black text-lg flex items-center font-['Orbitron'] ${
              isVariant ? "text-purple-400" : "text-cyan-400"
            }`}
          >
            <span className="text-2xl mr-3 animate-pulse">🚀</span>
            KEY PROJECTS
          </h4>
          <div className="grid gap-2">
            {timeline.projects.map((project, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 p-3 glass-card border hover:scale-[1.02] transition-all group ${
                  isVariant
                    ? "bg-purple-500/5 border-purple-500/10 hover:bg-purple-500/10"
                    : "bg-cyan-500/5 border-cyan-500/10 hover:bg-cyan-500/10"
                }`}
              >
                <span
                  className={`text-sm flex-shrink-0 mt-1 group-hover:scale-110 transition-transform ${
                    isVariant ? "text-purple-400" : "text-cyan-400"
                  }`}
                >
                  ▶
                </span>
                <span className="text-white font-medium text-sm leading-relaxed">
                  {project}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Developed */}
        {timeline.skills_developed && timeline.skills_developed.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-blue-400 font-black text-lg flex items-center font-['Orbitron']">
              <span className="text-2xl mr-3 animate-pulse">🧠</span>
              SKILLS DEVELOPED
            </h4>
            <div className="flex flex-wrap gap-2">
              {timeline.skills_developed.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:bg-blue-500/30 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Risks */}
        {timeline.risks.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-red-400 font-black text-lg flex items-center font-['Orbitron']">
              <span className="text-2xl mr-3 animate-pulse">⚠️</span>
              RISK FACTORS
            </h4>
            <div className="grid gap-2">
              {timeline.risks.map((risk, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3 glass-card bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all group"
                >
                  <span className="text-red-400 text-sm flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    ⚡
                  </span>
                  <span className="text-red-200 font-medium text-sm leading-relaxed">
                    {risk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Checkpoints */}
        {timeline.checkpoints.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-yellow-400 font-black text-lg flex items-center font-['Orbitron']">
              <span className="text-2xl mr-3 animate-pulse">✅</span>
              MILESTONES
            </h4>
            <div className="grid gap-2">
              {timeline.checkpoints.map((checkpoint, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3 glass-card bg-yellow-500/5 border border-yellow-500/10 hover:bg-yellow-500/10 transition-all group"
                >
                  <span className="text-yellow-400 text-sm flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    🏆
                  </span>
                  <span className="text-yellow-100 font-medium text-sm leading-relaxed">
                    {checkpoint}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
