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

  // Seed affiliate partners for monetization
  console.log('🤝 Seeding affiliate partners...');
  const affiliatePartners = [
    {
      name: 'Coinbase',
      slug: 'coinbase',
      description: 'The most trusted cryptocurrency exchange with industry-leading security and user experience.',
      logoUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=400&fit=crop',
      websiteUrl: 'https://coinbase.com',
      category: 'exchange',
      commission: 50.0,
      cookieDuration: 30,
      priority: 10,
      regions: ['US', 'CA', 'GB', 'EU', 'AU'],
      tags: ['beginner-friendly', 'secure', 'regulated'],
    },
    {
      name: 'Binance',
      slug: 'binance',
      description: 'World\'s largest cryptocurrency exchange by trading volume with advanced trading features.',
      logoUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=400&fit=crop',
      websiteUrl: 'https://binance.com',
      category: 'exchange',
      commission: 40.0,
      cookieDuration: 30,
      priority: 9,
      regions: ['global'],
      tags: ['advanced-trading', 'low-fees', 'altcoins'],
    },
    {
      name: 'Kraken',
      slug: 'kraken',
      description: 'Professional-grade cryptocurrency exchange with advanced security and institutional services.',
      logoUrl: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=400&fit=crop',
      websiteUrl: 'https://kraken.com',
      category: 'exchange',
      commission: 45.0,
      cookieDuration: 30,
      priority: 8,
      regions: ['US', 'CA', 'GB', 'EU', 'AU', 'JP'],
      tags: ['professional', 'security', 'margin-trading'],
    },
    {
      name: 'Ledger',
      slug: 'ledger',
      description: 'Hardware cryptocurrency wallet with military-grade security for storing your digital assets.',
      logoUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=400&fit=crop',
      websiteUrl: 'https://ledger.com',
      category: 'wallet',
      commission: 10.0,
      cookieDuration: 60,
      priority: 9,
      regions: ['global'],
      tags: ['hardware-wallet', 'security', 'cold-storage'],
    },
    {
      name: 'Trezor',
      slug: 'trezor',
      description: 'Original hardware wallet provider offering uncompromising security for cryptocurrency storage.',
      logoUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop',
      websiteUrl: 'https://trezor.io',
      category: 'wallet',
      commission: 8.0,
      cookieDuration: 60,
      priority: 8,
      regions: ['global'],
      tags: ['hardware-wallet', 'open-source', 'secure'],
    },
    {
      name: 'eToro',
      slug: 'etoro',
      description: 'Social trading platform allowing you to copy successful traders and invest in cryptocurrencies.',
      logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
      websiteUrl: 'https://etoro.com',
      category: 'trading',
      commission: 100.0,
      cookieDuration: 30,
      priority: 7,
      regions: ['US', 'GB', 'EU', 'AU'],
      tags: ['social-trading', 'copy-trading', 'beginner-friendly'],
    },
    {
      name: 'Crypto Academy',
      slug: 'crypto-academy',
      description: 'Comprehensive cryptocurrency education platform with courses from beginner to advanced levels.',
      logoUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
      websiteUrl: 'https://cryptoacademy.com',
      category: 'educational',
      commission: 30.0,
      cookieDuration: 90,
      priority: 6,
      regions: ['global'],
      tags: ['education', 'courses', 'certification'],
    },
    {
      name: 'Uniswap',
      slug: 'uniswap',
      description: 'Leading decentralized exchange protocol for automated liquidity provision on Ethereum.',
      logoUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop',
      websiteUrl: 'https://uniswap.org',
      category: 'defi',
      commission: 25.0,
      cookieDuration: 30,
      priority: 7,
      regions: ['global'],
      tags: ['defi', 'dex', 'liquidity'],
    },
  ];

  for (const partner of affiliatePartners) {
    const createdPartner = await prisma.affiliatePartner.upsert({
      where: { slug: partner.slug },
      update: partner,
      create: partner,
    });

    // Create affiliate links for each partner
    const links = [
      {
        partnerId: createdPartner.id,
        name: `Get Started with ${partner.name}`,
        description: `Join ${partner.name} and start your crypto journey today with exclusive benefits.`,
        targetUrl: `${partner.websiteUrl}?ref=cryptoconverter&utm_source=cryptoconverter&utm_medium=affiliate&utm_campaign=signup`,
        linkType: 'cta',
        placement: 'content',
        utmSource: 'cryptoconverter',
        utmMedium: 'affiliate',
        utmCampaign: 'signup',
        utmContent: 'cta-button',
      },
      {
        partnerId: createdPartner.id,
        name: `${partner.name} - Recommended`,
        description: `Recommended: ${partner.description}`,
        targetUrl: `${partner.websiteUrl}?ref=cryptoconverter-sidebar&utm_source=cryptoconverter&utm_medium=affiliate&utm_campaign=sidebar`,
        linkType: 'banner',
        placement: 'sidebar',
        utmSource: 'cryptoconverter',
        utmMedium: 'affiliate',
        utmCampaign: 'sidebar',
        utmContent: 'sidebar-banner',
      },
      {
        partnerId: createdPartner.id,
        name: `${partner.name} Header`,
        description: `Special offer: ${partner.description}`,
        targetUrl: `${partner.websiteUrl}?ref=cryptoconverter-header&utm_source=cryptoconverter&utm_medium=affiliate&utm_campaign=header`,
        linkType: 'banner',
        placement: 'header',
        utmSource: 'cryptoconverter',
        utmMedium: 'affiliate',
        utmCampaign: 'header',
        utmContent: 'header-banner',
      },
    ];

    for (const link of links) {
      await prisma.affiliateLink.upsert({
        where: { 
          partnerId_placement_linkType: {
            partnerId: link.partnerId,
            placement: link.placement,
            linkType: link.linkType,
          }
        },
        update: link,
        create: link,
      });
    }
  }

  console.log('✅ Affiliate partners and links seeded successfully');

  // Seed sample news articles with better images
  console.log('📰 Seeding news articles...');
  const sampleNews = [
    {
      title: 'Bitcoin Reaches New All-Time High as Institutional Adoption Accelerates',
      description: 'Major corporations continue to add Bitcoin to their treasury reserves, driving unprecedented institutional demand.',
      url: 'https://example.com/bitcoin-ath-2025',
      imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=450&fit=crop',
      source: 'CoinDesk',
      author: 'Sarah Johnson',
      category: 'bitcoin',
      tags: ['bitcoin', 'ath', 'institutional'],
      sentiment: 'positive',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      title: 'Ethereum 2.0 Staking Rewards Attract $50 Billion in Total Value Locked',
      description: 'The Ethereum proof-of-stake network continues to see massive growth in validator participation.',
      url: 'https://example.com/ethereum-staking-2025',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop',
      source: 'CoinTelegraph',
      author: 'Michael Chen',
      category: 'ethereum',
      tags: ['ethereum', 'staking', 'eth2'],
      sentiment: 'positive',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      title: 'DeFi Protocol Uniswap Launches on Polygon Network for Lower Fees',
      description: 'Users can now access Uniswap with significantly reduced transaction costs on the Polygon sidechain.',
      url: 'https://example.com/uniswap-polygon-2025',
      imageUrl: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=450&fit=crop',
      source: 'CryptoSlate',
      author: 'Alex Rodriguez',
      category: 'defi',
      tags: ['uniswap', 'polygon', 'defi'],
      sentiment: 'neutral',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
      title: 'Major Exchange Announces Enhanced Security Features',
      description: 'Leading cryptocurrency exchange introduces multi-layer security protocols and insurance coverage.',
      url: 'https://example.com/exchange-security-2025',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop',
      source: 'Crypto News',
      author: 'Emma Wilson',
      category: 'security',
      tags: ['security', 'exchange', 'insurance'],
      sentiment: 'positive',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
      title: 'NFT Market Shows Signs of Recovery with Utility Focus',
      description: 'Non-fungible token projects pivot to utility-driven models as market sentiment improves.',
      url: 'https://example.com/nft-recovery-2025',
      imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=450&fit=crop',
      source: 'NFT Today',
      author: 'David Park',
      category: 'nft',
      tags: ['nft', 'recovery', 'utility'],
      sentiment: 'neutral',
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    },
  ];

  for (const article of sampleNews) {
    await prisma.newsArticle.upsert({
      where: { url: article.url },
      update: article,
      create: article,
    });
  }

  console.log('✅ News articles seeded successfully');

  // Seed ad spaces configuration
  console.log('📢 Seeding ad spaces configuration...');
  const adSpaces = [
    {
      name: 'Header Banner',
      slug: 'header-banner',
      description: 'Top header banner ad space',
      placement: 'header',
      size: 'responsive',
      pageTypes: ['home', 'markets', 'news'],
      adType: 'adsense',
      isActive: true,
      priority: 10,
    },
    {
      name: 'Sidebar Square',
      slug: 'sidebar-square',
      description: 'Sidebar square ad unit',
      placement: 'sidebar',
      size: 'medium',
      pageTypes: ['home', 'markets', 'crypto-detail'],
      adType: 'adsense',
      isActive: true,
      priority: 8,
    },
    {
      name: 'Content Banner',
      slug: 'content-banner',
      description: 'In-content banner advertisement',
      placement: 'content',
      size: 'large',
      pageTypes: ['home', 'news', 'learn'],
      adType: 'affiliate',
      isActive: true,
      priority: 7,
    },
    {
      name: 'Footer Ad',
      slug: 'footer-ad',
      description: 'Footer advertisement space',
      placement: 'footer',
      size: 'responsive',
      pageTypes: ['all'],
      adType: 'adsense',
      isActive: true,
      priority: 5,
    },
  ];

  for (const adSpace of adSpaces) {
    await prisma.adSpace.upsert({
      where: { slug: adSpace.slug },
      update: adSpace,
      create: adSpace,
    });
  }

  console.log('✅ Ad spaces seeded successfully');

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
