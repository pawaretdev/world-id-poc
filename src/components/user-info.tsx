"use client";

import { WorldIdUser } from "@/types/world-id";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface UserInfoProps {
  user: WorldIdUser;
  isOrbVerified: boolean;
  onSignOut: () => void;
}

export function UserInfo({ user, isOrbVerified, onSignOut }: UserInfoProps) {
  return (
    <div className="bg-[#2A2A2A] rounded-xl p-6 flex flex-col gap-6 border border-[#333333] animate-fade-in overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-10">
        <h2 className="text-xl font-semibold text-white">User Information</h2>
        <button
          onClick={onSignOut}
          className="text-[#EF4444] hover:text-[#F87171] text-sm font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - User Details */}
        <div className="flex-1 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white">
            {user.name || "Anonymous User"}
          </h3>
        </div>

        {/* Right Side - Stats */}
        <div className="flex-1 flex flex-col gap-4">
          {/* User ID */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#999999] uppercase tracking-wide">
              User ID
            </label>
            <p className="text-sm font-mono text-white bg-[#333333] px-3 py-2 rounded-lg break-all">
              {user.sub}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#999999] uppercase tracking-wide">
              Email
            </label>
            <p className="text-sm text-white bg-[#333333] px-3 py-2 rounded-lg">
              {user.email ?? "No Email"}
            </p>
          </div>

          {/* Orb Verification Status */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#999999] uppercase tracking-wide">
              Verification
            </label>
            <div className="flex items-center space-x-2">
              {isOrbVerified ? (
                <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-[#10B981] text-white">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Orb Verified
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-[#F59E0B] text-white">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Device Only
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
