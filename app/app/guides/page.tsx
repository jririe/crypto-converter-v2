
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { FAQSection } from '@/components/seo/faq-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Calculator, 
  TrendingUp, 
  Shield, 
  Wallet,
  ChartBar,
  Users,
  AlertTriangle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cryptocurrency Guides - How to Buy, Trade & Convert Bitcoin & Crypto',
  description: 'Complete cryptocurrency guides for beginners. Learn how to buy Bitcoin, convert crypto, use trading tools, secure wallets & understand blockchain technology. Step-by-step tutorials.',
  keywords: [
    'cryptocurrency guide',
    'how to buy bitcoin',
    'crypto trading guide',
    'bitcoin converter guide',
    'cryptocurrency for beginners',
    'crypto wallet guide',
    'how to convert bitcoin to usd',
    'cryptocurrency trading tutorial',
    'bitcoin price guide',
    'ethereum trading guide',
    'crypto investment guide',
    'blockchain technology guide',
    'defi guide for beginners',
    'cryptocurrency security guide',
    'crypto tax guide'
  ],
  openGraph: {
    title: 'Cryptocurrency Guides - How to Buy, Trade & Convert Bitcoin & Crypto',
    description: 'Complete cryptocurrency guides for beginners. Learn how to buy Bitcoin, convert crypto & understand blockchain technology.',
    type: 'website',
    url: '/guides',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cryptocurrency Guides - How to Buy, Trade & Convert Bitcoin & Crypto',
    description: 'Complete cryptocurrency guides for beginners. Learn how to buy Bitcoin, convert crypto & understand blockchain technology.',
  },
  alternates: {
    canonical: '/guides',
  }
};

export default function GuidesPage() {
  const guides = [
    {
      icon: Calculator,
      title: 'How to Use a Cryptocurrency Converter',
      description: 'Learn how to convert Bitcoin to USD, Ethereum to EUR, and other crypto conversions with real-time rates.',
      difficulty: 'Beginner',
      readTime: '5 min',
      topics: ['Crypto Conversion', 'Real-time Prices', 'Calculator Tools']
    },
    {
      icon: TrendingUp,
      title: 'Understanding Cryptocurrency Prices',
      description: 'Discover how crypto prices are determined, market cap calculations, and price movement analysis.',
      difficulty: 'Beginner',
      readTime: '8 min',
      topics: ['Price Analysis', 'Market Cap', 'Trading Volume']
    },
    {
      icon: Wallet,
      title: 'Choosing a Cryptocurrency Wallet',
      description: 'Complete guide to crypto wallets: hardware vs software, security features, and best practices.',
      difficulty: 'Intermediate',
      readTime: '12 min',
      topics: ['Wallet Security', 'Hardware Wallets', 'Software Wallets']
    },
    {
      icon: Shield,
      title: 'Cryptocurrency Security Best Practices',
      description: 'Essential security tips to protect your crypto investments from scams, hacks, and theft.',
      difficulty: 'Intermediate',
      readTime: '10 min',
      topics: ['Security', 'Scam Prevention', 'Private Keys']
    },
    {
      icon: ChartBar,
      title: 'Reading Cryptocurrency Charts',
      description: 'Learn technical analysis basics: candlestick charts, trends, and trading indicators.',
      difficulty: 'Advanced',
      readTime: '15 min',
      topics: ['Technical Analysis', 'Chart Patterns', 'Trading Indicators']
    },
    {
      icon: Users,
      title: 'DeFi for Beginners',
      description: 'Introduction to Decentralized Finance: yield farming, liquidity pools, and DeFi protocols.',
      difficulty: 'Advanced',
      readTime: '20 min',
      topics: ['DeFi', 'Yield Farming', 'Liquidity Pools']
    }
  ];

  const guidesFAQ = [
    {
      question: "How do I start with cryptocurrency as a beginner?",
      answer: "Start by learning the basics through our beginner guides, then practice with our cryptocurrency converter to understand price movements. Begin with small amounts and always research before investing."
    },
    {
      question: "What's the best way to convert cryptocurrency?",
      answer: "Use our free cryptocurrency converter to check real-time rates, compare different exchanges for the best rates, and consider fees. Always verify the conversion rate before making any transactions."
    },
    {
      question: "How do I keep my cryptocurrency safe?",
      answer: "Use hardware wallets for large amounts, enable two-factor authentication, never share private keys, and be cautious of phishing scams. Follow our security best practices guide for detailed tips."
    },
    {
      question: "Are these guides suitable for complete beginners?",
      answer: "Yes! Our guides are designed for all skill levels, with clear difficulty ratings. Start with beginner guides and progress to advanced topics as you gain experience and confidence."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumbs */}
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <Breadcrumbs 
          items={[
            { name: 'Cryptocurrency Guides', href: '/guides', current: true }
          ]} 
        />
      </div>

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-7xl space-y-12">
          {/* Page Header */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Cryptocurrency Guides & Tutorials
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master cryptocurrency with our comprehensive guides. Learn how to buy Bitcoin, convert crypto, 
              understand blockchain technology, and navigate the digital asset world safely and confidently.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Beginner Friendly',
                'Step-by-Step Tutorials', 
                'Security Best Practices',
                'Trading Strategies',
                'Wallet Guides',
                'DeFi Education'
              ].map((feature) => (
                <Badge key={feature} variant="secondary" className="text-sm px-3 py-1">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <guide.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={guide.difficulty === 'Beginner' ? 'default' : guide.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {guide.difficulty}
                      </Badge>
                      <Badge variant="outline">{guide.readTime}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{guide.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.topics.map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-muted text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Guide Content */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold">
                    How to Convert Bitcoin to USD
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Converting Bitcoin to USD is simple with our cryptocurrency converter. Follow these steps 
                    to get real-time conversion rates and understand the process.
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                    Step-by-Step Process:
                  </h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Open our cryptocurrency converter tool</li>
                    <li>Select Bitcoin (BTC) as your source currency</li>
                    <li>Choose USD as your target currency</li>
                    <li>Enter the amount of Bitcoin you want to convert</li>
                    <li>View the real-time USD equivalent</li>
                    <li>Compare rates across different exchanges</li>
                  </ol>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  <h2 className="text-3xl font-bold">
                    Important Tips for Beginners
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Before diving into cryptocurrency, understand these essential concepts to make informed 
                    decisions and avoid common mistakes.
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                    Key Considerations:
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Always verify conversion rates from multiple sources</li>
                    <li>Understand exchange fees and trading costs</li>
                    <li>Never invest more than you can afford to lose</li>
                    <li>Use secure wallets and enable two-factor authentication</li>
                    <li>Stay updated with market news and regulatory changes</li>
                    <li>Practice with small amounts before larger investments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection 
            title="Cryptocurrency Guides FAQ"
            faqs={guidesFAQ}
          />
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
            "name": "Cryptocurrency Guides & Tutorials",
            "description": "Complete cryptocurrency guides for beginners. Learn how to buy Bitcoin, convert crypto & understand blockchain technology.",
            "url": "https://cryptoconverter.com/guides",
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
                  "name": "Cryptocurrency Guides",
                  "item": "https://cryptoconverter.com/guides"
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Cryptocurrency Guides",
              "description": "Educational guides covering all aspects of cryptocurrency",
              "numberOfItems": guides.length,
              "itemListElement": guides.map((guide, index) => ({
                "@type": "HowTo",
                "position": index + 1,
                "name": guide.title,
                "description": guide.description,
                "totalTime": guide.readTime,
                "difficulty": guide.difficulty
              }))
            }
          })
        }}
      />
    </div>
  );
}
