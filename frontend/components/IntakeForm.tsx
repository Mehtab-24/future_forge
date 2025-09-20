"use client";
import { useState } from "react";
import {
  User,
  Brain,
  Shield,
  Sparkles,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import { IntakeData } from "@/types/simulation";

interface IntakeFormProps {
  onSubmit: (data: IntakeData) => void;
  onBack: () => void;
}

interface ValidationErrors {
  skills?: string;
  interests?: string;
  general?: string;
}

export default function IntakeForm({ onSubmit, onBack }: IntakeFormProps) {
  const [formData, setFormData] = useState<IntakeData>({
    skills: [],
    interests: [],
    constraints: [],
    oneChange: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showValidationModal, setShowValidationModal] = useState(false);

  const handleSkillsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));
    setErrors((prev) => ({ ...prev, skills: undefined }));
  };

  const handleInterestsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));
    setErrors((prev) => ({ ...prev, interests: undefined }));
  };

  const handleConstraintsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      constraints: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (formData.skills.length === 0) {
      newErrors.skills =
        "At least one skill is required to generate accurate career simulations";
    }

    if (formData.interests.length === 0) {
      newErrors.interests =
        "At least one career interest is required to personalize your timeline";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShowValidationModal(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate processing time for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onSubmit(formData);
  };

  const skillSuggestions = [
    "React",
    "Python",
    "JavaScript",
    "Node.js",
    "TypeScript",
    "SQL",
    "Machine Learning",
    "Data Analysis",
    "AWS",
    "Docker",
  ];
  const interestSuggestions = [
    "AI/ML",
    "Web Development",
    "Data Science",
    "Product Management",
    "Cybersecurity",
    "Mobile Development",
    "DevOps",
    "UI/UX Design",
  ];

  // Validation Modal Component
  const ValidationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card p-6 max-w-md w-full neon-glow-cyan">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-bold text-white">
              Required Fields Missing
            </h3>
          </div>
          <button
            onClick={() => setShowValidationModal(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {errors.skills && (
            <div className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span className="text-red-300 text-sm">{errors.skills}</span>
            </div>
          )}
          {errors.interests && (
            <div className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span className="text-red-300 text-sm">{errors.interests}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowValidationModal(false)}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Got it, I&apos;ll fill the required fields</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden neon-glow-cyan">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <button
                onClick={onBack}
                className="absolute left-0 top-0 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>

              <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-cyan-400 text-sm font-medium mb-6 ">
                <Brain className="w-4 h-4 mr-2" />
                Career Intelligence Intake
              </div>

              <h2 className="text-4xl md:text-5xl font-black font-['Orbitron'] mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Career Simulation Intake
              </h2>

              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Tell us about your skills and aspirations to generate your
                personalized career universe
              </p>

              {/* Progress indicator */}
              <div className="flex justify-center mt-8 space-x-3">
                <div
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    formData.skills.length > 0
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-slate-800/50 text-slate-500 border border-slate-600/30"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      formData.skills.length > 0
                        ? "bg-green-400"
                        : "bg-slate-500"
                    }`}
                  ></div>
                  <span>SKILLS</span>
                </div>

                <div
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    formData.interests.length > 0
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-slate-800/50 text-slate-500 border border-slate-600/30"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      formData.interests.length > 0
                        ? "bg-green-400"
                        : "bg-slate-500"
                    }`}
                  ></div>
                  <span>INTERESTS</span>
                </div>

                <div
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    formData.constraints.length > 0
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-slate-800/50 text-slate-500 border border-slate-600/30"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      formData.constraints.length > 0
                        ? "bg-blue-400"
                        : "bg-slate-500"
                    }`}
                  ></div>
                  <span>CONSTRAINTS</span>
                </div>

                <div
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    formData.oneChange
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-slate-800/50 text-slate-500 border border-slate-600/30"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      formData.oneChange ? "bg-purple-400" : "bg-slate-500"
                    }`}
                  ></div>
                  <span>BUTTERFLY</span>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              {/* Skills Section */}
              <div className="space-y-4">
                <label className="block text-white font-bold text-xl flex items-center space-x-3">
                  <User className="w-6 h-6 text-cyan-400" />
                  <span>Technical Skills</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold border border-red-500/30">
                    REQUIRED
                  </span>
                </label>

                <div
                  className={`transition-all duration-300 ${
                    focusedField === "skills" ? "scale-[1.01]" : ""
                  }`}
                >
                  <textarea
                    className={`input-futuristic w-full h-24 resize-none ${
                      errors.skills
                        ? "border-red-500 neon-glow-indigo"
                        : focusedField === "skills"
                        ? "neon-glow-cyan border-cyan-400"
                        : "border-slate-600"
                    }`}
                    placeholder="React, Python, JavaScript, Machine Learning, Data Analysis, Cloud Computing..."
                    onFocus={() => setFocusedField("skills")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    suppressHydrationWarning={true}
                  />
                  {errors.skills && (
                    <p className="text-red-400 text-sm mt-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      {errors.skills}
                    </p>
                  )}
                </div>

                {/* Skill suggestions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-slate-500 text-sm mr-2 flex items-center">
                    <Brain className="w-3 h-3 mr-1" />
                    Suggestions:
                  </span>
                  {skillSuggestions.map((skill, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const currentSkills = formData.skills.join(", ");
                        const newSkills = currentSkills
                          ? `${currentSkills}, ${skill}`
                          : skill;
                        handleSkillsChange(newSkills);
                      }}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm hover:bg-cyan-500/30 transition-all border border-cyan-500/30 hover:scale-105 flex items-center space-x-1"
                    >
                      <span>+</span>
                      <span>{skill}</span>
                    </button>
                  ))}
                </div>

                {/* Skills display */}
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 p-4 glass-card bg-green-500/5 border border-green-500/20">
                    <span className="text-green-300 text-sm mr-2 flex items-center font-medium">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Added skills:
                    </span>
                    {formData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30 flex items-center"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Interests Section */}
              <div className="space-y-4">
                <label className="block text-white font-bold text-xl flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <span>Career Interests & Passions</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold border border-red-500/30">
                    REQUIRED
                  </span>
                </label>

                <div
                  className={`transition-all duration-300 ${
                    focusedField === "interests" ? "scale-[1.01]" : ""
                  }`}
                >
                  <textarea
                    className={`input-futuristic w-full h-24 resize-none ${
                      errors.interests
                        ? "border-red-500 neon-glow-indigo"
                        : focusedField === "interests"
                        ? "neon-glow-indigo border-purple-400"
                        : "border-slate-600"
                    }`}
                    placeholder="AI/ML, Product Management, Full-stack Development, Data Science, Entrepreneurship, Research..."
                    onFocus={() => setFocusedField("interests")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => handleInterestsChange(e.target.value)}
                    suppressHydrationWarning={true}
                  />
                  {errors.interests && (
                    <p className="text-red-400 text-sm mt-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      {errors.interests}
                    </p>
                  )}
                </div>

                {/* Interest suggestions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-slate-500 text-sm mr-2 flex items-center">
                    <Brain className="w-3 h-3 mr-1" />
                    Suggestions:
                  </span>
                  {interestSuggestions.map((interest, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const currentInterests = formData.interests.join(", ");
                        const newInterests = currentInterests
                          ? `${currentInterests}, ${interest}`
                          : interest;
                        handleInterestsChange(newInterests);
                      }}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm hover:bg-purple-500/30 transition-all border border-purple-500/30 hover:scale-105 flex items-center space-x-1"
                    >
                      <span>+</span>
                      <span>{interest}</span>
                    </button>
                  ))}
                </div>

                {/* Interests display */}
                {formData.interests.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 p-4 glass-card bg-green-500/5 border border-green-500/20">
                    <span className="text-green-300 text-sm mr-2 flex items-center font-medium">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Added interests:
                    </span>
                    {formData.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30 flex items-center"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Constraints Section */}
              <div className="space-y-4">
                <label className="block text-white font-bold text-xl flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <span>Constraints & Preferences</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/30">
                    OPTIONAL
                  </span>
                </label>

                <div
                  className={`transition-all duration-300 ${
                    focusedField === "constraints" ? "scale-[1.01]" : ""
                  }`}
                >
                  <textarea
                    className={`input-futuristic w-full h-20 resize-none ${
                      focusedField === "constraints"
                        ? "neon-glow-cyan border-blue-400"
                        : "border-slate-600"
                    }`}
                    placeholder="Remote work preferred, 2-year timeline, budget under $10k, no relocating, family commitments..."
                    onFocus={() => setFocusedField("constraints")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => handleConstraintsChange(e.target.value)}
                    suppressHydrationWarning={true}
                  />
                </div>

                {formData.constraints.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 p-4 glass-card bg-blue-500/5 border border-blue-500/20">
                    <span className="text-blue-300 text-sm mr-2 flex items-center font-medium">
                      <Shield className="w-4 h-4 mr-1" />
                      Constraints:
                    </span>
                    {formData.constraints.map((constraint, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 flex items-center"
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        {constraint}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Butterfly Change Section */}
              <div className="space-y-4">
                <label className="block text-white font-bold text-xl flex items-center space-x-3">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <span>Butterfly Effect - One Change to Explore</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/30">
                    BUTTERFLY PATH
                  </span>
                </label>

                <div
                  className={`transition-all duration-300 ${
                    focusedField === "oneChange" ? "scale-[1.01]" : ""
                  }`}
                >
                  <input
                    type="text"
                    className={`input-futuristic w-full ${
                      focusedField === "oneChange"
                        ? "neon-glow-indigo animate-pulse border-purple-400"
                        : "border-slate-600"
                    }`}
                    placeholder="Take a research internship, Learn cloud architecture, Start a startup, Move to Silicon Valley..."
                    onFocus={() => setFocusedField("oneChange")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        oneChange: e.target.value,
                      }))
                    }
                    suppressHydrationWarning={true}
                  />
                </div>

                <div className="p-4 glass-card bg-purple-500/5 border border-purple-500/20">
                  <p className="text-purple-200 text-sm flex items-start space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>
                      This will generate an alternative career timeline showing
                      how one decision can create a completely different future.
                      Leave blank to focus on the main path only.
                    </span>
                  </p>
                </div>
              </div>

              {/* Submit Section */}
              <div className="pt-12 space-y-10">
                <button
                  onClick={handleSubmit}
                  disabled={
                    formData.skills.length === 0 ||
                    formData.interests.length === 0 ||
                    isSubmitting
                  }
                  className={`w-full relative group transition-all duration-300 ${
                    isSubmitting
                      ? "cursor-not-allowed"
                      : "hover:scale-[1.02] hover:shadow-2xl"
                  }`}
                >
                  <div
                    className={`w-full rounded-2xl p-6 transition-all duration-300 ${
                      isSubmitting
                        ? "bg-gradient-to-r from-slate-600 to-slate-700"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 neon-glow-cyan"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-4">
                      {isSubmitting ? (
                        <>
                          <Brain className="w-8 h-8 animate-spin text-slate-200" />
                          <span className="text-slate-200 font-black text-xl">
                            Initializing AI Quantum Simulation...
                          </span>
                        </>
                      ) : (
                        <>
                          <Brain className="w-8 h-8 text-white group-hover:animate-pulse transition-all duration-300" />
                          <span className="text-white font-black text-xl md:text-2xl">
                            Generate Career Simulation
                          </span>
                        </>
                      )}
                    </div>

                    {!isSubmitting && (
                      <div className="mt-3">
                        <p className="text-white/90 text-sm text-center">
                          Experience your career possibilities across parallel
                          timelines
                        </p>
                      </div>
                    )}
                  </div>
                </button>

                {/* Enhanced status indicators with glow effects */}
                <div className="flex justify-center space-x-6">
                  <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-mono text-xs font-medium ${
                      formData.skills.length > 0
                        ? "text-green-300 bg-green-500/10 border border-green-500/30 glow-success"
                        : "text-red-300 bg-red-500/10 border border-red-500/30 glow-error"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        formData.skills.length > 0
                          ? "bg-green-400 shadow-lg shadow-green-400/50"
                          : "bg-red-400 shadow-lg shadow-red-400/50"
                      }`}
                    ></div>
                    <span>Skills ({formData.skills.length})</span>
                    {formData.skills.length > 0 && (
                      <CheckCircle className="w-3 h-3" />
                    )}
                  </div>

                  <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-mono text-xs font-medium ${
                      formData.interests.length > 0
                        ? "text-green-300 bg-green-500/10 border border-green-500/30 glow-success"
                        : "text-red-300 bg-red-500/10 border border-red-500/30 glow-error"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        formData.interests.length > 0
                          ? "bg-green-400 shadow-lg shadow-green-400/50"
                          : "bg-red-400 shadow-lg shadow-red-400/50"
                      }`}
                    ></div>
                    <span>Interests ({formData.interests.length})</span>
                    {formData.interests.length > 0 && (
                      <CheckCircle className="w-3 h-3" />
                    )}
                  </div>

                  <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 font-mono text-xs font-medium ${
                      formData.oneChange
                        ? "text-purple-300 bg-purple-500/10 border border-purple-500/30 glow-purple"
                        : "text-slate-400 bg-slate-600/10 border border-slate-500/30 glow-neutral"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        formData.oneChange
                          ? "bg-purple-400 shadow-lg shadow-purple-400/50"
                          : "bg-slate-500"
                      }`}
                    ></div>
                    <span>Butterfly</span>
                    {formData.oneChange && <Sparkles className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Modal */}
      {showValidationModal && <ValidationModal />}
    </>
  );
}
