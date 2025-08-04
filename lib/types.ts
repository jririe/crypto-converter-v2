
export interface CryptoCurrency {
  id: string;
  coinId: string;
  name: string;
  symbol: string;
  slug: string;
  image?: string;
  currentPrice?: number;
  marketCap?: bigint;
  marketCapRank?: number;
  totalVolume?: bigint;
  high24h?: number;
  low24h?: number;
  priceChange24h?: number;
  priceChangePercentage24h?: number;
  marketCapChange24h?: bigint;
  marketCapChangePercentage24h?: number;
  circulatingSupply?: bigint;
  totalSupply?: bigint;
  maxSupply?: bigint;
  ath?: number;
  athChangePercentage?: number;
  athDate?: Date;
  atl?: number;
  atlChangePercentage?: number;
  atlDate?: Date;
  lastUpdated: Date;
}

export interface FiatCurrency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  flag?: string;
  exchangeRate?: number;
  lastUpdated: Date;
}

export interface NewsArticle {
  id: string;
  title: string;
  description?: string;
  content?: string;
  url: string;
  imageUrl?: string;
  source: string;
  author?: string;
  publishedAt: Date;
  category?: string;
  tags: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  viewCount: number;
}

export interface ConversionData {
  fromAmount: number;
  toAmount: number;
  fromType: 'crypto' | 'fiat';
  toType: 'crypto' | 'fiat';
  fromCurrency: CryptoCurrency | FiatCurrency;
  toCurrency: CryptoCurrency | FiatCurrency;
  exchangeRate: number;
  timestamp: Date;
}

export interface MarketData {
  totalMarketCap: number;
  totalVolume: number;
  marketCapPercentage: Record<string, number>;
  activeCryptocurrencies: number;
  markets: number;
  marketCapChangePercentage24hUsd: number;
}

export interface PriceHistoryPoint {
  timestamp: Date;
  price: number;
  marketCap?: number;
  volume?: number;
}

export interface CoinGeckoResponse {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface ExchangeRatesResponse {
  rates: Record<string, number>;
  base: string;
  date: string;
}

// Monetization Types
export interface AffiliatePartner {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  websiteUrl: string;
  category: 'exchange' | 'wallet' | 'educational' | 'trading' | 'defi';
  commission?: number;
  cookieDuration: number;
  isActive: boolean;
  priority: number;
  regions: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AffiliateLink {
  id: string;
  partnerId: string;
  name: string;
  description?: string;
  targetUrl: string;
  linkType: 'cta' | 'banner' | 'text' | 'comparison';
  placement: 'header' | 'sidebar' | 'content' | 'footer' | 'popup';
  pageContext?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  partner?: AffiliatePartner;
}

export interface AffiliateClick {
  id: string;
  linkId: string;
  partnerId: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  device?: string;
  timestamp: Date;
}

export interface AffiliateConversion {
  id: string;
  partnerId: string;
  sessionId?: string;
  conversionValue?: number;
  commission?: number;
  currency: string;
  conversionType: 'signup' | 'purchase' | 'deposit' | 'trade';
  referenceId?: string;
  status: 'pending' | 'confirmed' | 'paid' | 'rejected';
  timestamp: Date;
  partner?: AffiliatePartner;
}

export interface AdSpaceConfig {
  id: string;
  name: string;
  slug: string;
  description?: string;
  placement: 'header' | 'sidebar' | 'content' | 'footer' | 'popup' | 'native';
  size: 'small' | 'medium' | 'large' | 'responsive';
  pageTypes: string[];
  adType: 'adsense' | 'affiliate' | 'banner' | 'native';
  content?: any;
  isActive: boolean;
  priority: number;
}

export interface MonetizationMetrics {
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  conversionRate: number;
  topPartners: Array<{
    partner: AffiliatePartner;
    clicks: number;
    conversions: number;
    revenue: number;
  }>;
  revenueByCategory: Record<string, number>;
  clicksByDevice: Record<string, number>;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  name?: string;
  subscribed: boolean;
  preferences?: any;
  source?: string;
  subscribedAt: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  formType: 'contact' | 'partnership' | 'support';
  status: 'new' | 'read' | 'replied' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: Date;
}
