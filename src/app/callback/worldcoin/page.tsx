"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function WorldCoinCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("🚀 searchParams:", searchParams)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const state = searchParams.get("state");

        if (error) {
          setError(`Authorization failed: ${error}`);
          return;
        }

        if (!code) {
          setError("No authorization code received");
          return;
        }

        // Store the authorization code in localStorage for the backend to use
        const redirectUri = `${window.location.origin}/callback/worldcoin`;
        localStorage.setItem("worldIdAuthCode", code);
        localStorage.setItem("worldIdRedirectUri", redirectUri);
        localStorage.setItem("worldIdState", state || "");

        // Redirect back to home page
        router.push("/");
      } catch (error) {
        console.error("Error processing callback:", error);
        setError("Failed to process authorization callback");
      }
    };

    processCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Authorization Error
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Processing Authorization</h1>
        <p className="text-gray-600">
          Please wait while we complete your sign-in...
        </p>
      </div>
    </div>
  );
}

export default function WorldCoinCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-2">Loading...</h1>
          </div>
        </div>
      }
    >
      <WorldCoinCallbackContent />
    </Suspense>
  );
}
