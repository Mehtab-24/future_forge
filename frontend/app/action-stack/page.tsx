"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, FileText, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import ActionStack from "@/components/ActionStack";
import { SimulationResult, IntakeData } from "@/types/simulation";
import jsPDF from "jspdf";

export default function ActionStackPage() {
  const router = useRouter();
  const [baseline, setBaseline] = useState<SimulationResult | null>(null);
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Get data from sessionStorage
    const storedBaseline = sessionStorage.getItem("simulationBaseline");
    const storedIntakeData = sessionStorage.getItem("intakeData");

    if (!storedBaseline || !storedIntakeData) {
      router.push("/"); // Redirect to home if no data
      return;
    }

    try {
      setBaseline(JSON.parse(storedBaseline));
      setIntakeData(JSON.parse(storedIntakeData));
    } catch (error) {
      console.error("Error parsing stored data:", error);
      router.push("/");
      return;
    }

    setIsLoading(false);
  }, [router]);

  const exportToPDF = async () => {
    if (!baseline || !intakeData) return;

    setIsExporting(true);

    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;
      let yPosition = margin;
      let pageCount = 1;

      // Helper function to check if we need a new page
      const checkNewPage = (requiredSpace: number = 20) => {
        if (yPosition + requiredSpace > pageHeight - margin - 15) {
          pdf.addPage();
          pageCount++;
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Helper function to add text with word wrapping
      const addText = (
        text: string,
        fontSize: number = 12,
        isBold: boolean = false,
        color: string = "#000000"
      ) => {
        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", isBold ? "bold" : "normal");
        pdf.setTextColor(color);

        const lines = pdf.splitTextToSize(text, maxWidth);
        const lineHeight = fontSize * 0.4;
        const totalHeight = lines.length * lineHeight + 5;

        checkNewPage(totalHeight);

        pdf.text(lines, margin, yPosition);
        yPosition += totalHeight;
      };

      // Header
      pdf.setFillColor(59, 130, 246); // Blue background
      pdf.rect(0, 0, pageWidth, 40, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.text("FutureForge Career Action Plan", margin, 25);

      yPosition = 60;

      // Date and ID
      addText(
        `Generated: ${new Date().toLocaleDateString()}`,
        10,
        false,
        "#666666"
      );
      addText(
        `Plan ID: ${Math.random().toString(36).substring(7).toUpperCase()}`,
        10,
        false,
        "#666666"
      );
      yPosition += 10;

      // Profile Section
      addText("YOUR CAREER PROFILE", 16, true, "#1e40af");
      addText(`Target Role: ${baseline.role_title}`, 12, true);
      addText(`Skills: ${intakeData.skills.join(", ")}`, 11);
      addText(`Interests: ${intakeData.interests.join(", ")}`, 11);
      addText(`Success Probability: ${baseline.success_probability}%`, 11);
      addText(
        `Salary Range: $${baseline.estimated_salary_range.min.toLocaleString()} - $${baseline.estimated_salary_range.max.toLocaleString()}`,
        11
      );
      yPosition += 15;

      // Action Items
      addText("PRIORITY ACTION STACK", 16, true, "#1e40af");

      baseline.action_stack.forEach((action, idx) => {
        // Check if we need space for the action item (estimate ~80 points needed)
        checkNewPage(80);

        addText(`${idx + 1}. ${action.title}`, 14, true, "#059669");
        addText(
          `Type: ${
            action.type.charAt(0).toUpperCase() + action.type.slice(1)
          } | Priority: ${action.priority.toUpperCase()} | Duration: ${
            action.duration_weeks
          } weeks`,
          10,
          false,
          "#666666"
        );
        addText(
          `Effort: ${action.effort} | Investment: ${
            action.cost_estimate ? `$${action.cost_estimate}` : "Time only"
          }`,
          10,
          false,
          "#666666"
        );
        yPosition += 5;

        addText("Description:", 11, true);
        addText(action.description, 11);
        yPosition += 3;

        addText("Why This Matters:", 11, true);
        addText(action.why, 11);

        if (action.prerequisites && action.prerequisites.length > 0) {
          yPosition += 3;
          addText("Prerequisites:", 11, true);
          addText(action.prerequisites.join(", "), 11);
        }

        yPosition += 15;
      });

      // Summary
      const totalWeeks = baseline.action_stack.reduce(
        (sum, action) => sum + action.duration_weeks,
        0
      );
      const totalCost = baseline.action_stack.reduce(
        (sum, action) => sum + (action.cost_estimate || 0),
        0
      );

      checkNewPage(50);
      addText("SUMMARY", 16, true, "#1e40af");
      addText(`Total Duration: ${totalWeeks} weeks`, 12);
      addText(`Total Investment: $${totalCost.toLocaleString()}`, 12);
      addText(`Action Items: ${baseline.action_stack.length}`, 12);

      // Add footer to all pages
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor("#666666");
        pdf.text(
          "Generated by FutureForge - AI-Powered Career Planning",
          margin,
          pageHeight - 10
        );
        pdf.text(
          `Page ${i} of ${pageCount}`,
          pageWidth - margin - 30,
          pageHeight - 10
        );
      }

      // Save the PDF
      pdf.save(
        `FutureForge-Action-Plan-${new Date().toISOString().split("T")[0]}.pdf`
      );

      // Show success notification
      showNotification("PDF action plan downloaded successfully!", "success");
    } catch (error) {
      console.error("Error generating PDF:", error);
      showNotification("Error generating PDF. Please try again.", "error");
    } finally {
      setIsExporting(false);
    }
  };

  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    const notification = document.createElement("div");
    const bgColor =
      type === "success"
        ? "bg-green-500/10 border-green-500/30"
        : "bg-red-500/10 border-red-500/30";
    const iconColor = type === "success" ? "text-green-400" : "text-red-400";

    notification.className = `fixed top-20 right-4 glass-card p-4 text-white z-50 neon-glow-cyan animate-[slideInRight_0.5s_ease-out] flex items-center space-x-3 ${bgColor} border`;
    notification.innerHTML = `
      <svg class="w-5 h-5 ${iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
          type === "success" ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"
        }"></path>
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.5s ease-in both";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-pulse">🎯</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Loading Action Plan...
          </h2>
          <p className="text-slate-400">Preparing your personalized roadmap</p>
        </div>
      </div>
    );
  }

  if (!baseline || !intakeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center glass-card p-8">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-white font-bold text-2xl mb-4">
            Session Expired
          </h2>
          <p className="text-slate-400 mb-6">
            Your action plan data is not available. Please restart the
            simulation.
          </p>
          <button
            onClick={() => router.push("/")}
            className="transition-all duration-300 hover:scale-[1.02] rounded-2xl"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-3 rounded-2xl flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-bold">Back to Home</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      <div className="pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Simple Back Button Only */}
          <div className="mb-6">
            <button
              onClick={() => router.push("/simulation")}
              className="glass-card px-3 py-2 rounded-lg border border-slate-600/30 hover:border-cyan-500/30 transition-all duration-300 group flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <div className="text-white font-bold text-xs">
                  Back to Results
                </div>
                <div className="text-slate-400 text-xs">Timeline Analysis</div>
              </div>
            </button>
          </div>

          {/* ActionStack Component - Now Properly Centered */}
          <ActionStack
            actionStack={baseline.action_stack}
            onExport={exportToPDF}
            isExporting={isExporting}
          />
        </div>
      </div>
    </div>
  );
}
