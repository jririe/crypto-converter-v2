
import { Metadata } from 'next';
import { fetchCryptocurrencies, fetchGlobalMarketData } from '@/lib/crypto-api';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MarketOverview } from '@/components/market-overview';
import { MarketsTable } from '@/components/markets-table';
import { AdSpace } from '@/components/ad-spaces';

export const metadata: Metadata = {
  title: 'Cryptocurrency Markets - Live Prices & Market Data | CryptoConverter',
  description: 'Track live cryptocurrency prices, market caps, trading volumes, and 24h changes for 1000+ digital assets. Real-time market data updated every 30 seconds.',
  keywords: [
    'cryptocurrency market data',
    'crypto prices live',
    'bitcoin price',
    'ethereum price',
    'crypto market cap',
    'trading volume',
    'price charts'
  ],
  alternates: {
    canonical: '/markets',
  }
};

export default async function MarketsPage() {
  const [cryptos, marketData] = await Promise.all([
    fetchCryptocurrencies(100).catch(() => []),
    fetchGlobalMarketData().catch(() => null)
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Cryptocurrency Markets
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time prices, market data, and analytics for 1000+ cryptocurrencies. 
              Track market caps, trading volumes, and price movements.
            </p>
          </div>

          {/* Ad Space */}
          <AdSpace position="content" size="small" />

          {/* Market Overview */}
          <MarketOverview initialData={marketData} />

          {/* Markets Table */}
          <MarketsTable initialCryptos={cryptos} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
