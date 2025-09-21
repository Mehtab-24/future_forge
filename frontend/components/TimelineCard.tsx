import {
  CheckCircle,
  Target,
  Briefcase,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Users,
  Zap,
  Award,
  Clock,
} from "lucide-react";
import { Timeline as TimelineType } from "@/types/simulation";

interface TimelineCardProps {
  timeline: TimelineType;
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
  const cardColor = isVariant
    ? "from-purple-500/10 to-indigo-500/10 border-purple-500/20"
    : "from-cyan-500/10 to-blue-500/10 border-cyan-500/20";

  const accentColor = isVariant ? "purple-400" : "cyan-400";
  const glowClass = isVariant ? "neon-glow-indigo" : "neon-glow-cyan";

  return (
    <div
      className={`glass-card p-6 ${glowClass} bg-gradient-to-br ${cardColor} border relative transition-all duration-300 hover:scale-[1.01]`}
    >
      {/* Phase Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className={`w-6 h-6 text-${accentColor}`} />
          <h3 className="text-xl font-black text-white ">{timeline.phase}</h3>
        </div>
        <div
          className={`px-3 py-1 rounded-full bg-${
            isVariant ? "purple" : "cyan"
          }-500/20 border border-${isVariant ? "purple" : "cyan"}-500/30`}
        >
          <span
            className={`text-${accentColor} text-sm font-bold flex items-center space-x-2`}
          >
            <Clock className="w-3 h-3" />
            <span>{timeline.duration}</span>
          </span>
        </div>
      </div>

      {/* Delta Display for Variant */}
      {delta && isVariant && (
        <div className="mb-6 p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-lg border border-orange-500/20">
          <h4 className="text-orange-300 font-bold text-sm mb-2 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Key Change from Primary Path
          </h4>
          <p className="text-orange-200 text-sm">{delta}</p>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals Section */}
        <div className="space-y-4">
          <h4
            className={`text-${accentColor} font-bold text-lg flex items-center `}
          >
            <Target className="w-5 h-5 mr-2" />
            Strategic Goals
          </h4>
          <div className="space-y-3">
            {timeline.goals.map((goal, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 p-3 glass-card bg-${
                  isVariant ? "purple" : "cyan"
                }-500/5 border border-${
                  isVariant ? "purple" : "cyan"
                }-500/20 hover:bg-${
                  isVariant ? "purple" : "cyan"
                }-500/10 transition-all`}
              >
                <Target
                  className={`w-4 h-4 text-${accentColor} mt-0.5 flex-shrink-0`}
                />
                <span className="text-slate-300 text-sm leading-relaxed">
                  {goal}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <h4
            className={`text-${accentColor} font-bold text-lg flex items-center `}
          >
            <Briefcase className="w-5 h-5 mr-2" />
            Key Projects
          </h4>
          <div className="space-y-3">
            {timeline.projects.map((project, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 p-3 glass-card bg-green-500/5 border border-green-500/20 hover:bg-green-500/10 transition-all`}
              >
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm leading-relaxed">
                  {project}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Risks Section */}
        <div className="space-y-4">
          <h4 className="text-red-400 font-bold text-lg flex items-center ">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Risk Factors
          </h4>
          <div className="space-y-3">
            {timeline.risks.map((risk, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-3 glass-card bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-all"
              >
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm leading-relaxed">
                  {risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Checkpoints Section */}
        <div className="space-y-4">
          <h4 className="text-emerald-400 font-bold text-lg flex items-center ">
            <Award className="w-5 h-5 mr-2" />
            Success Milestones
          </h4>
          <div className="space-y-3">
            {timeline.checkpoints.map((checkpoint, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-3 glass-card bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 transition-all"
              >
                <Award className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm leading-relaxed">
                  {checkpoint}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Developed Section */}
      <div className="mt-6 pt-6 border-t border-slate-700/50">
        <h4
          className={`text-${accentColor} font-bold text-lg mb-4 flex items-center`}
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          Skills Developed
        </h4>
        <div className="flex flex-wrap gap-2">
          {timeline.skills_developed.map((skill, idx) => (
            <span
              key={idx}
              className={`px-3 py-2 bg-${
                isVariant ? "purple" : "cyan"
              }-500/20 text-${
                isVariant ? "purple" : "cyan"
              }-200 rounded-lg text-sm border border-${
                isVariant ? "purple" : "cyan"
              }-500/30 font-medium flex items-center space-x-1 hover:bg-${
                isVariant ? "purple" : "cyan"
              }-500/30 transition-all`}
            >
              <Users className="w-3 h-3" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
