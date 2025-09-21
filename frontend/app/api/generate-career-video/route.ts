import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      roleTitle,
      skills,
      duration = 8,
      style = "professional-cinematic",
    } = await request.json();

    if (!roleTitle) {
      return NextResponse.json(
        { error: "Role title is required" },
        { status: 400 }
      );
    }

    // Simulate AI video generation process (2-3 seconds for realism)
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 2000 + 2000)
    );

    // Create detailed prompt for AI video generation
    const videoPrompt = `Professional career progression montage for ${roleTitle}: 
    Starting scene: Fresh graduate or junior professional at modern desk with laptop
    Mid scene: Presenting to colleagues, code reviews, team meetings, collaboration
    Final scene: Leading meetings, mentoring others, corner office or team leadership
    Skills focus: ${skills.join(", ")}
    Style: ${style}, smooth transitions, bright modern office lighting, diverse workplace
    Duration: ${duration} seconds, cinematic quality, professional attire`;

    // Mock successful video generation response
    // In real implementation, this would call Google Veo API
    const mockVideoUrl = generateMockVideoUrl(roleTitle);

    const response = {
      success: true,
      videoUrl: mockVideoUrl,
      prompt: videoPrompt,
      duration: duration,
      style: style,
      generatedAt: new Date().toISOString(),
      model: "veo-3.0-generate-001",
      resolution: "1080p",
      format: "mp4",
    };

    console.log(`✅ Video generated for ${roleTitle}:`, mockVideoUrl);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Video generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate video. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper function to generate realistic mock video URLs
function generateMockVideoUrl(roleTitle: string): string {
  const videoId = Math.random().toString(36).substring(2, 15);
  const sanitizedRole = roleTitle.toLowerCase().replace(/\s+/g, "-");

  // Return a realistic-looking video URL (in production, this would be from Google Cloud Storage)
  return `https://storage.googleapis.com/futureforge-videos/${sanitizedRole}-${videoId}.mp4`;
}

export const runtime = "nodejs";
export const maxDuration = 30;
