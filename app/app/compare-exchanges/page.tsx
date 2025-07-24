
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RecommendedServices } from '@/components/recommended-services';
import { EnhancedAdSpace } from '@/components/enhanced-ad-spaces';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Shield, 
  Zap, 
  Users, 
  Star,
  Check,
  X,
  TrendingUp,
  Globe,
  CreditCard,
  Smartphone
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compare Cryptocurrency Exchanges 2025 - Best Crypto Trading Platforms',
  description: 'Compare top cryptocurrency exchanges: Coinbase, Binance, Kraken & more. Find the best crypto trading platform with our detailed comparison of fees, security, and features.',
  keywords: [
    'cryptocurrency exchange comparison',
    'best crypto exchange',
    'compare crypto platforms',
    'bitcoin exchange',
    'crypto trading platform',
    'cryptocurrency broker comparison'
  ],
};

export default function CompareExchangesPage() {
  const exchangeFeatures = [
    { name: 'Trading Fees', key: 'fees' },
    { name: 'Supported Coins', key: 'coins' },
    { name: 'Security Features', key: 'security' },
    { name: 'Mobile App', key: 'mobile' },
    { name: 'Beginner Friendly', key: 'beginner' },
    { name: 'Advanced Trading', key: 'advanced' },
    { name: 'Customer Support', key: 'support' },
    { name: 'Fiat Deposits', key: 'fiat' },
  ];

  const exchanges = [
    {
      name: 'Coinbase',
      logo: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop',
      rating: 4.5,
      description: 'Most trusted and beginner-friendly exchange',
      pros: ['Best for beginners', 'High security', 'Regulated', 'Easy to use'],
      cons: ['Higher fees', 'Limited advanced features'],
      features: {
        fees: '0.5-4.5%',
        coins: '100+',
        security: true,
        mobile: true,
        beginner: true,
        advanced: false,
        support: true,
        fiat: true,
      },
      specialOffer: 'Get $10 in Bitcoin when you buy or sell $100',
      affiliate: true,
    },
    {
      name: 'Binance',
      logo: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=100&h=100&fit=crop',
      rating: 4.3,
      description: 'Largest exchange with lowest fees',
      pros: ['Lowest fees', 'Most altcoins', 'Advanced features', 'High liquidity'],
      cons: ['Complex for beginners', 'Regulatory issues'],
      features: {
        fees: '0.1%',
        coins: '350+',
        security: true,
        mobile: true,
        beginner: false,
        advanced: true,
        support: false,
        fiat: true,
      },
      specialOffer: 'Zero trading fees for 30 days',
      affiliate: true,
    },
    {
      name: 'Kraken',
      logo: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop',
      rating: 4.4,
      description: 'Professional-grade security and features',
      pros: ['High security', 'Professional tools', 'Good support', 'Transparent'],
      cons: ['Limited US availability', 'Complex interface'],
      features: {
        fees: '0.16-0.26%',
        coins: '80+',
        security: true,
        mobile: true,
        beginner: false,
        advanced: true,
        support: true,
        fiat: true,
      },
      specialOffer: 'Pro trading tools with reduced fees',
      affiliate: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Building2 className="w-3 h-3 mr-1" />
                Expert Comparison 2025
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Compare Top Crypto
              <span className="block text-primary">Exchanges</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Find the perfect cryptocurrency exchange for your needs. Compare fees, security, 
              supported coins, and features across leading platforms.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['Security First', 'Low Fees', 'Expert Reviews', 'Updated Daily'].map((feature) => (
                <Badge key={feature} variant="secondary" className="text-sm px-3 py-1">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Enhanced Ad Space - Header */}
          <EnhancedAdSpace position="header" size="small" pageContext="compare-exchanges" />
        </div>
      </section>

      {/* Main Comparison Table */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Features Column */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Compare Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exchangeFeatures.map((feature) => (
                      <div key={feature.key} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exchange Cards */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exchanges.map((exchange, index) => (
                  <Card key={exchange.name} className={`hover:shadow-xl transition-shadow ${index === 0 ? 'ring-2 ring-primary ring-opacity-50' : ''}`}>
                    <CardHeader className="text-center pb-3">
                      {index === 0 && (
                        <Badge className="mb-2 bg-primary text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                        <img 
                          src={exchange.logo} 
                          alt={`${exchange.name} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-xl">{exchange.name}</CardTitle>
                      <div className="flex justify-center items-center space-x-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(exchange.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          {exchange.rating}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {exchange.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      {/* Features Comparison */}
                      <div className="space-y-3 mb-6">
                        {exchangeFeatures.map((feature) => (
                          <div key={feature.key} className="flex items-center justify-between">
                            <span className="text-sm">{feature.name}</span>
                            <div className="flex items-center">
                              {typeof exchange.features[feature.key as keyof typeof exchange.features] === 'boolean' ? (
                                exchange.features[feature.key as keyof typeof exchange.features] ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <X className="w-4 h-4 text-red-500" />
                                )
                              ) : (
                                <span className="text-sm font-medium">
                                  {exchange.features[feature.key as keyof typeof exchange.features] as string}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pros & Cons */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                            Pros
                          </h4>
                          <ul className="space-y-1">
                            {exchange.pros.map((pro, i) => (
                              <li key={i} className="text-xs flex items-center">
                                <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
                            Cons
                          </h4>
                          <ul className="space-y-1">
                            {exchange.cons.map((con, i) => (
                              <li key={i} className="text-xs flex items-center">
                                <X className="w-3 h-3 text-red-500 mr-2 flex-shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Special Offer */}
                      <div className="bg-primary/10 rounded-lg p-3 mb-4">
                        <div className="flex items-center mb-2">
                          <Zap className="w-4 h-4 text-primary mr-2" />
                          <span className="text-sm font-semibold">Special Offer</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {exchange.specialOffer}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <Button className="w-full" size="lg">
                        Start Trading on {exchange.name}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Sponsored • Ad
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Analysis */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">How to Choose the Right Exchange</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <Shield className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-semibold mb-2">Security First</h3>
                      <p className="text-sm text-muted-foreground">
                        Look for exchanges with strong security measures like 2FA, cold storage, and insurance coverage.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <TrendingUp className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-semibold mb-2">Consider Fees</h3>
                      <p className="text-sm text-muted-foreground">
                        Trading fees can add up. Compare maker/taker fees and withdrawal costs.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <Globe className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-semibold mb-2">Availability</h3>
                      <p className="text-sm text-muted-foreground">
                        Ensure the exchange operates in your country and supports your local currency.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <Users className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-semibold mb-2">User Experience</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose an interface that matches your experience level and trading needs.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <EnhancedAdSpace position="content" size="large" pageContext="compare-exchanges" />
            </div>

            <div className="space-y-6">
              <NewsletterSignup variant="card" source="compare-exchanges" />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Exchanges Compared</span>
                      <span className="font-semibold">8+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Countries Supported</span>
                      <span className="font-semibold">180+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Users</span>
                      <span className="font-semibold">100M+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Updated</span>
                      <span className="font-semibold">Today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <EnhancedAdSpace position="sidebar" size="medium" pageContext="compare-exchanges" />
            </div>
          </div>
        </div>
      </section>

      {/* More Recommendations */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">More Recommended Services</h2>
            <p className="text-muted-foreground">
              Complete your crypto setup with these trusted tools and platforms.
            </p>
          </div>
          
          <RecommendedServices category="wallet" limit={3} variant="grid" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
