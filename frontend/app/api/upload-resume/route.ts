import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max 10MB allowed." },
        { status: 400 }
      );
    }

    // Simulate processing delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock AI skill extraction
    const extractedSkills = [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "SQL",
      "Machine Learning",
      "Data Analysis",
      "Project Management",
      "Communication",
      "Leadership",
      "Problem Solving",
    ];

    const extractedInterests = [
      "Web Development",
      "AI/ML",
      "Data Science",
      "Product Management",
    ];

    const mockResults = {
      success: true,
      fileName: file.name,
      fileSize: file.size,
      extractedSkills: extractedSkills.slice(
        0,
        Math.floor(Math.random() * 5) + 3
      ),
      extractedInterests: extractedInterests.slice(
        0,
        Math.floor(Math.random() * 3) + 2
      ),
      extractionConfidence: Math.floor(Math.random() * 20) + 80,
      processingTime: "2.3s",
    };

    return NextResponse.json(mockResults);
  } catch (error) {
    console.error("Upload processing error:", error);
    return NextResponse.json(
      {
        error: "Failed to process resume. Please try again.",
      },
      { status: 500 }
    );
  }
}
