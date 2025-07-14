import { WorldIdService } from "@/services/world-id-service";
import { ProofVerificationRequest } from "@/types/world-id";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: ProofVerificationRequest = await request.json();

    const { merkle_root, nullifier_hash, proof, verification_level, action } =
      body;

    // Validate required fields
    if (
      !merkle_root ||
      !nullifier_hash ||
      !proof ||
      !verification_level ||
      !action
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required parameters: merkle_root, nullifier_hash, proof, credential_type, action",
        },
        { status: 400 }
      );
    }

    // Verify the proof
    const result = await WorldIdService.verifyProof({
      nullifier_hash,
      proof,
      merkle_root,
      verification_level,
      action,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Proof verification failed" },
        { status: 400 }
      );
    }

    const response = {
      success: result.success,
      uses: result.uses,
      action: result.action,
      max_uses: result.max_uses,
      nullifier_hash: result.nullifier_hash, // @note store nullifier_hash to prevent proof reuse https://docs.world.org/world-id/id/web-vanilla#important-considerations
      created_at: result.created_at,
      verification_level: result.verification_level,
      message: result.message,
    };

    console.log("World ID Proof Verification Result:", response);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in proof verification API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
