"use client";

import { WorldIdUser } from "@/types/world-id";
import Image from "next/image";

interface UserInfoProps {
  user: WorldIdUser;
  isOrbVerified: boolean;
  onSignOut: () => void;
}

export function UserInfo({ user, isOrbVerified, onSignOut }: UserInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          User Information
        </h2>
        <button
          onClick={onSignOut}
          className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          Sign Out
        </button>
      </div>

      <div className="space-y-3">
        {user.picture && (
          <div className="flex justify-center mb-4">
            <Image
              src={user.picture}
              alt="Profile"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full"
            />
          </div>
        )}

        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            User ID
          </label>
          <p className="text-sm text-gray-900 dark:text-white font-mono">
            {user.sub}
          </p>
        </div>

        {user.name && (
          <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Name
            </label>
            <p className="text-sm text-gray-900 dark:text-white">{user.name}</p>
          </div>
        )}

        {user.email && (
          <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Email
            </label>
            <p className="text-sm text-gray-900 dark:text-white">
              {user.email}
            </p>
            {user.email_verified && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 ml-2">
                Verified
              </span>
            )}
          </div>
        )}

        <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Orb Verification
          </label>
          <div className="flex items-center mt-1">
            {isOrbVerified ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified with Orb
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Not Orb Verified
              </span>
            )}
          </div>
        </div>

        {user.updated_at && (
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Last Updated
            </label>
            <p className="text-sm text-gray-900 dark:text-white">
              {new Date(user.updated_at).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
