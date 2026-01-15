"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SimulationView from "@/components/SimulationView";
import { IntakeData } from "@/types/simulation";

export default function SimulationPage() {
  const router = useRouter();
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("intakeData");
      if (stored) {
        const data = JSON.parse(stored);
        setIntakeData(data);
      }
      // Removed automatic redirect to prevent "jitter" when clicking nav links
      // Instead, we'll show the "Session Expired" UI below
    } catch (error) {
      console.error("Failed to parse intake data:", error);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">⚡</div>
          <p className="text-white/60 text-xl">
            Loading your career universe...
          </p>
        </div>
      </div>
    );
  }

  if (!intakeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-8">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-white font-bold text-2xl mb-4">
            Session Expired
          </h2>
          <p className="text-white/70 mb-6">
            Your career simulation data is not available. Please restart the
            process.
          </p>
          <button onClick={() => router.push("/")} className="btn-primary">
            Start New Simulation
          </button>
        </div>
      </div>
    );
  }

  return <SimulationView intakeData={intakeData} />;
}
