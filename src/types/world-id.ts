export interface WorldIdUser {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  nickname?: string;
  updated_at?: string;
  "https://id.worldcoin.org/v1"?: {
    verification_level: "orb" | "device";
  };
  // deprecated, will be removed in the future
  "https://id.worldcoin.org/beta"?: {
    likely_human: string;
    credential_type: string;
  };
}

export interface WorldIdTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface WorldIdVerificationResult {
  success: boolean;
  user?: WorldIdUser;
  isOrbVerified?: boolean;
  error?: string;
}

export interface WorldIdAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
}

// Proof verification types
export interface ProofVerificationRequest {
  merkle_root: string;
  nullifier_hash: string;
  proof: string;
  verification_level: string;
  action: string;
}

export interface ProofVerificationResponse {
  uses: number;
  success: boolean;
  action: string;
  max_uses: number;
  nullifier_hash: string;
  created_at: string;
  verification_level: string;
  message: string;
}

export interface ProofVerificationResult {
  success: boolean;
  error?: string;
  detail?: string; // World ID API error detail field
  uses?: number;
  action?: string;
  max_uses?: number;
  nullifier_hash?: string;
  created_at?: string;
  verification_level?: string;
  message?: string;
}
