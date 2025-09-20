"use client";
import { useState } from "react";
import { IntakeData } from "@/types/simulation";

interface IntakeFormProps {
  onSubmit: (data: IntakeData) => void;
  onBack: () => void;
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSkillsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));
    setErrors((prev) => ({ ...prev, skills: "" }));
  };

  const handleInterestsChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    }));
    setErrors((prev) => ({ ...prev, interests: "" }));
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.skills.length === 0) {
      newErrors.skills = "Please add at least one skill";
    }

    if (formData.interests.length === 0) {
      newErrors.interests = "Please add at least one career interest";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <button
              onClick={onBack}
              className="absolute left-0 top-0 nav-link flex items-center space-x-2 text-white/60 hover:text-white"
            >
              <span>←</span>
              <span>Back</span>
            </button>

            <h2 className="text-4xl md:text-5xl font-black font-['Orbitron'] text-gradient-primary mb-4">
              Career Simulation Intake
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Tell us about your skills and aspirations to generate your
              personalized career universe
            </p>

            {/* Progress indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  formData.skills.length > 0
                    ? "bg-green-400 neon-glow-blue"
                    : "bg-white/20"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  formData.interests.length > 0
                    ? "bg-green-400 neon-glow-blue"
                    : "bg-white/20"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  formData.constraints.length > 0
                    ? "bg-green-400 neon-glow-blue"
                    : "bg-white/20"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  formData.oneChange
                    ? "bg-purple-400 neon-glow-purple"
                    : "bg-white/20"
                }`}
              ></div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Skills Section */}
            <div className="space-y-4">
              <label className="block text-white font-bold text-xl flex items-center space-x-3">
                <span className="text-3xl">🛠️</span>
                <span>Technical Skills</span>
                <span className="text-red-400 text-sm font-normal">
                  *Required
                </span>
              </label>

              <div
                className={`transition-all duration-300 ${
                  focusedField === "skills" ? "scale-[1.02]" : ""
                }`}
              >
                <textarea
                  className={`input-futuristic w-full h-24 resize-none ${
                    errors.skills
                      ? "border-red-500 neon-glow-pink"
                      : focusedField === "skills"
                      ? "neon-glow-blue"
                      : ""
                  }`}
                  placeholder="React, Python, JavaScript, Machine Learning, Data Analysis, Cloud Computing..."
                  onFocus={() => setFocusedField("skills")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  suppressHydrationWarning={true}
                />
                {errors.skills && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <span className="mr-2">⚠️</span>
                    {errors.skills}
                  </p>
                )}
              </div>

              {/* Skill suggestions */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-white/50 text-sm mr-2">Suggestions:</span>
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
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm hover:bg-blue-500/30 transition-all border border-blue-500/30 hover:scale-105"
                  >
                    + {skill}
                  </button>
                ))}
              </div>

              {/* Skills display */}
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 p-4 glass-card">
                  <span className="text-white/70 text-sm mr-2">
                    Added skills:
                  </span>
                  {formData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interests Section */}
            <div className="space-y-4">
              <label className="block text-white font-bold text-xl flex items-center space-x-3">
                <span className="text-3xl">💡</span>
                <span>Career Interests & Passions</span>
                <span className="text-red-400 text-sm font-normal">
                  *Required
                </span>
              </label>

              <div
                className={`transition-all duration-300 ${
                  focusedField === "interests" ? "scale-[1.02]" : ""
                }`}
              >
                <textarea
                  className={`input-futuristic w-full h-24 resize-none ${
                    errors.interests
                      ? "border-red-500 neon-glow-pink"
                      : focusedField === "interests"
                      ? "neon-glow-purple"
                      : ""
                  }`}
                  placeholder="AI/ML, Product Management, Full-stack Development, Data Science, Entrepreneurship, Research..."
                  onFocus={() => setFocusedField("interests")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handleInterestsChange(e.target.value)}
                  suppressHydrationWarning={true}
                />
                {errors.interests && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <span className="mr-2">⚠️</span>
                    {errors.interests}
                  </p>
                )}
              </div>

              {/* Interest suggestions */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-white/50 text-sm mr-2">Suggestions:</span>
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
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm hover:bg-purple-500/30 transition-all border border-purple-500/30 hover:scale-105"
                  >
                    + {interest}
                  </button>
                ))}
              </div>

              {/* Interests display */}
              {formData.interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 p-4 glass-card">
                  <span className="text-white/70 text-sm mr-2">
                    Added interests:
                  </span>
                  {formData.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      ✓ {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Constraints Section */}
            <div className="space-y-4">
              <label className="block text-white font-bold text-xl flex items-center space-x-3">
                <span className="text-3xl">⚖️</span>
                <span>Constraints & Preferences</span>
                <span className="text-gray-400 text-sm font-normal">
                  Optional
                </span>
              </label>

              <div
                className={`transition-all duration-300 ${
                  focusedField === "constraints" ? "scale-[1.02]" : ""
                }`}
              >
                <textarea
                  className={`input-futuristic w-full h-20 resize-none ${
                    focusedField === "constraints" ? "neon-glow-pink" : ""
                  }`}
                  placeholder="Remote work preferred, 2-year timeline, budget under $10k, no relocating, family commitments..."
                  onFocus={() => setFocusedField("constraints")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handleConstraintsChange(e.target.value)}
                  suppressHydrationWarning={true}
                />
              </div>

              {formData.constraints.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 p-4 glass-card">
                  <span className="text-white/70 text-sm mr-2">
                    Constraints:
                  </span>
                  {formData.constraints.map((constraint, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm border border-pink-500/30"
                    >
                      ⚖️ {constraint}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Butterfly Change Section */}
            <div className="space-y-4">
              <label className="block text-white font-bold text-xl flex items-center space-x-3">
                <span className="text-3xl">🦋</span>
                <span>Butterfly Effect - One Change to Explore</span>
                <span className="text-orange-400 text-sm font-normal">
                  Butterfly Path
                </span>
              </label>

              <div
                className={`transition-all duration-300 ${
                  focusedField === "oneChange" ? "scale-[1.02]" : ""
                }`}
              >
                <input
                  type="text"
                  className={`input-futuristic w-full ${
                    focusedField === "oneChange"
                      ? "neon-glow-purple animate-pulse"
                      : ""
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

              <div className="p-4 glass-card bg-orange-500/5 border border-orange-500/20">
                <p className="text-orange-200 text-sm flex items-start space-x-2">
                  <span className="text-orange-400 text-lg flex-shrink-0">
                    💫
                  </span>
                  <span>
                    This will generate an alternative career timeline showing
                    how one decision can create a completely different future.
                    Leave blank to focus on the main path only.
                  </span>
                </p>
              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-8 space-y-6">
              <button
                onClick={handleSubmit}
                disabled={
                  formData.skills.length === 0 ||
                  formData.interests.length === 0 ||
                  isSubmitting
                }
                className={`w-full relative overflow-hidden group transition-all duration-300 ${
                  isSubmitting ? "cursor-not-allowed" : "hover:scale-[1.02]"
                }`}
              >
                <div className="bg-primary-gradient rounded-2xl p-6 group-hover:shadow-2xl transition-all disabled:opacity-50">
                  <div className="flex items-center justify-center space-x-4">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin text-3xl">🧠</div>
                        <span className="text-white font-black text-xl">
                          Initializing AI Quantum Simulation...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl group-hover:animate-bounce">
                          🚀
                        </span>
                        <span className="text-white font-black text-xl md:text-2xl">
                          Generate Career Simulation
                        </span>
                        <span className="text-4xl group-hover:animate-bounce">
                          🔮
                        </span>
                      </>
                    )}
                  </div>

                  {!isSubmitting && (
                    <p className="text-white/80 text-sm mt-2">
                      Experience your career possibilities across parallel
                      timelines
                    </p>
                  )}
                </div>
              </button>

              {/* Requirements status */}
              <div className="flex justify-center space-x-8 text-sm">
                <div
                  className={`flex items-center space-x-2 transition-all ${
                    formData.skills.length > 0
                      ? "text-green-400"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      formData.skills.length > 0
                        ? "bg-green-400 neon-glow-blue"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="font-mono">
                    SKILLS ({formData.skills.length})
                  </span>
                </div>

                <div
                  className={`flex items-center space-x-2 transition-all ${
                    formData.interests.length > 0
                      ? "text-green-400"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      formData.interests.length > 0
                        ? "bg-green-400 neon-glow-blue"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="font-mono">
                    INTERESTS ({formData.interests.length})
                  </span>
                </div>

                <div
                  className={`flex items-center space-x-2 transition-all ${
                    formData.oneChange ? "text-purple-400" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      formData.oneChange
                        ? "bg-purple-400 neon-glow-purple"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="font-mono">BUTTERFLY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
