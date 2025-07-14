"use client";

import { ProofVerificationButton } from "@/components/proof-verification-button";
import { SignInButton } from "@/components/sign-in-button";
import { UserInfo } from "@/components/user-info";
import { ProofVerificationResult, WorldIdUser } from "@/types/world-id";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<WorldIdUser | null>(null);
  const [isOrbVerified, setIsOrbVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proofVerificationResult, setProofVerificationResult] =
    useState<ProofVerificationResult | null>(null);
  const hasProcessedAuthCode = useRef(false);

  useEffect(() => {
    // Check if we have an authorization code from the callback
    const authCode = localStorage.getItem("worldIdAuthCode");
    const redirectUri = localStorage.getItem("worldIdRedirectUri");

    if (authCode && redirectUri && !hasProcessedAuthCode.current) {
      hasProcessedAuthCode.current = true;
      verifyWorldIdToken(authCode, redirectUri);
    }
  }, []);

  const verifyWorldIdToken = async (code: string, redirectUri: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/verify-world-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, redirectUri }),
      });

      const result = await response.json();

      if (result.success) {
        setUser(result.user);
        setIsOrbVerified(result.isOrbVerified);

        // Clear the stored authorization code
        localStorage.removeItem("worldIdAuthCode");
        localStorage.removeItem("worldIdRedirectUri");
        localStorage.removeItem("worldIdState");
      } else {
        setError(result.error || "Verification failed");
      }
    } catch (error) {
      console.error("Error verifying World ID token:", error);
      setError("Failed to verify World ID token");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setIsOrbVerified(false);
    setError(null);
    setProofVerificationResult(null);
    hasProcessedAuthCode.current = false;
  };

  const handleSignInError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleProofVerificationSuccess = (result: ProofVerificationResult) => {
    setProofVerificationResult(result);
    setError(null);
  };

  const handleProofVerificationError = (errorMessage: string) => {
    setError(errorMessage);
    setProofVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-poppins">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#F5C542] rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/world-id.webp"
                  alt="World ID"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-semibold">World ID Demo</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8 flex flex-col items-center justify-center">
          {/* Error Display */}
          {error && (
            <div className="bg-[#2A2A2A] border border-[#EF4444] rounded-xl p-4 animate-fade-in">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center">
                  <AlertCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Proof Verification Success Display */}
          {proofVerificationResult && (
            <div className="bg-[#2A2A2A] border border-[#10B981] rounded-xl p-4 animate-fade-in">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-[#10B981]">
                  Proof verification successful!
                </span>
                <div className="flex flex-col gap-1 text-xs text-[#999999]">
                  <span className="break-all">
                    Nullifier Hash: {proofVerificationResult.nullifier_hash}
                  </span>
                  <span>Action: {proofVerificationResult.action}</span>
                  <span>Message: {proofVerificationResult.message}</span>
                  <span>Uses: {proofVerificationResult.uses}</span>
                  <span>Max Uses: {proofVerificationResult.max_uses}</span>
                  <span>
                    Verification Level:{" "}
                    {proofVerificationResult.verification_level}
                  </span>
                  <span>Created At: {proofVerificationResult.created_at}</span>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#F5C542] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-[#999999] font-medium">
                  Verifying your World ID...
                </p>
              </div>
            </div>
          )}

          {/* User Info or Sign In */}
          {user ? (
            <div className="space-y-8">
              <UserInfo
                user={user}
                isOrbVerified={isOrbVerified}
                onSignOut={handleSignOut}
              />

              {/* Proof Verification Section */}
              {!proofVerificationResult && (
                <div className="bg-[#2A2A2A] rounded-xl p-6 border border-[#333333]">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <h3 className="text-xl font-semibold">
                      Proof Verification
                    </h3>
                    <p className="text-[#999999] text-sm">
                      Verify your identity using World ID&apos;s zero-knowledge
                      proof system.
                    </p>
                    <ProofVerificationButton
                      onVerificationSuccess={handleProofVerificationSuccess}
                      onVerificationError={handleProofVerificationError}
                      actionId="landverse-rewards" // @note
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center max-w-md mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Welcome</h2>
                <p className="text-[#999999] leading-relaxed">
                  Sign in with your World ID to verify your identity and see
                  your user information.
                </p>
              </div>

              <SignInButton onSignInError={handleSignInError} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
