"use client";

import { ProofVerificationResult } from "@/types/world-id";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import Image from "next/image";
import { useState } from "react";

interface ProofVerificationButtonProps {
  onVerificationSuccess?: (result: ProofVerificationResult) => void;
  onVerificationError?: (error: string) => void;
  actionId?: string;
  signal?: string;
}

export function ProofVerificationButton({
  onVerificationSuccess,
  onVerificationError,
  actionId = "landverse-rewards",
}: ProofVerificationButtonProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleVerify = async (proof: any) => {
    setIsVerifying(true);

    try {
      const response = await fetch("/api/verify-proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merkle_root: proof.merkle_root,
          nullifier_hash: proof.nullifier_hash,
          proof: proof.proof,
          verification_level: proof.credential_type,
          action: actionId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        onVerificationSuccess?.(result);
      } else {
        onVerificationError?.(result.error || "Verification failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Verification failed";
      onVerificationError?.(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (proof: any) => {
    handleVerify(proof);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    console.error("IDKit error:", error);
    onVerificationError?.(error);
  };

  return (
    <IDKitWidget
      app_id={process.env.NEXT_PUBLIC_WORLD_ID_CLIENT_ID as `app_${string}`}
      action={actionId}
      onSuccess={onSuccess}
      onError={onError}
      handleVerify={handleVerify}
      verification_level={VerificationLevel.Device} // @note change if want to verify with orb
    >
      {({ open }) => (
        <button
          onClick={open}
          disabled={isVerifying}
          className="bg-[#F5C542] hover:bg-[#D1A24E] disabled:bg-[#666666] text-[#1A1A1A] font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-3 min-w-[200px] shadow-lg hover:shadow-xl"
        >
          {isVerifying ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <Image
                src="/world-id.webp"
                alt="World ID"
                width={20}
                height={20}
                className="w-5 h-5 object-cover"
              />
              <span>Verify with World ID</span>
            </>
          )}
        </button>
      )}
    </IDKitWidget>
  );
}
