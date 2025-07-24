
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  Users, 
  Globe,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About CryptoConverter - Your Trusted Crypto Price Calculator',
  description: 'Learn about CryptoConverter, the comprehensive cryptocurrency price calculator and market data platform trusted by thousands of crypto enthusiasts worldwide.',
  alternates: {
    canonical: '/about',
  }
};

export default function AboutPage() {
  const features = [
    {
      icon: Calculator,
      title: 'Real-Time Conversion',
      description: 'Convert between 1000+ cryptocurrencies and all major fiat currencies with live prices.'
    },
    {
      icon: TrendingUp,
      title: 'Market Data & Analytics',
      description: 'Comprehensive market data including price charts, market caps, and trading volumes.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with enterprise-grade security and powered by trusted data providers.'
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Designed for both beginners and professionals with intuitive interface.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Support for all major global currencies and comprehensive crypto coverage.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with instant conversions and real-time updates.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              About CryptoConverter
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your trusted platform for real-time cryptocurrency conversion, market data, and analysis. 
              Built for the crypto community by crypto enthusiasts.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardContent className="p-0 text-center space-y-4">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To democratize access to cryptocurrency market data and provide users with the most 
                accurate, fast, and comprehensive tools for navigating the digital asset landscape.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-muted-foreground">Cryptocurrencies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">30+</div>
              <div className="text-muted-foreground">Fiat Currencies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground">Daily Conversions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
          </div>

          {/* Values Section */}
          <Card className="p-8">
            <CardContent className="p-0 space-y-8">
              <h2 className="text-3xl font-bold text-center">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Accuracy</h3>
                  <p className="text-muted-foreground">
                    We provide the most accurate and up-to-date cryptocurrency data from trusted sources.
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Transparency</h3>
                  <p className="text-muted-foreground">
                    Open about our data sources, methodologies, and any limitations in our service.
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Innovation</h3>
                  <p className="text-muted-foreground">
                    Continuously improving our platform with new features and better user experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
