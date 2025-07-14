"use client";

import { SignInButton } from "@/components/sign-in-button";
import { UserInfo } from "@/components/user-info";
import { WorldIdUser } from "@/types/world-id";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<WorldIdUser | null>(null);
  const [isOrbVerified, setIsOrbVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have an authorization code from the callback
    const authCode = localStorage.getItem("worldIdAuthCode");
    const redirectUri = localStorage.getItem("worldIdRedirectUri");

    if (authCode && redirectUri) {
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
  };

  const handleSignInError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-md">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Verifying your World ID...</p>
          </div>
        )}

        {user ? (
          <UserInfo
            user={user}
            isOrbVerified={isOrbVerified}
            onSignOut={handleSignOut}
          />
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Welcome to World ID Demo
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Sign in with your World ID to verify your identity and see your
              user information.
            </p>
            <SignInButton onSignInError={handleSignInError} />
          </div>
        )}

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
