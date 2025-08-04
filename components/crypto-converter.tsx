
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useIsClient } from '@/hooks/use-is-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  Calculator,
  RefreshCw,
  Star,
  StarOff
} from 'lucide-react';
import { POPULAR_CRYPTOCURRENCIES, MAJOR_FIAT_CURRENCIES } from '@/lib/constants';
import { convertCurrency, formatCurrency, formatNumber } from '@/lib/crypto-api';
import { CoinGeckoResponse } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CryptoConverterProps {
  initialCryptos?: CoinGeckoResponse[];
}

export function CryptoConverter({ initialCryptos = [] }: CryptoConverterProps) {
  const isClient = useIsClient();
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('0');
  const [fromCurrency, setFromCurrency] = useState('bitcoin');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromType, setFromType] = useState<'crypto' | 'fiat'>('crypto');
  const [toType, setToType] = useState<'crypto' | 'fiat'>('fiat');
  const [cryptos, setCryptos] = useState<CoinGeckoResponse[]>(initialCryptos);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    if (isClient) {
      const savedFavorites = localStorage.getItem('crypto-favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, [isClient]);

  // Save favorites to localStorage
  const toggleFavorite = useCallback((currencyId: string) => {
    if (!isClient) return;
    
    setFavorites(prev => {
      const newFavorites = prev.includes(currencyId)
        ? prev.filter(id => id !== currencyId)
        : [...prev, currencyId];
      localStorage.setItem('crypto-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, [isClient]);

  // Fetch latest data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [cryptoResponse, ratesResponse] = await Promise.all([
        fetch('/api/cryptocurrencies?limit=100'),
        fetch('/api/exchange-rates')
      ]);

      if (cryptoResponse.ok) {
        const cryptoData = await cryptoResponse.json();
        setCryptos(cryptoData.data || []);
      }

      if (ratesResponse.ok) {
        const ratesData = await ratesResponse.json();
        setExchangeRates(ratesData.data || {});
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    if (cryptos.length === 0) {
      fetchData();
    }
  }, [cryptos.length, fetchData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Convert currencies
  useEffect(() => {
    const amount = parseFloat(fromAmount) || 0;
    if (amount === 0) {
      setToAmount('0');
      return;
    }

    let result = 0;

    if (fromType === 'crypto' && toType === 'fiat') {
      const crypto = cryptos.find(c => c.id === fromCurrency);
      const rate = exchangeRates[toCurrency] || 1;
      if (crypto?.current_price) {
        result = convertCurrency(amount, 1 / crypto.current_price, 1 / rate);
      }
    } else if (fromType === 'fiat' && toType === 'crypto') {
      const crypto = cryptos.find(c => c.id === toCurrency);
      const rate = exchangeRates[fromCurrency] || 1;
      if (crypto?.current_price) {
        result = convertCurrency(amount, rate, crypto.current_price);
      }
    } else if (fromType === 'crypto' && toType === 'crypto') {
      const fromCrypto = cryptos.find(c => c.id === fromCurrency);
      const toCrypto = cryptos.find(c => c.id === toCurrency);
      if (fromCrypto?.current_price && toCrypto?.current_price) {
        result = convertCurrency(amount, fromCrypto.current_price, toCrypto.current_price);
      }
    } else if (fromType === 'fiat' && toType === 'fiat') {
      const fromRate = exchangeRates[fromCurrency] || 1;
      const toRate = exchangeRates[toCurrency] || 1;
      result = convertCurrency(amount, fromRate, toRate);
    }

    setToAmount(result.toString());
  }, [fromAmount, fromCurrency, toCurrency, fromType, toType, cryptos, exchangeRates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromType(toType);
    setToType(fromType);
    setFromAmount(toAmount);
  };

  const getDisplayPrice = (currency: string, type: 'crypto' | 'fiat') => {
    if (type === 'crypto') {
      const crypto = cryptos.find(c => c.id === currency);
      return crypto ? `$${formatNumber(crypto.current_price)}` : '';
    } else {
      const rate = exchangeRates[currency];
      return rate ? `1 USD = ${formatNumber(rate)} ${currency}` : '';
    }
  };

  const getPriceChange = (currency: string, type: 'crypto' | 'fiat') => {
    if (type === 'crypto') {
      const crypto = cryptos.find(c => c.id === currency);
      return crypto?.price_change_percentage_24h || 0;
    }
    return 0;
  };

  const renderCurrencyOption = (currency: any, type: 'crypto' | 'fiat') => {
    const isSelected = type === 'crypto' ? 
      currency.id === fromCurrency || currency.id === toCurrency :
      currency.code === fromCurrency || currency.code === toCurrency;

    return (
      <SelectItem 
        key={type === 'crypto' ? currency.id : currency.code}
        value={type === 'crypto' ? currency.id : currency.code}
        className="flex items-center justify-between p-3"
      >
        <div className="flex items-center space-x-3">
          {type === 'crypto' ? (
            <div className="relative w-6 h-6">
              <Image 
                src={currency.image || '/placeholder-crypto.png'} 
                alt={currency.name}
                fill
                className="rounded-full object-cover"

              />
            </div>
          ) : (
            <span className="text-lg">{currency.flag}</span>
          )}
          <div>
            <div className="font-medium">{type === 'crypto' ? currency.symbol.toUpperCase() : currency.code}</div>
            <div className="text-xs text-muted-foreground truncate">{currency.name}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">
            {getDisplayPrice(type === 'crypto' ? currency.id : currency.code, type)}
          </div>
          {type === 'crypto' && (
            <div className={cn(
              "text-xs font-medium",
              getPriceChange(currency.id, 'crypto') >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {getPriceChange(currency.id, 'crypto') >= 0 ? (
                <TrendingUp className="w-3 h-3 inline mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 inline mr-1" />
              )}
              {Math.abs(getPriceChange(currency.id, 'crypto')).toFixed(2)}%
            </div>
          )}
        </div>
      </SelectItem>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">Cryptocurrency Converter</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              Updated {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              disabled={isLoading}
              className="flex items-center space-x-1"
            >
              <RefreshCw className={cn("w-3 h-3", isLoading && "animate-spin")} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Conversion Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* From Currency */}
          <div className="space-y-4">
            <Label htmlFor="from-amount" className="text-sm font-medium">From</Label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Button
                  variant={fromType === 'crypto' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFromType('crypto')}
                  className="flex-1"
                >
                  Crypto
                </Button>
                <Button
                  variant={fromType === 'fiat' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFromType('fiat')}
                  className="flex-1"
                >
                  Fiat
                </Button>
              </div>
              
              <Input
                id="from-amount"
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="Enter amount"
                className="text-lg font-medium"
              />

              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {fromType === 'crypto' ? (
                    <>
                      {favorites.length > 0 && (
                        <>
                          <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                            Favorites
                          </div>
                          {cryptos
                            .filter(crypto => favorites.includes(crypto.id))
                            .map(crypto => renderCurrencyOption(crypto, 'crypto'))}
                          <Separator className="my-2" />
                        </>
                      )}
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                        Popular
                      </div>
                      {POPULAR_CRYPTOCURRENCIES.map(crypto => {
                        const fullCrypto = cryptos.find(c => c.id === crypto.id);
                        return fullCrypto ? renderCurrencyOption(fullCrypto, 'crypto') : null;
                      })}
                      <Separator className="my-2" />
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                        All Cryptocurrencies
                      </div>
                      {cryptos.map(crypto => renderCurrencyOption(crypto, 'crypto'))}
                    </>
                  ) : (
                    MAJOR_FIAT_CURRENCIES.map(fiat => renderCurrencyOption(fiat, 'fiat'))
                  )}
                </SelectContent>
              </Select>

              {fromType === 'crypto' && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{getDisplayPrice(fromCurrency, 'crypto')}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(fromCurrency)}
                    className="h-auto p-1"
                  >
                    {favorites.includes(fromCurrency) ? (
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                    ) : (
                      <StarOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center lg:col-span-2 lg:order-none order-3">
            <Button
              variant="outline"
              size="sm"
              onClick={swapCurrencies}
              className="rounded-full w-12 h-12 p-0 border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="sr-only">Swap currencies</span>
            </Button>
          </div>

          {/* To Currency */}
          <div className="space-y-4">
            <Label htmlFor="to-amount" className="text-sm font-medium">To</Label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Button
                  variant={toType === 'crypto' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setToType('crypto')}
                  className="flex-1"
                >
                  Crypto
                </Button>
                <Button
                  variant={toType === 'fiat' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setToType('fiat')}
                  className="flex-1"
                >
                  Fiat
                </Button>
              </div>

              <Input
                id="to-amount"
                type="text"
                value={parseFloat(toAmount).toLocaleString('en-US', { 
                  maximumFractionDigits: toAmount.includes('e') ? 10 : 6 
                })}
                readOnly
                className="text-lg font-medium bg-muted"
              />

              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {toType === 'crypto' ? (
                    <>
                      {favorites.length > 0 && (
                        <>
                          <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                            Favorites
                          </div>
                          {cryptos
                            .filter(crypto => favorites.includes(crypto.id))
                            .map(crypto => renderCurrencyOption(crypto, 'crypto'))}
                          <Separator className="my-2" />
                        </>
                      )}
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                        Popular
                      </div>
                      {POPULAR_CRYPTOCURRENCIES.map(crypto => {
                        const fullCrypto = cryptos.find(c => c.id === crypto.id);
                        return fullCrypto ? renderCurrencyOption(fullCrypto, 'crypto') : null;
                      })}
                      <Separator className="my-2" />
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                        All Cryptocurrencies
                      </div>
                      {cryptos.map(crypto => renderCurrencyOption(crypto, 'crypto'))}
                    </>
                  ) : (
                    MAJOR_FIAT_CURRENCIES.map(fiat => renderCurrencyOption(fiat, 'fiat'))
                  )}
                </SelectContent>
              </Select>

              {toType === 'crypto' && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{getDisplayPrice(toCurrency, 'crypto')}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(toCurrency)}
                    className="h-auto p-1"
                  >
                    {favorites.includes(toCurrency) ? (
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                    ) : (
                      <StarOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Convert Buttons */}
        <div className="border-t pt-4">
          <div className="text-sm font-medium mb-3">Quick Convert</div>
          <div className="flex flex-wrap gap-2">
            {['1', '10', '100', '1000'].map(amount => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setFromAmount(amount)}
                className="text-xs"
              >
                {amount}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
