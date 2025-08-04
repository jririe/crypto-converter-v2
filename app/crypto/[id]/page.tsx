
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCryptocurrencyById } from '@/lib/crypto-api';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  DollarSign,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { formatNumber } from '@/lib/crypto-api';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface CryptoDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: CryptoDetailPageProps): Promise<Metadata> {
  const crypto = await fetchCryptocurrencyById(params.id);
  
  if (!crypto) {
    return {
      title: 'Cryptocurrency Not Found | CryptoConverter',
    };
  }

  return {
    title: `${crypto.name} (${crypto.symbol.toUpperCase()}) Price, Chart & Market Data | CryptoConverter`,
    description: `Get real-time ${crypto.name} price, market cap, trading volume, and comprehensive market data. Track ${crypto.symbol.toUpperCase()} price movements and trends.`,
    keywords: [
      `${crypto.name} price`,
      `${crypto.symbol} price`,
      `${crypto.name} market cap`,
      `${crypto.name} trading volume`,
      'cryptocurrency data'
    ],
  };
}

export default async function CryptoDetailPage({ params }: CryptoDetailPageProps) {
  const crypto = await fetchCryptocurrencyById(params.id);

  if (!crypto) {
    notFound();
  }

  const priceChange = crypto.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <Image
                  src={crypto.image || '/placeholder-crypto.png'}
                  alt={crypto.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{crypto.name}</h1>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{crypto.symbol.toUpperCase()}</Badge>
                  <span className="text-muted-foreground">#{crypto.market_cap_rank || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold">${formatNumber(crypto.current_price)}</div>
              <div className={cn(
                "flex items-center justify-end text-lg font-medium",
                isPositive ? "text-green-600" : "text-red-600"
              )}>
                {isPositive ? (
                  <TrendingUp className="w-5 h-5 mr-1" />
                ) : (
                  <TrendingDown className="w-5 h-5 mr-1" />
                )}
                {Math.abs(priceChange).toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Market Cap
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">
                  ${formatNumber(crypto.market_cap)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  24h Volume
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">
                  ${formatNumber(crypto.total_volume)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  24h High
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">
                  ${formatNumber(crypto.high_24h)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  24h Low
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">
                  ${formatNumber(crypto.low_24h)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Supply Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Circulating Supply</span>
                  <span className="font-medium">
                    {crypto.circulating_supply ? formatNumber(crypto.circulating_supply) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="font-medium">
                    {crypto.total_supply ? formatNumber(crypto.total_supply) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Supply</span>
                  <span className="font-medium">
                    {crypto.max_supply ? formatNumber(crypto.max_supply) : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All-Time Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">All-Time High</span>
                  <div className="text-right">
                    <div className="font-medium">${formatNumber(crypto.ath)}</div>
                    <div className="text-sm text-red-600">
                      {crypto.ath_change_percentage?.toFixed(2)}%
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">All-Time Low</span>
                  <div className="text-right">
                    <div className="font-medium">${formatNumber(crypto.atl)}</div>
                    <div className="text-sm text-green-600">
                      +{crypto.atl_change_percentage?.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <Link href="/markets">
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                View All Markets
              </Button>
            </Link>
            <Link href="/">
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                Convert {crypto.symbol.toUpperCase()}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
