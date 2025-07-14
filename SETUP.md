# World ID Integration Setup Guide

## Overview

This Next.js application integrates with World ID for user authentication and verification. The implementation includes:

- Sign-in button that redirects to World ID authorization
- Callback page to handle the authorization response
- API endpoint to verify World ID tokens and get user information
- User information display component

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# World ID Configuration
# Get these values from https://developer.worldcoin.org/
NEXT_PUBLIC_WORLD_ID_CLIENT_ID=your_world_id_client_id_here
WORLD_ID_CLIENT_SECRET=your_world_id_client_secret_here
```

### 2. World ID Developer Portal Setup

1. Go to [https://developer.worldcoin.org/](https://developer.worldcoin.org/)
2. Create a new app or use an existing one
3. Configure the following redirect URIs:
   - `https://world.pawaret.dev/callback/world-id` (production)
   - `https://be.pawaret.uk/callback/world-id` (development)
4. Copy the Client ID and Client Secret to your `.env.local` file

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

#### Development

```bash
npm run dev
```

The application will automatically use `https://be.pawaret.uk` for development.

#### Production Build

```bash
npm run build
npm start
```

The application will automatically use `https://world.pawaret.dev` for production.

## Domain Configuration

The application automatically switches between domains based on the environment:

- **Development** (`NODE_ENV=development`): `https://be.pawaret.uk`
- **Production** (`NODE_ENV=production`): `https://world.pawaret.dev`

This is handled automatically by the `WorldIdService` class, so no manual configuration is needed.

## How It Works

### 1. Sign-In Flow

1. User clicks "Sign in with World ID" button
2. Frontend redirects to World ID authorization URL
3. User completes World ID verification
4. World ID redirects back to `/callback/world-id` with authorization code
5. Callback page stores the code in localStorage and redirects to home page
6. Home page detects the stored code and calls the backend API
7. Backend exchanges code for access token and gets user info
8. User information is displayed with Orb verification status

### 2. API Endpoints

#### POST /api/verify-world-id

- **Purpose**: Verify World ID authorization code and get user information
- **Request Body**:
  ```json
  {
    "code": "authorization_code_from_world_id",
    "redirectUri": "https://be.pawaret.uk/callback/world-id"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "sub": "user_id",
      "email": "user@example.com",
      "name": "User Name",
      "email_verified": true
    },
    "isOrbVerified": true
  }
  ```

### 3. Components

#### SignInButton

- Handles the initial sign-in process
- Redirects to World ID authorization

#### UserInfo

- Displays user information after successful verification
- Shows Orb verification status
- Provides sign-out functionality

#### WorldCoinCallback

- Processes the authorization callback from World ID
- Stores authorization code for backend processing

## Features

- ✅ World ID OAuth2 integration
- ✅ User information retrieval
- ✅ Orb verification status display
- ✅ Responsive UI with Tailwind CSS
- ✅ TypeScript support
- ✅ Error handling
- ✅ Loading states
- ✅ Production-ready build
- ✅ Automatic domain switching

## Console Logging

The backend API logs verification results to the console, including:

- User ID
- Email
- Name
- Orb verification status
- Verification timestamp

## Security Notes

- Client secret is only used on the server side
- Authorization codes are single-use and expire quickly
- Access tokens are not stored in localStorage (only used for API calls)
- All sensitive operations happen on the backend

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**: Ensure the redirect URI in your World ID app settings matches exactly:
   - Development: `https://be.pawaret.uk/callback/world-id`
   - Production: `https://world.pawaret.dev/callback/world-id`
2. **"Client ID not found"**: Check that your environment variables are set correctly
3. **"Authorization failed"**: Verify your World ID app is properly configured

### Development vs Production

- The application automatically switches domains based on `NODE_ENV`
- Ensure environment variables are set for both environments
- Test the full flow in both environments

## Next Steps

1. Set up your World ID app in the developer portal
2. Configure environment variables
3. Test the sign-in flow
4. Customize the UI to match your brand
5. Add additional user data storage if needed
6. Implement proper session management
