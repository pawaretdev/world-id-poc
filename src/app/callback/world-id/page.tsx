"use client";

import { WorldIdService } from "@/services/world-id-service";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function WorldCoinCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
        const baseUrl = WorldIdService.getBaseUrl();
        const redirectUri = `${baseUrl}/callback/world-id`;
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
      <div className="min-h-screen bg-[#1A1A1A] text-white font-poppins flex items-center justify-center">
        <div className="bg-[#2A2A2A] rounded-xl p-8 border border-[#333333] max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-[#EF4444] rounded-xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Authorization Error
          </h1>
          <p className="text-[#999999] mb-6 leading-relaxed">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#F5C542] hover:bg-[#D1A24E] text-[#1A1A1A] font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-poppins flex items-center justify-center">
      <div className="bg-[#2A2A2A] rounded-xl p-8 border border-[#333333] max-w-md mx-4 text-center">
        <div className="w-16 h-16 bg-[#F5C542] rounded-xl flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-8 h-8 text-[#1A1A1A] animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">
          Processing Authorization
        </h1>
        <p className="text-[#999999] leading-relaxed">
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
        <div className="min-h-screen bg-[#1A1A1A] text-white font-poppins flex items-center justify-center">
          <div className="bg-[#2A2A2A] rounded-xl p-8 border border-[#333333] max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-[#F5C542] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-[#1A1A1A] animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
            <p className="text-[#999999]">Please wait...</p>
          </div>
        </div>
      }
    >
      <WorldCoinCallbackContent />
    </Suspense>
  );
}
