
'use client';

import { useState, useEffect } from 'react';
import { useIsClient } from '@/hooks/use-is-client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  StarOff,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { CoinGeckoResponse } from '@/lib/types';
import { formatNumber } from '@/lib/crypto-api';
import { cn } from '@/lib/utils';

interface MarketsTableProps {
  initialCryptos?: CoinGeckoResponse[];
}

export function MarketsTable({ initialCryptos = [] }: MarketsTableProps) {
  const isClient = useIsClient();
  const [cryptos, setCryptos] = useState<CoinGeckoResponse[]>(initialCryptos);
  const [filteredCryptos, setFilteredCryptos] = useState<CoinGeckoResponse[]>(initialCryptos);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Load favorites from localStorage
  useEffect(() => {
    if (isClient) {
      const savedFavorites = localStorage.getItem('crypto-favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, [isClient]);

  // Filter cryptocurrencies based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCryptos(cryptos);
    } else {
      const filtered = cryptos.filter(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCryptos(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, cryptos]);

  const fetchCryptos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cryptocurrencies?limit=100');
      if (response.ok) {
        const data = await response.json();
        setCryptos(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (cryptoId: string) => {
    if (!isClient) return;
    
    setFavorites(prev => {
      const newFavorites = prev.includes(cryptoId)
        ? prev.filter(id => id !== cryptoId)
        : [...prev, cryptoId];
      localStorage.setItem('crypto-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Pagination
  const totalPages = Math.ceil(filteredCryptos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCryptos = filteredCryptos.slice(startIndex, endIndex);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl">Market Data</CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search cryptocurrencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={fetchCryptos}
              disabled={isLoading}
            >
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
              <span className="ml-2 hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {currentCryptos.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {searchQuery ? (
              <div>
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No cryptocurrencies found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-16 bg-muted rounded"></div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">24h %</TableHead>
                    <TableHead className="text-right">Market Cap</TableHead>
                    <TableHead className="text-right">Volume (24h)</TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentCryptos.map((crypto) => (
                    <TableRow 
                      key={crypto.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleFavorite(crypto.id)}
                        >
                          {favorites.includes(crypto.id) ? (
                            <Star className="w-4 h-4 fill-current text-yellow-500" />
                          ) : (
                            <StarOff className="w-4 h-4" />
                          )}
                        </Button>
                      </TableCell>
                      
                      <TableCell className="font-medium text-muted-foreground">
                        {crypto.market_cap_rank || 'N/A'}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative w-8 h-8 flex-shrink-0">
                            <Image
                              src={crypto.image || '/placeholder-crypto.png'}
                              alt={crypto.name}
                              fill
                              className="rounded-full object-cover"

                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium">{crypto.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {crypto.symbol.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-right font-medium crypto-value">
                        ${formatNumber(crypto.current_price)}
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <div className={cn(
                          "flex items-center justify-end font-medium",
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
                      </TableCell>
                      
                      <TableCell className="text-right crypto-value">
                        ${formatNumber(crypto.market_cap)}
                      </TableCell>
                      
                      <TableCell className="text-right crypto-value">
                        ${formatNumber(crypto.total_volume)}
                      </TableCell>
                      
                      <TableCell>
                        <Link href={`/crypto/${crypto.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ExternalLink className="w-3 h-3" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredCryptos.length)} of {filteredCryptos.length} results
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8"
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    {totalPages > 5 && (
                      <>
                        <span className="text-muted-foreground">...</span>
                        <Button
                          variant={currentPage === totalPages ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-8"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
