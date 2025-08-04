
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CryptoNews } from '@/components/crypto-news';
import { AdSpace } from '@/components/ad-spaces';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { FAQSection } from '@/components/seo/faq-section';

export const metadata: Metadata = {
  title: 'Latest Cryptocurrency News - Bitcoin, Ethereum & Blockchain Updates Today',
  description: 'Stay updated with breaking cryptocurrency news, Bitcoin price updates, Ethereum developments, DeFi trends & blockchain technology insights from trusted sources like CoinDesk, CoinTelegraph & Decrypt.',
  keywords: [
    'cryptocurrency news',
    'bitcoin news',
    'ethereum news',
    'defi news',
    'blockchain news',
    'crypto updates',
    'digital currency news',
    'bitcoin news today',
    'ethereum updates',
    'cryptocurrency breaking news',
    'blockchain technology news',
    'crypto market news',
    'digital asset news',
    'bitcoin price news',
    'ethereum price updates',
    'defi protocol news',
    'nft news',
    'crypto regulation news',
    'cryptocurrency adoption news'
  ],
  openGraph: {
    title: 'Latest Cryptocurrency News - Bitcoin, Ethereum & Blockchain Updates',
    description: 'Breaking cryptocurrency news, Bitcoin updates, Ethereum developments & blockchain insights from trusted sources.',
    type: 'website',
    url: '/news',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Cryptocurrency News - Bitcoin, Ethereum & Blockchain Updates',
    description: 'Breaking cryptocurrency news, Bitcoin updates, Ethereum developments & blockchain insights from trusted sources.',
  },
  alternates: {
    canonical: '/news',
  }
};

export default function NewsPage() {
  const newsFAQ = [
    {
      question: "How often is cryptocurrency news updated?",
      answer: "Our cryptocurrency news feed is updated every 5 minutes with the latest articles from trusted sources like CoinDesk, CoinTelegraph, CryptoSlate, and Decrypt to ensure you never miss important developments."
    },
    {
      question: "What sources do you use for cryptocurrency news?",
      answer: "We aggregate news from reputable cryptocurrency publications including CoinDesk, CoinTelegraph, CryptoSlate, Decrypt, The Block, and CryptoNews to provide comprehensive market coverage."
    },
    {
      question: "Do you cover all types of cryptocurrency news?",
      answer: "Yes, we cover all major cryptocurrency topics including Bitcoin news, Ethereum updates, DeFi developments, NFT trends, regulatory changes, adoption news, and blockchain technology advances."
    },
    {
      question: "Can I get alerts for breaking cryptocurrency news?",
      answer: "While we don't currently offer news alerts, you can bookmark our news page and check back regularly, or subscribe to our newsletter for daily crypto news summaries and market updates."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumbs */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <Breadcrumbs 
          items={[
            { name: 'Cryptocurrency News', href: '/news', current: true }
          ]} 
        />
      </div>

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Latest Cryptocurrency News & Blockchain Updates
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with breaking cryptocurrency news, Bitcoin price updates, Ethereum developments, 
              DeFi trends, and blockchain technology insights from trusted sources like CoinDesk, CoinTelegraph, and Decrypt.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {[
                'Breaking News',
                'Bitcoin Updates', 
                'Ethereum News',
                'DeFi Developments',
                'Regulatory Updates',
                'Market Analysis'
              ].map((category) => (
                <div key={category} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* Ad Space */}
          <AdSpace position="content" size="small" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <CryptoNews limit={20} showImages={true} />
            </div>
            
            <div className="space-y-6">
              <AdSpace position="sidebar" size="medium" />
              
              {/* News Categories */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Popular News Categories</h3>
                <div className="space-y-2">
                  {[
                    'Bitcoin News',
                    'Ethereum Updates', 
                    'DeFi Protocols',
                    'NFT Market',
                    'Crypto Regulation',
                    'Blockchain Tech',
                    'Market Analysis',
                    'Altcoin News'
                  ].map((category) => (
                    <div key={category} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              
              <AdSpace position="sidebar" size="medium" />
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Why Follow Cryptocurrency News?
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Staying updated with cryptocurrency news is essential for making informed investment decisions. 
                  Bitcoin price movements, Ethereum updates, regulatory changes, and DeFi developments can 
                  significantly impact the crypto market.
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Key News Categories:
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Bitcoin price analysis and market updates</li>
                  <li>Ethereum protocol upgrades and developments</li>
                  <li>DeFi protocol launches and security updates</li>
                  <li>Cryptocurrency regulation and legal changes</li>
                  <li>Blockchain technology breakthroughs</li>
                  <li>Major cryptocurrency exchange updates</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Trusted Cryptocurrency News Sources
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  We curate news from the most reputable cryptocurrency publications to ensure you get accurate, 
                  timely, and comprehensive coverage of the digital asset space. Our sources include industry-leading 
                  publications with proven track records.
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                  Our News Sources:
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>CoinDesk - Leading cryptocurrency news and analysis</li>
                  <li>CoinTelegraph - Comprehensive blockchain coverage</li>
                  <li>CryptoSlate - Technical analysis and project reviews</li>
                  <li>Decrypt - Consumer-focused crypto journalism</li>
                  <li>The Block - Institutional crypto news and research</li>
                  <li>CryptoNews - Global cryptocurrency developments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection 
            title="Cryptocurrency News FAQ"
            faqs={newsFAQ}
          />
        </div>
      </main>

      <Footer />

      {/* Structured Data for News Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Latest Cryptocurrency News & Blockchain Updates",
            "description": "Breaking cryptocurrency news, Bitcoin updates, Ethereum developments & blockchain insights from trusted sources.",
            "url": "https://cryptoconverter.com/news",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://cryptoconverter.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Cryptocurrency News",
                  "item": "https://cryptoconverter.com/news"
                }
              ]
            },
            "mainEntity": {
              "@type": "CollectionPage",
              "name": "Cryptocurrency News Collection",
              "description": "Latest news articles about Bitcoin, Ethereum, DeFi, and blockchain technology",
              "keywords": [
                "cryptocurrency news",
                "bitcoin news",
                "ethereum news",
                "blockchain news",
                "defi news"
              ]
            },
            "specialty": [
              "Cryptocurrency",
              "Bitcoin",
              "Ethereum",
              "Blockchain Technology",
              "DeFi"
            ]
          })
        }}
      />
    </div>
  );
}
