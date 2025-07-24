
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CryptoConverter - Real-Time Cryptocurrency Price Calculator & Converter',
    template: '%s | CryptoConverter'
  },
  description: 'Convert cryptocurrencies and fiat currencies with real-time prices. Track Bitcoin, Ethereum, and 1000+ digital assets with live market data, news, and analysis.',
  keywords: [
    'cryptocurrency converter',
    'crypto price calculator',
    'bitcoin converter',
    'ethereum price',
    'crypto exchange rates',
    'digital currency converter',
    'real time crypto prices',
    'cryptocurrency news',
    'crypto market data',
    'bitcoin to usd',
    'ethereum to usd'
  ],
  authors: [{ name: 'CryptoConverter Team' }],
  creator: 'CryptoConverter',
  publisher: 'CryptoConverter',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cryptoconverter.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cryptoconverter.com',
    title: 'CryptoConverter - Real-Time Cryptocurrency Price Calculator',
    description: 'Convert cryptocurrencies and fiat currencies with real-time prices. Track Bitcoin, Ethereum, and 1000+ digital assets.',
    siteName: 'CryptoConverter',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CryptoConverter - Cryptocurrency Price Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoConverter - Real-Time Cryptocurrency Price Calculator',
    description: 'Convert cryptocurrencies and fiat currencies with real-time prices. Track Bitcoin, Ethereum, and 1000+ digital assets.',
    images: ['/twitter-image.jpg'],
    creator: '@cryptoconverter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://api.coingecko.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "CryptoConverter",
              "description": "Real-time cryptocurrency price calculator and converter supporting 1000+ digital assets and all major fiat currencies.",
              "url": "https://cryptoconverter.com",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Real-time cryptocurrency prices",
                "Currency conversion calculator",
                "Market data and analytics",
                "Cryptocurrency news",
                "Price alerts and notifications",
                "Portfolio tracking"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
