
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Newspaper, 
  ExternalLink, 
  Clock,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsArticle {
  id: string;
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
  category?: string;
}

interface CryptoNewsProps {
  limit?: number;
  showImages?: boolean;
}

export function CryptoNews({ limit = 6, showImages = true }: CryptoNewsProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock news data for demonstration - in production, this would come from RSS feeds or news APIs
  const mockNews: NewsArticle[] = [
    {
      id: '1',
      title: 'Bitcoin Reaches New All-Time High as Institutional Adoption Accelerates',
      description: 'Major corporations continue to add Bitcoin to their treasury reserves, driving unprecedented institutional demand.',
      url: '#',
      imageUrl: 'https://thumbs.dreamstime.com/b/bitcoin-chart-isolated-black-background-cryptocurrency-concept-showing-upward-trend-btc-logo-103572761.jpg',
      source: 'CoinDesk',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      category: 'bitcoin'
    },
    {
      id: '2',
      title: 'Ethereum 2.0 Staking Rewards Attract $50 Billion in Total Value Locked',
      description: 'The Ethereum proof-of-stake network continues to see massive growth in validator participation.',
      url: '#',
      imageUrl: 'https://uploads-ssl.webflow.com/6048790ad5157f01d7437c77/6404c6f44011217aae8f86a9_What%20is%20%E2%80%A8Ethereum%20Staking_.jpg',
      source: 'CoinTelegraph',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      category: 'ethereum'
    },
    {
      id: '3',
      title: 'DeFi Protocol Uniswap Launches on Polygon Network for Lower Fees',
      description: 'Users can now access Uniswap with significantly reduced transaction costs on the Polygon sidechain.',
      url: '#',
      imageUrl: 'https://sdlccorp-web-prod.blr1.digitaloceanspaces.com/wp-content/uploads/2024/08/24152859/1.-How-to-Use-Decentralized-Finance-DeFi-Protocols-in-Gaming-2.webp',
      source: 'CryptoSlate',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      category: 'defi'
    },
    {
      id: '4',
      title: 'Central Bank Digital Currencies Gain Momentum as 50+ Countries Explore CBDCs',
      description: 'Government-backed digital currencies are moving from research phase to pilot programs worldwide.',
      url: '#',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/026/512/354/non_2x/cbdc-central-bank-digital-currency-concept-photo.jpg',
      source: 'The Block',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      category: 'regulation'
    },
    {
      id: '5',
      title: 'NFT Market Shows Signs of Recovery with Blue-Chip Collections Leading',
      description: 'Premium NFT collections see renewed interest as the market stabilizes after the 2022 correction.',
      url: '#',
      imageUrl: 'https://thumbs.dreamstime.com/b/nft-non-fungible-token-creation-digital-crypto-art-sale-marketplace-selling-games-characters-blockchain-assets-artwork-258036908.jpg',
      source: 'Decrypt',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      category: 'nft'
    },
    {
      id: '6',
      title: 'Solana Network Processes Record Transaction Volume Despite Earlier Outages',
      description: 'The high-performance blockchain demonstrates resilience with improved network stability and throughput.',
      url: '#',
      imageUrl: 'https://i.ytimg.com/vi/CNhF4Se5AFU/maxresdefault.jpg',
      source: 'CryptoNews',
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
      category: 'altcoins'
    }
  ];

  useEffect(() => {
    // In production, this would fetch from your news API
    setArticles(mockNews.slice(0, limit));
  }, [limit]);

  const refreshNews = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setArticles([...mockNews.slice(0, limit)]);
    setIsLoading(false);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours === 0) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      bitcoin: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      ethereum: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      defi: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      nft: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      regulation: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      altcoins: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    };
    return colors[category || ''] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Latest Crypto News</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshNews}
            disabled={isLoading}
          >
            <RefreshCw className={cn("w-3 h-3", isLoading && "animate-spin")} />
            <span className="sr-only">Refresh news</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {articles.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <div className="animate-pulse space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="divide-y">
            {articles.map((article) => (
              <article
                key={article.id}
                className="p-4 hover:bg-muted/50 transition-colors group"
              >
                <div className={cn(
                  "flex gap-4",
                  showImages ? "flex-col sm:flex-row" : "flex-col"
                )}>
                  {showImages && article.imageUrl && (
                    <div className="relative w-full sm:w-32 h-24 sm:h-20 flex-shrink-0">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="rounded object-cover"

                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    
                    {article.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {article.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          {article.source}
                        </span>
                        {article.category && (
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs px-2 py-0.5", getCategoryColor(article.category))}
                          >
                            {article.category}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimeAgo(article.publishedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {articles.length > 0 && (
          <div className="p-4 border-t">
            <Link href="/news">
              <Button variant="outline" className="w-full">
                View All News
                <TrendingUp className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
