
import { Metadata } from 'next';
import { fetchCryptocurrencies, fetchGlobalMarketData } from '@/lib/crypto-api';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CryptoConverter } from '@/components/crypto-converter';
import { MarketOverview } from '@/components/market-overview';
import { TrendingCryptos } from '@/components/trending-cryptos';
import { CryptoNews } from '@/components/crypto-news';
import { EnhancedAdSpace } from '@/components/enhanced-ad-spaces';
import { RecommendedServices } from '@/components/recommended-services';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { FAQSection } from '@/components/seo/faq-section';
import { StructuredData } from '@/components/seo/structured-data';
import { FAQ_DATA } from '@/lib/seo-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  TrendingUp, 
  Newspaper, 
  Shield, 
  Zap, 
  Globe,
  Users,
  BarChart3,
  Bell,
  Star
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cryptocurrency Converter - Real-Time Bitcoin & Crypto Price Calculator',
  description: 'Free cryptocurrency converter with real-time prices for Bitcoin, Ethereum & 1000+ digital assets. Instant crypto calculator with live exchange rates, market data & news. Convert BTC to USD instantly.',
  keywords: [
    'cryptocurrency converter',
    'crypto price calculator', 
    'bitcoin converter',
    'ethereum price',
    'crypto exchange rates',
    'digital currency converter',
    'real time crypto prices',
    'bitcoin to usd converter',
    'ethereum to usd converter',
    'crypto calculator',
    'how to convert bitcoin to dollars',
    'best cryptocurrency price tracker',
    'real time crypto conversion calculator',
    'bitcoin calculator with fees',
    'crypto portfolio tracker free'
  ],
  openGraph: {
    title: 'CryptoConverter - Real-Time Cryptocurrency Price Calculator',
    description: 'Convert cryptocurrencies and fiat currencies with real-time prices. Track Bitcoin, Ethereum, and 1000+ digital assets.',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoConverter - Real-Time Cryptocurrency Price Calculator',
    description: 'Convert cryptocurrencies and fiat currencies with real-time prices. Track Bitcoin, Ethereum, and 1000+ digital assets.',
  },
  alternates: {
    canonical: '/',
  }
};

export default async function HomePage() {
  // Fetch initial data server-side for better performance and SEO
  const [initialCryptos, marketData] = await Promise.all([
    fetchCryptocurrencies(50).catch(() => []),
    fetchGlobalMarketData().catch(() => null)
  ]);

  const features = [
    {
      icon: Calculator,
      title: 'Real-Time Conversion',
      description: 'Convert between 1000+ cryptocurrencies and all major fiat currencies with live prices updated every 30 seconds.'
    },
    {
      icon: TrendingUp,
      title: 'Live Market Data',
      description: 'Track market caps, trading volumes, price changes, and comprehensive analytics for informed decisions.'
    },
    {
      icon: Newspaper,
      title: 'Latest News',
      description: 'Stay updated with breaking cryptocurrency news from trusted sources like CoinDesk, CoinTelegraph, and more.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with enterprise-grade security and powered by reputable data providers for maximum reliability.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with instant conversions, cached data, and seamless user experience across all devices.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Support for all major global currencies and cryptocurrencies with multi-language interface coming soon.'
    }
  ];

  const stats = [
    { label: 'Cryptocurrencies Tracked', value: '1000+', icon: BarChart3 },
    { label: 'Fiat Currencies Supported', value: '30+', icon: Globe },
    { label: 'Daily Conversions', value: '50K+', icon: Calculator },
    { label: 'Active Users', value: '10K+', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumbs */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <Breadcrumbs 
          items={[
            { name: 'Cryptocurrency Converter', href: '/', current: true }
          ]} 
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 mb-12">
            <div className="flex justify-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Star className="w-3 h-3 mr-1" />
                Trusted by 10,000+ crypto enthusiasts worldwide
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Free Cryptocurrency Converter
              <span className="block text-primary">Real-Time Bitcoin & Crypto Calculator</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Convert Bitcoin, Ethereum, and 1000+ cryptocurrencies instantly with live exchange rates. 
              The most accurate crypto price calculator with real-time market data, news, and professional trading tools.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Free & Instant Conversion', 
                '1000+ Cryptocurrencies', 
                'Real-Time Data', 
                'Market Analytics',
                'Live News Updates',
                'No Registration Required'
              ].map((feature) => (
                <Badge key={feature} variant="secondary" className="text-sm px-3 py-1">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Enhanced Ad Space - Header */}
          <div className="mb-8">
            <EnhancedAdSpace position="header" size="small" pageContext="homepage" />
          </div>

          {/* Main Converter */}
          <div className="mb-12">
            <CryptoConverter initialCryptos={initialCryptos} />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 bg-background/60 backdrop-blur">
                <CardContent className="p-0 space-y-2">
                  <stat.icon className="w-8 h-8 mx-auto text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3">
              <MarketOverview initialData={marketData} />
            </div>
            <div className="space-y-6">
              {/* Enhanced Ad Space - Sidebar */}
              <EnhancedAdSpace position="sidebar" size="medium" pageContext="homepage" />
              
              {/* Newsletter Signup */}
              <NewsletterSignup variant="card" source="homepage-sidebar" />
            </div>
          </div>
        </div>
      </section>

      {/* Trending & News Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TrendingCryptos initialCryptos={initialCryptos} limit={10} />
            <CryptoNews limit={6} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Cryptocurrency Converter?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most trusted Bitcoin and crypto calculator with advanced features for beginners and professional traders. 
              Free, fast, and accurate conversions with real-time data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-Rich Content Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                How to Convert Bitcoin to USD and Other Cryptocurrencies
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Converting cryptocurrencies has never been easier with our free crypto calculator. 
                  Whether you want to convert Bitcoin to USD, Ethereum to EUR, or any other digital asset, 
                  our real-time converter provides instant results with live market prices.
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Step-by-Step Conversion Process:
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Select your source cryptocurrency (e.g., Bitcoin, Ethereum)</li>
                  <li>Choose your target currency (USD, EUR, or another crypto)</li>
                  <li>Enter the amount you want to convert</li>
                  <li>Get instant results with current exchange rates</li>
                  <li>View historical price data and market trends</li>
                </ol>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Real-Time Cryptocurrency Price Data
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Our cryptocurrency converter uses live data from CoinGecko API, updated every 30 seconds 
                  to ensure you get the most accurate conversion rates. Track market movements, analyze price 
                  trends, and make informed decisions with comprehensive market data.
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Key Features Include:
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Live prices for 1000+ cryptocurrencies</li>
                  <li>Support for 30+ major fiat currencies</li>
                  <li>Historical price charts and analysis</li>
                  <li>Market cap and trading volume data</li>
                  <li>Price change indicators (24h, 7d, 30d)</li>
                  <li>Mobile-responsive design for all devices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions About Cryptocurrency Conversion
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about converting Bitcoin, Ethereum, and other cryptocurrencies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FAQSection 
              title="General Questions"
              faqs={FAQ_DATA.general}
            />
            <FAQSection 
              title="Converter Questions" 
              faqs={FAQ_DATA.converter}
            />
          </div>
          
          <div className="mt-8">
            <FAQSection 
              title="Technical Questions"
              faqs={FAQ_DATA.technical}
            />
          </div>
        </div>
      </section>

      {/* Recommended Services Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Best Cryptocurrency Exchanges & Trading Platforms 2024
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare top crypto exchanges, wallets, and trading platforms recommended by experts. 
              Find the best rates for Bitcoin, Ethereum, and altcoin trading.
            </p>
          </div>
          
          <RecommendedServices limit={6} variant="grid" />
          
          {/* Enhanced Ad Space - Content */}
          <div className="mt-12">
            <EnhancedAdSpace position="content" size="large" pageContext="homepage" />
          </div>
        </div>
      </section>

      {/* CTA Section with Newsletter */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Bell className="w-12 h-12 mx-auto lg:mx-0 opacity-80 mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Never Miss a Market Move
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Get real-time price alerts, market analysis, and breaking news delivered straight to your inbox.
              </p>
              <div className="space-y-4">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Set Price Alerts
                  <Bell className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm opacity-75">
                  Join 10,000+ crypto enthusiasts getting daily insights
                </p>
              </div>
            </div>
            
            <div className="bg-background/10 rounded-lg p-6 backdrop-blur">
              <NewsletterSignup 
                variant="inline" 
                source="homepage-cta"
                className="bg-transparent border-primary-foreground/20"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Enhanced Schema.org structured data for SEO */}
      <StructuredData type="faqPage" data={[...FAQ_DATA.general, ...FAQ_DATA.converter, ...FAQ_DATA.technical]} />
      
      {/* WebPage Schema with enhanced data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Free Cryptocurrency Converter - Real-Time Bitcoin & Crypto Calculator",
            "description": "Convert Bitcoin, Ethereum, and 1000+ cryptocurrencies instantly with live exchange rates. Free crypto calculator with real-time market data, news, and professional trading tools.",
            "url": "https://cryptoconverter.com",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "CryptoConverter",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250",
                "bestRating": "5"
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://cryptoconverter.com"
                },
                {
                  "@type": "ListItem", 
                  "position": 2,
                  "name": "Cryptocurrency Converter",
                  "item": "https://cryptoconverter.com"
                }
              ]
            },
            "keywords": [
              "cryptocurrency converter",
              "bitcoin to usd converter",
              "crypto price calculator",
              "ethereum converter",
              "real time crypto prices",
              "bitcoin calculator",
              "crypto exchange rates"
            ],
            "author": {
              "@type": "Organization",
              "name": "CryptoConverter"
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0]
          })
        }}
      />
    </div>
  );
}
