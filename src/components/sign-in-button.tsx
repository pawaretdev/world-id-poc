"use client";

import { WorldIdService } from "@/services/world-id-service";
import Image from "next/image";
import { useState } from "react";

interface SignInButtonProps {
  onSignInError?: (error: string) => void;
}

export function SignInButton({ onSignInError }: SignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      const authorizationUrl = WorldIdService.getAuthorizationUrl();
      window.location.href = authorizationUrl;
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error instanceof Error ? error.message : "Sign-in failed";
      onSignInError?.(errorMessage);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="bg-[#F5C542] hover:bg-[#D1A24E] disabled:bg-[#666666] text-[#1A1A1A] font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-3 min-w-[200px] shadow-lg hover:shadow-xl"
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
          <span>Signing in...</span>
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
          <span>Sign in with World ID</span>
        </>
      )}
    </button>
  );
}
