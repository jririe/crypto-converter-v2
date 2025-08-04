
import { Metadata } from 'next';
import { fetchCryptocurrencies, fetchGlobalMarketData } from '@/lib/crypto-api';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MarketOverview } from '@/components/market-overview';
import { MarketsTable } from '@/components/markets-table';
import { AdSpace } from '@/components/ad-spaces';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { FAQSection } from '@/components/seo/faq-section';

export const metadata: Metadata = {
  title: 'Live Cryptocurrency Prices & Market Data - Bitcoin, Ethereum & 1000+ Cryptos',
  description: 'Track real-time cryptocurrency prices, market caps, trading volumes & 24h changes for Bitcoin, Ethereum & 1000+ digital assets. Live crypto market data updated every 30 seconds with price charts.',
  keywords: [
    'cryptocurrency market data',
    'crypto prices live',
    'bitcoin price',
    'ethereum price',
    'crypto market cap',
    'trading volume',
    'price charts',
    'live cryptocurrency prices',
    'bitcoin market cap',
    'ethereum trading volume',
    'crypto price tracker',
    'real time crypto market data',
    'cryptocurrency price analysis',
    'bitcoin price today',
    'ethereum price live',
    'crypto market trends',
    'digital currency prices'
  ],
  openGraph: {
    title: 'Live Cryptocurrency Prices & Market Data - CryptoConverter',
    description: 'Track real-time cryptocurrency prices, market caps, trading volumes for Bitcoin, Ethereum & 1000+ digital assets.',
    type: 'website',
    url: '/markets',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Cryptocurrency Prices & Market Data - CryptoConverter',
    description: 'Track real-time cryptocurrency prices, market caps, trading volumes for Bitcoin, Ethereum & 1000+ digital assets.',
  },
  alternates: {
    canonical: '/markets',
  }
};

export default async function MarketsPage() {
  const [cryptos, marketData] = await Promise.all([
    fetchCryptocurrencies(100).catch(() => []),
    fetchGlobalMarketData().catch(() => null)
  ]);

  const marketsFAQ = [
    {
      question: "How often are cryptocurrency prices updated?",
      answer: "Our cryptocurrency prices are updated every 30 seconds using real-time data from CoinGecko API to ensure you have the most accurate market information."
    },
    {
      question: "What does market cap mean in cryptocurrency?",
      answer: "Market capitalization is the total value of a cryptocurrency, calculated by multiplying the current price by the total circulating supply. It helps determine the relative size of different cryptocurrencies."
    },
    {
      question: "How is trading volume calculated?",
      answer: "Trading volume represents the total amount of a cryptocurrency traded over a 24-hour period across all exchanges. Higher volume typically indicates greater liquidity and market activity."
    },
    {
      question: "What do the price change percentages mean?",
      answer: "Price change percentages show how much a cryptocurrency's price has increased or decreased over specific time periods (24 hours, 7 days, 30 days) compared to the previous period."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumbs */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <Breadcrumbs 
          items={[
            { name: 'Cryptocurrency Markets', href: '/markets', current: true }
          ]} 
        />
      </div>

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Live Cryptocurrency Prices & Market Data
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Track real-time prices, market caps, and trading volumes for Bitcoin, Ethereum, and 1000+ cryptocurrencies. 
              Get comprehensive market analysis with live charts, price alerts, and detailed analytics updated every 30 seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {[
                'Real-Time Data',
                '1000+ Cryptocurrencies', 
                'Live Price Charts',
                'Market Cap Rankings',
                'Trading Volume Analysis',
                'Price Change Indicators'
              ].map((feature) => (
                <div key={feature} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Ad Space */}
          <AdSpace position="content" size="small" />

          {/* Market Overview */}
          <MarketOverview initialData={marketData} />

          {/* Markets Table */}
          <MarketsTable initialCryptos={cryptos} />

          {/* SEO Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Understanding Cryptocurrency Market Data
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Our cryptocurrency markets page provides comprehensive real-time data for over 1000 digital assets. 
                  Monitor Bitcoin price movements, Ethereum market trends, and discover emerging altcoins with our 
                  advanced market analysis tools.
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Key Market Metrics:
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Real-time cryptocurrency prices updated every 30 seconds</li>
                  <li>Market capitalization rankings and analysis</li>
                  <li>24-hour trading volume and liquidity data</li>
                  <li>Price change percentages (24h, 7d, 30d)</li>
                  <li>Historical price charts and technical indicators</li>
                  <li>Market dominance and trend analysis</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                How to Use Market Data for Trading
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Whether you're a beginner or professional trader, understanding market data is crucial for making 
                  informed investment decisions. Our platform provides all the tools you need to analyze cryptocurrency 
                  trends and identify opportunities.
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Trading Insights:
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Compare market caps to assess cryptocurrency size</li>
                  <li>Monitor trading volume for liquidity assessment</li>
                  <li>Track price changes to identify trends</li>
                  <li>Use historical data for technical analysis</li>
                  <li>Set price alerts for investment opportunities</li>
                  <li>Diversify portfolio based on market data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection 
            title="Cryptocurrency Markets FAQ"
            faqs={marketsFAQ}
          />
        </div>
      </main>

      <Footer />

      {/* Structured Data for Markets Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Live Cryptocurrency Prices & Market Data",
            "description": "Track real-time cryptocurrency prices, market caps, trading volumes for Bitcoin, Ethereum & 1000+ digital assets.",
            "url": "https://cryptoconverter.com/markets",
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
                  "name": "Cryptocurrency Markets",
                  "item": "https://cryptoconverter.com/markets"
                }
              ]
            },
            "mainEntity": {
              "@type": "Dataset",
              "name": "Cryptocurrency Market Data",
              "description": "Real-time prices, market caps, and trading volumes for 1000+ cryptocurrencies",
              "keywords": [
                "cryptocurrency prices",
                "bitcoin price",
                "ethereum price",
                "market cap",
                "trading volume"
              ],
              "temporalCoverage": "Real-time",
              "spatialCoverage": "Global"
            }
          })
        }}
      />
    </div>
  );
}
