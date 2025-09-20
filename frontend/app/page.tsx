"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Zap,
  Brain,
  Users,
  TrendingUp,
  Download,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
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

  if (showIntakeForm) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navigation />
        <div className="pt-28 pb-12 px-4">
          <IntakeForm
            onSubmit={handleIntakeSubmit}
            onBack={() => setShowIntakeForm(false)}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <Navigation />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl float-animation"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-sky-500/10 rounded-full blur-3xl float-animation"
          style={{ animationDelay: "3s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="section-padding pt-32 pb-20">
        <div className="section-container text-center relative z-10">
          <div className="space-y-8">
            {/* Main headline */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-card text-cyan-400 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Career Intelligence
              </div>

              <h1 className="text-6xl md:text-8xl font-black font-['Orbitron'] leading-tight">
                <span className="text-gradient-primary">Future</span>
                <span className="text-gradient-accent">Forge</span>
              </h1>

              <p className="text-2xl md:text-4xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed">
                Experience{" "}
                <span className="text-gradient-accent font-bold">20 years</span>{" "}
                of career possibilities in{" "}
                <span className="text-gradient-accent font-bold">
                  20 minutes
                </span>
              </p>
            </div>

            {/* Value proposition */}
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl text-slate-400 leading-relaxed">
                Our quantum career simulator uses advanced AI to generate
                parallel timeline futures based on your skills, interests, and
                the butterfly effect of key decisions.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => setShowIntakeForm(true)}
                className="btn-primary text-xl px-10 py-4 font-bold inline-flex items-center space-x-3 group neon-glow-blue"
              >
                <Brain className="w-6 h-6 group-hover:animate-pulse" />
                <span>Start Career Simulation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-500 mt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No Signup Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Export Ready Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient-cool mb-6 font-['Orbitron']">
              How FutureForge Works
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Advanced AI simulation meets beautiful design to unlock your
              career potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - AI Analysis */}
            <div className="feature-card group neon-glow-cyan">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mr-4 group-hover:scale-110 transition-all duration-300">
                  <Brain className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-gradient-cool transition-all duration-300">
                  AI Analysis Engine
                </h3>
              </div>

              <p className="text-slate-400 leading-relaxed mb-6">
                Advanced Gemini AI analyzes your skills, interests, and
                constraints to understand your unique professional profile and
                market positioning.
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-300 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  <span>Advanced skill gap identification</span>
                </div>
                <div className="flex items-center text-sm text-slate-300 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  <span>Real-time market trend analysis</span>
                </div>
                <div className="flex items-center text-sm text-slate-300 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                  <span>Success probability calculations</span>
                </div>
              </div>
            </div>

            {/* Feature 2 - Butterfly Effect */}
            <div className="feature-card group neon-glow-indigo">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 mr-4 group-hover:scale-110 transition-all duration-300">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-gradient-primary transition-all duration-300">
                  Butterfly Effect Simulation
                </h3>
              </div>

              <p className="text-slate-400 leading-relaxed mb-6">
                Explore how one key decision creates completely different career
                universes. See parallel timelines and alternative outcomes.
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-300 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                  <span>Alternative pathway generation</span>
                </div>
                <div className="flex items-center text-sm text-slate-300 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                  <span>Decision impact analysis</span>
                </div>
                <div className="flex items-center text-sm text-slate-300 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                  <span>Risk vs reward comparison</span>
                </div>
              </div>
            </div>

            {/* Feature 3 - Actionable Roadmaps */}
            <div className="feature-card group neon-glow-cyan">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 mr-4 group-hover:scale-110 transition-all duration-300">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-gradient-accent transition-all duration-300">
                  Actionable Roadmaps
                </h3>
              </div>

              <p className="text-slate-400 leading-relaxed mb-6">
                Get detailed, prioritized action plans with courses, projects,
                timelines, and cost estimates you can follow immediately.
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-300 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                  <span>Intelligent priority stacking</span>
                </div>
                <div className="flex items-center text-sm text-slate-300 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                  <span>Realistic time estimates</span>
                </div>
                <div className="flex items-center text-sm text-slate-300 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                  <span>Detailed cost breakdowns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient-primary mb-6 font-['Orbitron']">
              Your Journey in 4 Steps
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From career confusion to crystal-clear direction in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="glass-card glass-card-hover p-6 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4 mt-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Share Your Profile
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Input your skills, interests, constraints, and career
                aspirations. Our intelligent form guides you through the
                process.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card glass-card-hover p-6 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-4 mt-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                AI Processing
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our quantum simulation engine analyzes market data, trends, and
                opportunities to generate your personalized career paths.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card glass-card-hover p-6 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-4 mt-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Explore Timelines
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Review your primary career path and butterfly effect
                alternatives. Compare risks, rewards, and timelines
                side-by-side.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-card glass-card-hover p-6 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
              <Download className="w-12 h-12 text-cyan-400 mx-auto mb-4 mt-4" />
              <h3 className="text-xl font-bold text-white mb-3">Take Action</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Export your detailed career plan with prioritized actions,
                timelines, and resources. Start executing immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section-padding bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient-accent mb-6 font-['Orbitron']">
              Powered by Cutting-Edge AI
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Built for the Google Gen AI Exchange Hackathon, FutureForge
              represents the future of career planning technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Features */}
            <div className="space-y-8">
              <div className="glass-card p-6 border-l-4 border-cyan-400">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Zap className="w-5 h-5 text-cyan-400 mr-3" />
                  Google Gemini AI Integration
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Advanced language models understand context, analyze market
                  trends, and generate realistic career projections based on
                  real-world data.
                </p>
              </div>

              <div className="glass-card p-6 border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Brain className="w-5 h-5 text-blue-400 mr-3" />
                  Quantum Career Simulation
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Multi-dimensional analysis considering skills, interests,
                  market dynamics, and the butterfly effect of career decisions.
                </p>
              </div>

              <div className="glass-card p-6 border-l-4 border-indigo-400">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 text-indigo-400 mr-3" />
                  Real-Time Market Data
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Stay ahead with insights from current job market trends,
                  salary data, and emerging technology sectors.
                </p>
              </div>
            </div>

            {/* Right column - Stats/Visual */}
            <div className="text-center lg:text-left">
              <div className="glass-card p-8 neon-glow-cyan">
                <h3 className="text-3xl font-black text-gradient-cool mb-6 font-['Orbitron']">
                  Simulation Capabilities
                </h3>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-black text-cyan-400 mb-2">
                      20+
                    </div>
                    <div className="text-sm text-slate-500">
                      Years Simulated
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-400 mb-2">
                      ∞
                    </div>
                    <div className="text-sm text-slate-500">Career Paths</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-indigo-400 mb-2">
                      100%
                    </div>
                    <div className="text-sm text-slate-500">Personalized</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-sky-400 mb-2">
                      20min
                    </div>
                    <div className="text-sm text-slate-500">Total Time</div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Hackathon Innovation Project</span>
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="section-container text-center relative z-10">
          <div className="glass-card p-12 neon-glow-indigo max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-['Orbitron']">
              Ready to{" "}
              <span className="text-gradient-primary">Forge Your Future</span>?
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Join the career planning revolution. Experience AI-powered
              simulation that shows you exactly where your decisions lead.
            </p>

            <div className="space-y-6">
              <button
                onClick={() => setShowIntakeForm(true)}
                className="btn-primary text-2xl px-12 py-5 font-bold inline-flex items-center space-x-4 group neon-glow-blue"
              >
                <Zap className="w-8 h-8 group-hover:animate-spin" />
                <span>Start Your Simulation Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <p className="text-slate-500 text-sm flex flex-wrap items-center justify-center gap-4">
                <span className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Instant results</span>
                </span>
                <span className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span>Personalized paths</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-purple-400" />
                  <span>Export ready</span>
                </span>
                <span className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span>Career transformation</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
