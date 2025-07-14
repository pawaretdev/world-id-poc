# World ID Demo Application

A Next.js application demonstrating World ID integration with both OAuth authentication and zero-knowledge proof verification.

## Features

- **OAuth Authentication**: Sign in with World ID using the OAuth flow
- **Proof Verification**: Verify user identity using World ID's zero-knowledge proof system
- **User Information Display**: Show user details and verification status
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **Automatic Domain Switching**: Seamless development and production environment handling

## Prerequisites

- Node.js 18+
- World ID App ID (for proof verification)
- World ID Client ID and Secret (for OAuth)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# World ID OAuth (for sign-in functionality)
NEXT_PUBLIC_WORLD_ID_CLIENT_ID=your_client_id_here
WORLD_ID_CLIENT_SECRET=your_client_secret_here
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
4. Redirected back to the callback page (`/callback/world-id`)
5. Authorization code is stored in localStorage and user is redirected to home page
6. Home page detects the stored code and calls the backend API
7. Authorization code is exchanged for user information
8. User information is displayed with Orb verification status

### Proof Verification Flow

1. User clicks "Verify with World ID" (requires prior sign-in)
2. World ID IDKit widget opens
3. User generates a zero-knowledge proof
4. Proof is sent to the verification API
5. Verification result is displayed with detailed information

## API Endpoints

### POST `/api/verify-world-id`

Handles OAuth token verification for user authentication.

**Request Body:**

```json
{
  "code": "authorization_code",
  "redirectUri": "callback_url"
}
```

**Response:**

```json
{
  "success": true,
  "user": {
    "sub": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "email_verified": true,
    "https://id.worldcoin.org/v1": {
      "verification_level": "orb"
    }
  },
  "isOrbVerified": true
}
```

### POST `/api/verify-proof`

Handles zero-knowledge proof verification.

**Request Body:**

```json
{
  "merkle_root": "proof_merkle_root",
  "nullifier_hash": "proof_nullifier_hash",
  "proof": "proof_data",
  "verification_level": "orb",
  "action": "action_id"
}
```

**Response:**

```json
{
  "success": true,
  "uses": 1,
  "action": "landverse-rewards",
  "max_uses": 1,
  "nullifier_hash": "proof_nullifier_hash",
  "created_at": "2024-01-01T00:00:00Z",
  "verification_level": "orb",
  "message": "Successfully verified"
}
```

## Components

- `SignInButton`: Handles OAuth authentication flow
- `ProofVerificationButton`: Handles zero-knowledge proof verification using World ID IDKit
- `UserInfo`: Displays user information and verification status

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── verify-proof/          # Proof verification endpoint
│   │   └── verify-world-id/       # OAuth verification endpoint
│   ├── callback/
│   │   └── world-id/              # OAuth callback handler
│   └── page.tsx                   # Main application page
├── components/
│   ├── proof-verification-button.tsx
│   ├── sign-in-button.tsx
│   └── user-info.tsx
├── services/
│   └── world-id-service.ts        # World ID API integration
└── types/
    └── world-id.ts               # TypeScript type definitions
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **World ID IDKit**: Official World ID React components
- **Axios**: HTTP client for API calls
- **Lucide React**: Icon library

## Development

- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

## Domain Configuration

The application automatically switches between domains based on the environment:

- **Development** (`NODE_ENV=development`): `https://be.pawaret.uk`
- **Production** (`NODE_ENV=production`): `https://world.pawaret.dev`

This is handled automatically by the `WorldIdService` class.

## Security Features

- Client secret is only used on the server side
- Authorization codes are single-use and expire quickly
- Access tokens are not stored in localStorage (only used for API calls)
- All sensitive operations happen on the backend
- Proof verification includes nullifier hash tracking to prevent reuse

## License

MIT License - see LICENSE file for details.
