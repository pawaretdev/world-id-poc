"use client";

import { WorldIdService } from "@/services/world-id-service";
import { useState } from "react";

interface SignInButtonProps {
  onSignInError?: (error: string) => void;
}

export function SignInButton({
  onSignInError,
}: SignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      const redirectUri = `${window.location.origin}/callback/worldcoin`;
      const authorizationUrl = WorldIdService.getAuthorizationUrl(redirectUri);

      // Redirect to World ID authorization
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
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Signing in...
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Sign in with World ID
        </>
      )}
    </button>
  );
}
