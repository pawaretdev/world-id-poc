# World ID Demo

A modern, minimal World ID authentication demo built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔐 **World ID Authentication** - Secure identity verification using World ID
- 🎨 **Minimal Dark UI** - Clean, modern interface with dark theme
- 📱 **Responsive Design** - Optimized for all device sizes
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🎯 **TypeScript** - Full type safety throughout the application
- 🌐 **Multi-Environment** - Automatic domain switching for dev/prod

## Design System

This project uses a minimal dark UI design inspired by modern web applications:

- **Colors**: Dark theme with `#1A1A1A` background and `#F5C542` accent
- **Typography**: Poppins font family for clean, readable text
- **Components**: Rounded corners, subtle shadows, and smooth animations
- **Layout**: Clean spacing and intuitive user flow

## Domain Configuration

The application automatically switches between domains based on the environment:

- **Development** (`NODE_ENV=development`): `https://be.pawaret.uk`
- **Production** (`NODE_ENV=production`): `https://world.pawaret.dev`

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [https://be.pawaret.uk](https://be.pawaret.uk) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── callback/          # OAuth callback pages
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout with Poppins font
│   └── page.tsx           # Main application page
├── components/            # Reusable UI components
│   ├── sign-in-button.tsx # World ID sign-in component
│   └── user-info.tsx      # User profile display
├── services/              # Business logic services
│   └── world-id-service.ts # World ID integration
└── types/                 # TypeScript type definitions
    └── world-id.ts        # World ID related types
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **World ID** - Decentralized identity verification
- **Poppins Font** - Modern, clean typography

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [World ID Documentation](https://docs.worldcoin.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
