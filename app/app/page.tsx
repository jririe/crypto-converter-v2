
import { Metadata } from 'next';
import { fetchCryptocurrencies, fetchGlobalMarketData } from '@/lib/crypto-api';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CryptoConverter } from '@/components/crypto-converter';
import { MarketOverview } from '@/components/market-overview';
import { TrendingCryptos } from '@/components/trending-cryptos';
import { CryptoNews } from '@/components/crypto-news';
import { AdSpace, GoogleAdSense } from '@/components/ad-spaces';
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
  title: 'CryptoConverter - Real-Time Cryptocurrency Price Calculator & Converter',
  description: 'Convert cryptocurrencies and fiat currencies with real-time prices. Track Bitcoin, Ethereum, and 1000+ digital assets with live market data, news, and analysis.',
  keywords: [
    'cryptocurrency converter',
    'crypto price calculator', 
    'bitcoin converter',
    'ethereum price',
    'crypto exchange rates',
    'digital currency converter',
    'real time crypto prices'
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

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 mb-12">
            <div className="flex justify-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Star className="w-3 h-3 mr-1" />
                Trusted by 10,000+ crypto enthusiasts
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Convert Crypto
              <span className="block text-primary">Instantly & Accurately</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The most comprehensive cryptocurrency converter with real-time prices, market data, and news. 
              Track Bitcoin, Ethereum, and 1000+ digital assets with professional-grade tools.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {['Real-time Prices', 'All Currencies', 'Latest News', 'Market Analytics'].map((feature) => (
                <Badge key={feature} variant="secondary" className="text-sm px-3 py-1">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Ad Space - Header */}
          <div className="mb-8">
            <AdSpace position="header" size="small" />
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
              {/* Ad Space - Sidebar */}
              <AdSpace position="sidebar" size="medium" />
              <GoogleAdSense slot="1234567890" />
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
              Why Choose CryptoConverter?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for beginners and professionals alike, with enterprise-grade features and consumer-friendly design.
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

      {/* Ad Space - Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <AdSpace position="content" size="large" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6">
            <Bell className="w-12 h-12 mx-auto opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Never Miss a Market Move
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
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
        </div>
      </section>

      <Footer />

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "CryptoConverter",
            "description": "Real-time cryptocurrency price calculator and converter",
            "url": "https://cryptoconverter.com",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250"
            }
          })
        }}
      />
    </div>
  );
}
