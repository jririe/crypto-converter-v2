# Cryptocurrency Converter Website

A comprehensive cryptocurrency converter and market analysis platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔄 Real-time cryptocurrency conversion
- 📊 Market data and analysis
- 📈 Interactive charts and graphs
- 🔍 Cryptocurrency search and comparison
- 📰 Latest crypto news
- 📚 Educational guides and glossary
- 💼 Exchange comparison
- 📧 Newsletter subscription
- 🎯 Affiliate partnerships

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Database:** Prisma ORM
- **Charts:** Chart.js, Recharts, Plotly.js
- **State Management:** Zustand, React Query
- **Authentication:** NextAuth.js

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd crypto_converter_website
```

2. Navigate to the app directory:
```bash
cd app
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables:
```bash
cp .env.example .env.local
```
Fill in your API keys and database connection string.

5. Generate Prisma client:
```bash
npx prisma generate
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect Next.js and deploy your app
4. Set up environment variables in Vercel dashboard

### Manual Deployment

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file in the app directory with the following variables:

```env
# Database
DATABASE_URL="your-database-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# API Keys (add your crypto API keys here)
CRYPTO_API_KEY="your-crypto-api-key"
```

## Project Structure

```
app/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── prisma/            # Database schema
└── scripts/           # Database seeding scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
