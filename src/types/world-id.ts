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
