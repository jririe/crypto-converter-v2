
import { PrismaClient } from '@prisma/client';
import { POPULAR_CRYPTOCURRENCIES, MAJOR_FIAT_CURRENCIES } from '../lib/constants';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed fiat currencies
  console.log('📈 Seeding fiat currencies...');
  for (const fiat of MAJOR_FIAT_CURRENCIES) {
    await prisma.fiatCurrency.upsert({
      where: { code: fiat.code },
      update: {
        name: fiat.name,
        symbol: fiat.symbol,
        flag: fiat.flag,
      },
      create: {
        code: fiat.code,
        name: fiat.name,
        symbol: fiat.symbol,
        flag: fiat.flag,
        exchangeRate: fiat.code === 'USD' ? 1.0 : undefined,
      },
    });
  }

  // Seed popular cryptocurrencies (placeholder data)
  console.log('🪙 Seeding cryptocurrencies...');
  for (const crypto of POPULAR_CRYPTOCURRENCIES) {
    await prisma.cryptocurrency.upsert({
      where: { coinId: crypto.id },
      update: {
        name: crypto.name,
        symbol: crypto.symbol,
        slug: crypto.id,
      },
      create: {
        coinId: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        slug: crypto.id,
        image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
        currentPrice: 0, // Will be updated by API calls
        marketCapRank: POPULAR_CRYPTOCURRENCIES.indexOf(crypto) + 1,
      },
    });
  }

  // Seed sample news articles
  console.log('📰 Seeding news articles...');
  const sampleNews = [
    {
      title: 'Bitcoin Reaches New All-Time High as Institutional Adoption Accelerates',
      description: 'Major corporations continue to add Bitcoin to their treasury reserves, driving unprecedented institutional demand.',
      url: 'https://example.com/bitcoin-ath',
      imageUrl: 'https://thumbs.dreamstime.com/b/bitcoin-coins-installed-system-cryptocurrency-bitcoin-coins-installed-system-cryptocurrency-graph-showing-319527900.jpg',
      source: 'CoinDesk',
      category: 'bitcoin',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      title: 'Ethereum 2.0 Staking Rewards Attract $50 Billion in Total Value Locked',
      description: 'The Ethereum proof-of-stake network continues to see massive growth in validator participation.',
      url: 'https://example.com/ethereum-staking',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop',
      source: 'CoinTelegraph',
      category: 'ethereum',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      title: 'DeFi Protocol Uniswap Launches on Polygon Network for Lower Fees',
      description: 'Users can now access Uniswap with significantly reduced transaction costs on the Polygon sidechain.',
      url: 'https://example.com/uniswap-polygon',
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop',
      source: 'CryptoSlate',
      category: 'defi',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
  ];

  for (const article of sampleNews) {
    await prisma.newsArticle.upsert({
      where: { url: article.url },
      update: article,
      create: article,
    });
  }

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
