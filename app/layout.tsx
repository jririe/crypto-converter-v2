
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
  description: 'Convert cryptocurrencies and fiat currencies with real-time prices. Track Bitcoin, Ethereum, and 1000+ digital assets with live market data, news, and analysis. Free crypto calculator with instant results.',
  keywords: [
    // Primary high-traffic keywords
    'cryptocurrency converter',
    'crypto price calculator', 
    'bitcoin converter',
    'ethereum price',
    'crypto exchange rates',
    'digital currency converter',
    'bitcoin to usd converter',
    'ethereum to usd converter',
    'crypto calculator',
    'cryptocurrency price calculator',
    // Long-tail keywords
    'real time crypto prices',
    'cryptocurrency news',
    'crypto market data',
    'bitcoin to usd',
    'ethereum to usd',
    'how to convert bitcoin to dollars',
    'best cryptocurrency price tracker',
    'real time crypto conversion calculator', 
    'cryptocurrency market analysis tools',
    'bitcoin price prediction today',
    'crypto portfolio tracker free',
    'live cryptocurrency exchange rates',
    // Location-based keywords
    'cryptocurrency converter usa',
    'crypto prices united states',
    'bitcoin calculator with fees',
    'crypto tax calculator 2024'
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
        
        {/* Enhanced Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "CryptoConverter",
              "description": "Real-time cryptocurrency price calculator and converter supporting 1000+ digital assets and all major fiat currencies. Free crypto calculator with instant results.",
              "url": "https://cryptoconverter.com",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "browserRequirements": "Requires JavaScript",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "featureList": [
                "Real-time cryptocurrency prices updated every 30 seconds",
                "Currency conversion calculator for 1000+ cryptocurrencies",
                "Market data and analytics with live charts",
                "Breaking cryptocurrency news from trusted sources",
                "Price alerts and notifications",
                "Portfolio tracking and analysis",
                "Exchange rate comparisons",
                "Multi-currency support (30+ fiat currencies)"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Organization",
                "name": "CryptoConverter",
                "url": "https://cryptoconverter.com"
              },
              "datePublished": "2024-01-01",
              "dateModified": new Date().toISOString().split('T')[0],
              "inLanguage": "en-US",
              "isAccessibleForFree": true,
              "accessibilityAPI": "ARIA",
              "accessMode": ["textual", "visual"],
              "accessModeSufficient": ["textual", "visual"]
            })
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CryptoConverter",
              "url": "https://cryptoconverter.com",
              "logo": "https://play-lh.googleusercontent.com/NYLioat6oB619Zfw6lVVrxw-5k_uoaqcrC4Z6iDygYYRvECIiiOEd6h-oweBLgejPe0",
              "description": "The world's most comprehensive cryptocurrency converter and price tracking platform with real-time data for 1000+ digital assets.",
              "foundingDate": "2024",
              "sameAs": [
                "https://twitter.com/cryptoconverter"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English",
                "url": "https://cryptoconverter.com/contact"
              },
              "areaServed": "Worldwide",
              "knowsAbout": [
                "Cryptocurrency",
                "Bitcoin",
                "Ethereum", 
                "Digital Currency Conversion",
                "Blockchain Technology",
                "Cryptocurrency Trading",
                "Financial Technology"
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
