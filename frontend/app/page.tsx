"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import IntakeForm from "@/components/IntakeForm";
import { IntakeData } from "@/types/simulation";

export default function Home() {
  const router = useRouter();
  const [showIntakeForm, setShowIntakeForm] = useState(false);

  const handleIntakeSubmit = (data: IntakeData) => {
    sessionStorage.setItem("intakeData", JSON.stringify(data));
    router.push("/simulation");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-16">
      <Navigation />

      {/* Hero Section */}
      <div className="relative pt-24 pb-12 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl float-animation"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {!showIntakeForm ? (
            // Landing page content
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black font-['Orbitron'] text-gradient-primary leading-tight">
                  Future<span className="text-white">Forge</span>
                </h1>
                <p className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                  🚀 Experience{" "}
                  <span className="text-gradient-accent font-bold">
                    20 years
                  </span>{" "}
                  of career possibilities in{" "}
                  <span className="text-gradient-accent font-bold">
                    20 minutes
                  </span>
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-xl text-white/70 leading-relaxed">
                  Our AI-powered quantum career simulator generates parallel
                  timeline futures based on your skills, interests, and the
                  butterfly effect of key decisions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="glass-card glass-card-hover p-6 text-center">
                    <div className="text-4xl mb-4 pulse-glow">🧠</div>
                    <h3 className="text-xl font-bold mb-2">
                      AI-Powered Analysis
                    </h3>
                    <p className="text-white/70 text-sm">
                      Advanced Gemini AI analyzes your profile for personalized
                      career trajectories
                    </p>
                  </div>

                  <div
                    className="glass-card glass-card-hover p-6 text-center"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="text-4xl mb-4 pulse-glow">🦋</div>
                    <h3 className="text-xl font-bold mb-2">Butterfly Effect</h3>
                    <p className="text-white/70 text-sm">
                      See how one decision creates completely different career
                      universes
                    </p>
                  </div>

                  <div
                    className="glass-card glass-card-hover p-6 text-center"
                    style={{ animationDelay: "2s" }}
                  >
                    <div className="text-4xl mb-4 pulse-glow">📋</div>
                    <h3 className="text-xl font-bold mb-2">Actionable Plans</h3>
                    <p className="text-white/70 text-sm">
                      Export detailed roadmaps with courses, projects, and
                      timelines
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <button
                  onClick={() => setShowIntakeForm(true)}
                  className="btn-primary text-xl px-8 py-4 font-bold"
                >
                  🚀 Start Your Career Simulation
                </button>

                <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-white/50">
                  <span className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Free to use
                  </span>
                  <span className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    No signup required
                  </span>
                  <span className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    Export your results
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // Intake form
            <IntakeForm
              onSubmit={handleIntakeSubmit}
              onBack={() => setShowIntakeForm(false)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
