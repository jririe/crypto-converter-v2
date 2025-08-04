
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3,
  RefreshCw,
  Eye
} from 'lucide-react';
import { MarketData } from '@/lib/types';
import { formatNumber } from '@/lib/crypto-api';
import { cn } from '@/lib/utils';

interface MarketOverviewProps {
  initialData?: MarketData | null;
}

export function MarketOverview({ initialData }: MarketOverviewProps) {
  const [marketData, setMarketData] = useState<MarketData | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/market-data');
      if (response.ok) {
        const data = await response.json();
        setMarketData(data.data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!marketData) {
      fetchMarketData();
    }
  }, [marketData]);

  useEffect(() => {
    const interval = setInterval(fetchMarketData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!marketData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Market Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const marketStats = [
    {
      title: 'Total Market Cap',
      value: `$${formatNumber(marketData.totalMarketCap)}`,
      change: marketData.marketCapChangePercentage24hUsd,
      icon: DollarSign,
      description: 'Combined value of all cryptocurrencies'
    },
    {
      title: 'Total Volume',
      value: `$${formatNumber(marketData.totalVolume)}`,
      icon: BarChart3,
      description: '24h trading volume across all markets'
    },
    {
      title: 'Active Cryptos',
      value: formatNumber(marketData.activeCryptocurrencies),
      icon: Eye,
      description: 'Number of active cryptocurrencies'
    },
    {
      title: 'Markets',
      value: formatNumber(marketData.markets),
      icon: TrendingUp,
      description: 'Total number of active markets'
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <CardTitle>Global Market Overview</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              Updated {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchMarketData}
              disabled={isLoading}
            >
              <RefreshCw className={cn("w-3 h-3", isLoading && "animate-spin")} />
              <span className="sr-only">Refresh market data</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketStats.map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
                {stat.change !== undefined && (
                  <div className={cn(
                    "flex items-center text-xs font-medium",
                    stat.change >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {stat.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(stat.change).toFixed(2)}%
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Dominance */}
        {Object.keys(marketData.marketCapPercentage).length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium mb-3">Market Dominance</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(marketData.marketCapPercentage)
                .slice(0, 6)
                .map(([symbol, percentage]) => (
                  <Badge
                    key={symbol}
                    variant="secondary"
                    className="text-xs"
                  >
                    {symbol.toUpperCase()}: {percentage.toFixed(1)}%
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
