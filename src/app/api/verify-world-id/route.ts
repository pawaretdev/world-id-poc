import { WorldIdService } from "@/services/world-id-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, redirectUri } = body;

    if (!code || !redirectUri) {
      return NextResponse.json(
        { error: "Missing required parameters: code and redirectUri" },
        { status: 400 }
      );
    }

    // Verify the World ID token and get user info
    const result = await WorldIdService.verifyWorldIdToken(code, redirectUri);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Verification failed" },
        { status: 400 }
      );
    }

    // Log the verification result
    console.log("World ID Verification Result:", {
      userId: result.user?.sub,
      email: result.user?.email,
      name: result.user?.name,
      isOrbVerified: result.isOrbVerified,
      verificationLevel:
        result.user?.["https://id.worldcoin.org/v1"]?.verification_level,
    });

    return NextResponse.json({
      success: true,
      user: result.user,
      isOrbVerified: result.isOrbVerified,
    });
  } catch (error) {
    console.error("Error in verify-world-id API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
