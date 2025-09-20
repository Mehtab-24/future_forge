import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black font-['Orbitron'] text-gradient-primary mb-4">
              About <span className="text-white">FutureForge</span>
            </h1>
            <p className="text-xl text-white/70">
              🔮 The future of career planning is here
            </p>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                <span className="text-4xl mr-3">🧠</span>
                What is FutureForge?
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                FutureForge is an AI-powered career simulation platform that
                lets you experience 20 years of career possibilities in just 20
                minutes. Using advanced quantum simulation algorithms, we
                analyze your skills, interests, and the butterfly effect of key
                decisions to generate personalized career timelines.
              </p>
              <p className="text-white/80 leading-relaxed">
                Built for the Google Gen AI Exchange Hackathon, FutureForge
                represents the cutting edge of career planning technology,
                combining machine learning with beautiful, futuristic user
                experience design.
              </p>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                <span className="text-4xl mr-3">⚡</span>
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    1. Input Analysis
                  </h3>
                  <p className="text-white/70 text-sm">
                    Our AI analyzes your skills, interests, and constraints to
                    understand your unique profile
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    2. Quantum Simulation
                  </h3>
                  <p className="text-white/70 text-sm">
                    Advanced algorithms generate realistic career trajectories
                    based on market data
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    3. Butterfly Effect
                  </h3>
                  <p className="text-white/70 text-sm">
                    Explore how one key decision can create completely different
                    career universes
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    4. Actionable Plans
                  </h3>
                  <p className="text-white/70 text-sm">
                    Get detailed roadmaps with courses, projects, and timelines
                    you can follow
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                🚀 Ready to Forge Your Future?
              </h2>
              <p className="text-white/70 mb-6">
                Join thousands of professionals who have discovered their
                optimal career paths
              </p>
              <Link href="/" className="btn-primary">
                Start Your Simulation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
