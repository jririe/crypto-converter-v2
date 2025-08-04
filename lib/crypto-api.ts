
import { CoinGeckoResponse, MarketData, PriceHistoryPoint } from './types';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const EXCHANGE_RATES_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60000; // 1 minute

function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function fetchCryptocurrencies(
  limit: number = 100,
  page: number = 1,
  vsCurrency: string = 'usd'
): Promise<CoinGeckoResponse[]> {
  const cacheKey = `cryptos-${limit}-${page}-${vsCurrency}`;
  const cached = getCachedData<CoinGeckoResponse[]>(cacheKey);
  if (cached) return cached;

  try {
    const url = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=false&price_change_percentage=24h`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CryptoConverter/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    return [];
  }
}

export async function fetchCryptocurrencyById(id: string): Promise<CoinGeckoResponse | null> {
  const cacheKey = `crypto-${id}`;
  const cached = getCachedData<CoinGeckoResponse>(cacheKey);
  if (cached) return cached;

  try {
    const url = `${COINGECKO_BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform to match our interface
    const transformedData: CoinGeckoResponse = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image?.large || data.image?.small,
      current_price: data.market_data?.current_price?.usd || 0,
      market_cap: data.market_data?.market_cap?.usd || 0,
      market_cap_rank: data.market_data?.market_cap_rank || 0,
      fully_diluted_valuation: data.market_data?.fully_diluted_valuation?.usd || 0,
      total_volume: data.market_data?.total_volume?.usd || 0,
      high_24h: data.market_data?.high_24h?.usd || 0,
      low_24h: data.market_data?.low_24h?.usd || 0,
      price_change_24h: data.market_data?.price_change_24h || 0,
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h || 0,
      market_cap_change_24h: data.market_data?.market_cap_change_24h || 0,
      market_cap_change_percentage_24h: data.market_data?.market_cap_change_percentage_24h || 0,
      circulating_supply: data.market_data?.circulating_supply || 0,
      total_supply: data.market_data?.total_supply || 0,
      max_supply: data.market_data?.max_supply || 0,
      ath: data.market_data?.ath?.usd || 0,
      ath_change_percentage: data.market_data?.ath_change_percentage?.usd || 0,
      ath_date: data.market_data?.ath_date?.usd || '',
      atl: data.market_data?.atl?.usd || 0,
      atl_change_percentage: data.market_data?.atl_change_percentage?.usd || 0,
      atl_date: data.market_data?.atl_date?.usd || '',
      last_updated: data.last_updated || new Date().toISOString()
    };

    setCachedData(cacheKey, transformedData);
    return transformedData;
  } catch (error) {
    console.error(`Error fetching cryptocurrency ${id}:`, error);
    return null;
  }
}

export async function fetchGlobalMarketData(): Promise<MarketData | null> {
  const cacheKey = 'global-market-data';
  const cached = getCachedData<MarketData>(cacheKey);
  if (cached) return cached;

  try {
    const url = `${COINGECKO_BASE_URL}/global`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const { data } = await response.json();
    
    const marketData: MarketData = {
      totalMarketCap: data.total_market_cap?.usd || 0,
      totalVolume: data.total_volume?.usd || 0,
      marketCapPercentage: data.market_cap_percentage || {},
      activeCryptocurrencies: data.active_cryptocurrencies || 0,
      markets: data.markets || 0,
      marketCapChangePercentage24hUsd: data.market_cap_change_percentage_24h_usd || 0
    };

    setCachedData(cacheKey, marketData);
    return marketData;
  } catch (error) {
    console.error('Error fetching global market data:', error);
    return null;
  }
}

export async function fetchExchangeRates(): Promise<Record<string, number>> {
  const cacheKey = 'exchange-rates';
  const cached = getCachedData<Record<string, number>>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(EXCHANGE_RATES_URL);
    
    if (!response.ok) {
      throw new Error(`Exchange rates API error: ${response.status}`);
    }

    const data = await response.json();
    setCachedData(cacheKey, data.rates);
    return data.rates || {};
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return {};
  }
}

export async function fetchPriceHistory(
  coinId: string,
  days: number = 7,
  vsCurrency: string = 'usd'
): Promise<PriceHistoryPoint[]> {
  const cacheKey = `price-history-${coinId}-${days}-${vsCurrency}`;
  const cached = getCachedData<PriceHistoryPoint[]>(cacheKey);
  if (cached) return cached;

  try {
    const url = `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}&interval=${days > 30 ? 'daily' : 'hourly'}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    const priceHistory: PriceHistoryPoint[] = data.prices?.map((point: [number, number]) => ({
      timestamp: new Date(point[0]),
      price: point[1]
    })) || [];

    // Add market cap and volume data if available
    if (data.market_caps && data.total_volumes) {
      priceHistory.forEach((point, index) => {
        if (data.market_caps[index]) {
          point.marketCap = data.market_caps[index][1];
        }
        if (data.total_volumes[index]) {
          point.volume = data.total_volumes[index][1];
        }
      });
    }

    setCachedData(cacheKey, priceHistory);
    return priceHistory;
  } catch (error) {
    console.error(`Error fetching price history for ${coinId}:`, error);
    return [];
  }
}

export async function searchCryptocurrencies(query: string): Promise<CoinGeckoResponse[]> {
  if (!query || query.length < 2) return [];

  const cacheKey = `search-${query.toLowerCase()}`;
  const cached = getCachedData<CoinGeckoResponse[]>(cacheKey);
  if (cached) return cached;

  try {
    const url = `${COINGECKO_BASE_URL}/search?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Get detailed data for search results
    const coinIds = data.coins?.slice(0, 10).map((coin: any) => coin.id) || [];
    
    if (coinIds.length === 0) return [];

    const detailsUrl = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&sparkline=false`;
    const detailsResponse = await fetch(detailsUrl);
    
    if (!detailsResponse.ok) {
      throw new Error(`CoinGecko API error: ${detailsResponse.status}`);
    }

    const results = await detailsResponse.json();
    setCachedData(cacheKey, results);
    return results;
  } catch (error) {
    console.error(`Error searching cryptocurrencies for "${query}":`, error);
    return [];
  }
}

export function convertCurrency(
  amount: number,
  fromRate: number,
  toRate: number
): number {
  if (!amount || !fromRate || !toRate) return 0;
  return (amount / fromRate) * toRate;
}

export function formatCurrency(
  amount: number,
  currency: string,
  locale: string = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: amount < 1 ? 6 : 2,
      maximumFractionDigits: amount < 1 ? 6 : 2
    }).format(amount);
  } catch (error) {
    return `${amount.toFixed(amount < 1 ? 6 : 2)} ${currency.toUpperCase()}`;
  }
}

export function formatNumber(
  amount: number,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    notation: amount > 1000000000 ? 'compact' : 'standard',
    maximumFractionDigits: 2
  }).format(amount);
}

export function calculatePercentageChange(
  current: number,
  previous: number
): number {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
}
