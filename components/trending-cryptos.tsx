
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Star,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { CoinGeckoResponse } from '@/lib/types';
import { formatNumber } from '@/lib/crypto-api';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface TrendingCryptosProps {
  initialCryptos?: CoinGeckoResponse[];
  title?: string;
  limit?: number;
}

export function TrendingCryptos({ 
  initialCryptos = [], 
  title = "Trending Cryptocurrencies",
  limit = 10 
}: TrendingCryptosProps) {
  const [cryptos, setCryptos] = useState<CoinGeckoResponse[]>(initialCryptos.slice(0, limit));
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrendingCryptos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cryptocurrencies?limit=${limit}`);
      if (response.ok) {
        const data = await response.json();
        setCryptos(data.data?.slice(0, limit) || []);
      }
    } catch (error) {
      console.error('Error fetching trending cryptos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cryptos.length === 0) {
      fetchTrendingCryptos();
    }
  }, [cryptos.length, limit]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTrendingCryptos}
            disabled={isLoading}
          >
            <RefreshCw className={cn("w-3 h-3", isLoading && "animate-spin")} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {cryptos.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <div className="animate-pulse space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="divide-y">
            {cryptos.map((crypto, index) => (
              <div
                key={crypto.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-muted-foreground w-6 text-center">
                      {index + 1}
                    </span>
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <Image
                        src={crypto.image || '/placeholder-crypto.png'}
                        alt={crypto.name}
                        fill
                        className="rounded-full object-cover"

                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium truncate">{crypto.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {crypto.symbol.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Rank #{crypto.market_cap_rank || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-medium">
                    ${formatNumber(crypto.current_price)}
                  </div>
                  <div className={cn(
                    "flex items-center justify-end text-xs font-medium",
                    (crypto.price_change_percentage_24h || 0) >= 0 
                      ? "text-green-600" 
                      : "text-red-600"
                  )}>
                    {(crypto.price_change_percentage_24h || 0) >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(crypto.price_change_percentage_24h || 0).toFixed(2)}%
                  </div>
                </div>

                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/crypto/${crypto.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="w-3 h-3" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {cryptos.length > 0 && (
          <div className="p-4 border-t">
            <Link href="/markets">
              <Button variant="outline" className="w-full">
                View All Markets
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
