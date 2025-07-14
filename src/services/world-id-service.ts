import {
  WorldIdTokenResponse,
  WorldIdUser,
  WorldIdVerificationResult,
} from "@/types/world-id";
import axios from "axios";

export class WorldIdService {
  private static readonly TOKEN_ENDPOINT = "https://id.worldcoin.org/token";
  private static readonly USERINFO_ENDPOINT =
    "https://id.worldcoin.org/userinfo";
  private static readonly CLIENT_ID =
    process.env.NEXT_PUBLIC_WORLD_ID_CLIENT_ID || "";
  private static readonly CLIENT_SECRET =
    process.env.WORLD_ID_CLIENT_SECRET || "";

  /**
   * Get the appropriate redirect URI based on environment
   */
  private static getRedirectUri(): string {
    const isDevelopment = process.env.NODE_ENV === "development";
    const baseUrl = isDevelopment
      ? "https://be.pawaret.uk"
      : "https://world.pawaret.dev";

    return `${baseUrl}/callback/world-id`;
  }

  /**
   * Get the base URL for the current environment
   */
  public static getBaseUrl(): string {
    const isDevelopment = process.env.NODE_ENV === "development";
    return isDevelopment
      ? "https://be.pawaret.uk"
      : "https://world.pawaret.dev";
  }

  /**
   * Exchange authorization code for access token
   */
  public static async exchangeCodeForToken(
    code: string,
    redirectUri: string
  ): Promise<WorldIdTokenResponse> {
    try {
      const response = await axios.post(
        this.TOKEN_ENDPOINT,
        {
          grant_type: "authorization_code",
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          code,
          redirect_uri: redirectUri,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      throw new Error("Failed to exchange authorization code for token");
    }
  }

  /**
   * Get user information using access token
   */
  public static async getUserInfo(accessToken: string): Promise<WorldIdUser> {
    try {
      const response = await axios.get(this.USERINFO_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error getting user info:", error);
      throw new Error("Failed to get user information");
    }
  }

  /**
   * Verify World ID token and get user info
   */
  public static async verifyWorldIdToken(
    code: string,
    redirectUri: string
  ): Promise<WorldIdVerificationResult> {
    try {
      // Exchange code for token
      const tokenResponse = await this.exchangeCodeForToken(code, redirectUri);

      // Get user info
      const userInfo = await this.getUserInfo(tokenResponse.access_token);

      // Check if user is verified with Orb based on verification_level
      const isOrbVerified =
        userInfo["https://id.worldcoin.org/v1"]?.verification_level === "orb";

      return {
        success: true,
        user: userInfo,
        isOrbVerified,
      };
    } catch (error) {
      console.error("Error verifying World ID token:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Get World ID authorization URL
   */
  public static getAuthorizationUrl(
    redirectUri?: string,
    state?: string
  ): string {
    const finalRedirectUri = redirectUri || this.getRedirectUri();

    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.CLIENT_ID,
      redirect_uri: finalRedirectUri,
      scope: "openid",
      ...(state && { state }),
    });

    return `https://id.worldcoin.org/authorize?${params.toString()}`;
  }
}
