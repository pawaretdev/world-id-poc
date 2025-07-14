# World ID Demo Application

A Next.js application demonstrating World ID integration with both OAuth authentication and zero-knowledge proof verification.

## Features

- **OAuth Authentication**: Sign in with World ID using the OAuth flow
- **Proof Verification**: Verify user identity using World ID's zero-knowledge proof system
- **User Information Display**: Show user details and verification status
- **Modern UI**: Clean, responsive interface with Tailwind CSS

## Prerequisites

- Node.js 18+
- World ID App ID (for proof verification)
- World ID Client ID and Secret (for OAuth)
- WalletConnect Project ID (optional, for wallet integration)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# World ID OAuth (for sign-in functionality)
NEXT_PUBLIC_WORLD_ID_CLIENT_ID=your_client_id_here
WORLD_ID_CLIENT_SECRET=your_client_secret_here

# World ID Proof Verification
NEXT_PUBLIC_WORLD_ID_APP_ID=app_staging_your_app_id_here

# WalletConnect (optional)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id_here
```

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   - Get your World ID credentials from the [World ID Developer Portal](https://developer.worldcoin.org/)
   - Add them to your `.env.local` file

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## How It Works

### OAuth Authentication Flow

1. User clicks "Sign in with World ID"
2. Redirected to World ID authorization page
3. User authenticates and authorizes the application
4. Redirected back to the callback page
5. Authorization code is exchanged for user information
6. User information is displayed

### Proof Verification Flow

1. User clicks "Verify with World ID" (requires prior sign-in)
2. World ID IDKit widget opens
3. User generates a zero-knowledge proof
4. Proof is sent to the verification API
5. Verification result is displayed

## API Endpoints

### POST `/api/verify-world-id`

Handles OAuth token verification for user authentication.

```json
{
  "code": "authorization_code",
  "redirectUri": "callback_url"
}
```

### POST `/api/verify-proof`

Handles zero-knowledge proof verification.

```json
{
  "merkle_root": "proof_merkle_root",
  "nullifier_hash": "proof_nullifier_hash",
  "proof": "proof_data",
  "credential_type": "orb",
  "action": "action_id",
  "signal": "user_signal"
}
```

## Components

- `SignInButton`: Handles OAuth authentication
- `ProofVerificationButton`: Handles zero-knowledge proof verification
- `UserInfo`: Displays user information and verification status

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **World ID IDKit**: Official World ID React components
- **Axios**: HTTP client for API calls

## Development

- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

## Deployment

The application is configured for deployment on Vercel with environment-specific redirect URIs:

- **Development**: `https://be.pawaret.uk/callback/world-id`
- **Production**: `https://world.pawaret.dev/callback/world-id`

## License

MIT License - see LICENSE file for details.
