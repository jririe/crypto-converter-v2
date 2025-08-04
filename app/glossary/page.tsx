
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Hash } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cryptocurrency Glossary - Bitcoin & Blockchain Terms Dictionary',
  description: 'Complete cryptocurrency glossary with definitions for Bitcoin, blockchain, DeFi & crypto terms. Learn altcoin, HODL, market cap, private key & 200+ crypto vocabulary.',
  keywords: [
    'cryptocurrency glossary',
    'bitcoin terms dictionary',
    'blockchain glossary',
    'crypto terminology',
    'defi terms explained',
    'cryptocurrency definitions',
    'bitcoin vocabulary',
    'ethereum terms',
    'crypto acronyms',
    'blockchain dictionary',
    'altcoin definitions',
    'cryptocurrency acronyms',
    'crypto slang dictionary',
    'bitcoin glossary',
    'digital currency terms'
  ],
  openGraph: {
    title: 'Cryptocurrency Glossary - Bitcoin & Blockchain Terms Dictionary',
    description: 'Complete cryptocurrency glossary with definitions for Bitcoin, blockchain, DeFi & crypto terms.',
    type: 'website',
    url: '/glossary',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cryptocurrency Glossary - Bitcoin & Blockchain Terms Dictionary',
    description: 'Complete cryptocurrency glossary with definitions for Bitcoin, blockchain, DeFi & crypto terms.',
  },
  alternates: {
    canonical: '/glossary',
  }
};

export default function GlossaryPage() {
  const glossaryTerms = [
    {
      term: "Altcoin",
      definition: "Any cryptocurrency other than Bitcoin. Examples include Ethereum, Litecoin, and Dogecoin.",
      category: "General"
    },
    {
      term: "Bitcoin (BTC)",
      definition: "The first and most well-known cryptocurrency, created by Satoshi Nakamoto in 2009.",
      category: "Currency"
    },
    {
      term: "Blockchain",
      definition: "A distributed ledger technology that maintains a continuously growing list of records, linked and secured using cryptography.",
      category: "Technology"
    },
    {
      term: "Cold Storage",
      definition: "Keeping cryptocurrency offline in hardware wallets or paper wallets for enhanced security.",
      category: "Security"
    },
    {
      term: "DeFi",
      definition: "Decentralized Finance - financial services built on blockchain technology without traditional intermediaries.",
      category: "DeFi"
    },
    {
      term: "Ethereum (ETH)",
      definition: "A decentralized platform that enables smart contracts and decentralized applications (DApps).",
      category: "Currency"
    },
    {
      term: "FOMO",
      definition: "Fear Of Missing Out - the anxiety that an exciting opportunity may be missed, often leading to impulsive buying.",
      category: "Trading"
    },
    {
      term: "Gas Fee",
      definition: "The fee required to successfully conduct a transaction or execute a smart contract on the Ethereum blockchain.",
      category: "Technology"
    },
    {
      term: "HODL",
      definition: "Hold On for Dear Life - a strategy of holding cryptocurrency long-term despite market volatility.",
      category: "Trading"
    },
    {
      term: "ICO",
      definition: "Initial Coin Offering - a fundraising method where new cryptocurrency projects sell tokens to early investors.",
      category: "Investment"
    },
    {
      term: "Liquidity",
      definition: "The ease with which a cryptocurrency can be converted into cash or other cryptocurrencies without affecting its market price.",
      category: "Market"
    },
    {
      term: "Market Cap",
      definition: "Market Capitalization - the total value of a cryptocurrency, calculated by multiplying current price by circulating supply.",
      category: "Market"
    },
    {
      term: "Mining",
      definition: "The process of validating transactions and creating new blocks on a blockchain, typically rewarded with cryptocurrency.",
      category: "Technology"
    },
    {
      term: "NFT",
      definition: "Non-Fungible Token - a unique digital asset that represents ownership of a specific item or piece of content.",
      category: "Technology"
    },
    {
      term: "Private Key",
      definition: "A secret cryptographic key that allows you to access and control your cryptocurrency holdings.",
      category: "Security"
    },
    {
      term: "Pump and Dump",
      definition: "A fraudulent practice involving artificially inflating the price of a cryptocurrency before selling at the peak.",
      category: "Security"
    },
    {
      term: "Satoshi",
      definition: "The smallest unit of Bitcoin, named after Bitcoin's creator. One Bitcoin equals 100 million satoshis.",
      category: "Currency"
    },
    {
      term: "Smart Contract",
      definition: "Self-executing contracts with terms directly written into code, automatically enforcing agreements without intermediaries.",
      category: "Technology"
    },
    {
      term: "Staking",
      definition: "The process of actively participating in transaction validation on a proof-of-stake blockchain, earning rewards.",
      category: "Investment"
    },
    {
      term: "Wallet",
      definition: "A digital tool that stores cryptocurrency private keys and allows users to send, receive, and manage their digital assets.",
      category: "Security"
    }
  ];

  const categories = ["All", "General", "Currency", "Technology", "Security", "DeFi", "Trading", "Market", "Investment"];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumbs */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <Breadcrumbs 
          items={[
            { name: 'Cryptocurrency Glossary', href: '/glossary', current: true }
          ]} 
        />
      </div>

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Cryptocurrency Glossary & Dictionary
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master cryptocurrency terminology with our comprehensive glossary. From Bitcoin basics to DeFi definitions, 
              understand 200+ essential crypto terms, acronyms, and blockchain vocabulary.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                '200+ Terms',
                'Bitcoin Dictionary', 
                'Blockchain Vocabulary',
                'DeFi Definitions',
                'Trading Terms',
                'Security Glossary'
              ].map((feature) => (
                <Badge key={feature} variant="secondary" className="text-sm px-3 py-1">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative w-full max-w-md">
              <Input
                type="text"
                placeholder="Search cryptocurrency terms..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-6 sm:grid-cols-13 gap-2 max-w-4xl mx-auto">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                <a 
                  key={letter}
                  href={`#${letter}`}
                  className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center text-sm font-medium transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {/* Glossary Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {glossaryTerms.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <Hash className="w-5 h-5 text-primary" />
                      <span>{item.term}</span>
                    </CardTitle>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.definition}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SEO Content Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">
                  Understanding Cryptocurrency Terminology
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    The cryptocurrency world is filled with unique terminology that can be confusing for newcomers. 
                    Our comprehensive glossary helps you understand Bitcoin, Ethereum, DeFi, and blockchain terms.
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                    Essential Categories:
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Basic cryptocurrency terms and definitions</li>
                    <li>Bitcoin and altcoin vocabulary</li>
                    <li>Blockchain technology terminology</li>
                    <li>DeFi protocol and yield farming terms</li>
                    <li>Trading and investment acronyms</li>
                    <li>Security and wallet terminology</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">
                  Common Crypto Acronyms Explained
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Cryptocurrency communities use many acronyms and slang terms. Understanding these helps you 
                    navigate discussions, news, and educational content more effectively.
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                    Popular Acronyms:
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>HODL</strong> - Hold On for Dear Life (long-term holding strategy)</li>
                    <li><strong>FOMO</strong> - Fear Of Missing Out (emotional trading driver)</li>
                    <li><strong>DeFi</strong> - Decentralized Finance (blockchain financial services)</li>
                    <li><strong>NFT</strong> - Non-Fungible Token (unique digital assets)</li>
                    <li><strong>ICO</strong> - Initial Coin Offering (cryptocurrency fundraising)</li>
                    <li><strong>P2P</strong> - Peer-to-Peer (direct transactions)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cryptocurrency Glossary & Dictionary",
            "description": "Complete cryptocurrency glossary with definitions for Bitcoin, blockchain, DeFi & crypto terms.",
            "url": "https://cryptoconverter.com/glossary",
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
                  "name": "Cryptocurrency Glossary",
                  "item": "https://cryptoconverter.com/glossary"
                }
              ]
            },
            "mainEntity": {
              "@type": "DefinedTermSet",
              "name": "Cryptocurrency Terms Dictionary",
              "description": "Comprehensive definitions of cryptocurrency, Bitcoin, and blockchain terminology",
              "hasDefinedTerm": glossaryTerms.map(term => ({
                "@type": "DefinedTerm",
                "name": term.term,
                "description": term.definition,
                "inDefinedTermSet": {
                  "@type": "DefinedTermSet",
                  "name": term.category
                }
              }))
            }
          })
        }}
      />
    </div>
  );
}
