
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Shield,
  Lightbulb,
  Users,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learn Cryptocurrency - Beginner Guides & Education | CryptoConverter',
  description: 'Learn cryptocurrency basics, trading strategies, and market analysis with our comprehensive educational resources. Perfect for beginners and advanced users.',
  alternates: {
    canonical: '/learn',
  }
};

export default function LearnPage() {
  const learningPaths = [
    {
      title: 'Cryptocurrency Basics',
      description: 'Start your crypto journey with fundamental concepts',
      level: 'Beginner',
      duration: '2-3 hours',
      icon: BookOpen,
      topics: [
        'What is cryptocurrency?',
        'How blockchain works',
        'Popular cryptocurrencies',
        'Crypto wallets explained'
      ]
    },
    {
      title: 'Trading & Analysis',
      description: 'Learn to analyze markets and make informed decisions',
      level: 'Intermediate',
      duration: '4-5 hours',
      icon: TrendingUp,
      topics: [
        'Technical analysis basics',
        'Reading price charts',
        'Market indicators',
        'Risk management'
      ]
    },
    {
      title: 'Security & Storage',
      description: 'Keep your crypto assets safe and secure',
      level: 'Essential',
      duration: '1-2 hours',
      icon: Shield,
      topics: [
        'Wallet security',
        'Private keys & seed phrases',
        'Two-factor authentication',
        'Common scams to avoid'
      ]
    }
  ];

  const quickGuides = [
    {
      title: 'How to Convert Cryptocurrency',
      description: 'Step-by-step guide to using our converter',
      readTime: '3 min read',
      category: 'Tutorial'
    },
    {
      title: 'Understanding Market Cap',
      description: 'What market capitalization means in crypto',
      readTime: '5 min read',
      category: 'Fundamentals'
    },
    {
      title: 'Reading Price Charts',
      description: 'Basics of cryptocurrency price analysis',
      readTime: '7 min read',
      category: 'Analysis'
    },
    {
      title: 'DeFi Explained Simply',
      description: 'Decentralized Finance for beginners',
      readTime: '6 min read',
      category: 'Advanced'
    },
    {
      title: 'NFTs and Digital Assets',
      description: 'Understanding non-fungible tokens',
      readTime: '4 min read',
      category: 'Trends'
    },
    {
      title: 'Cryptocurrency Taxes',
      description: 'Tax implications of crypto trading',
      readTime: '8 min read',
      category: 'Legal'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Learn Cryptocurrency
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master cryptocurrency with our comprehensive educational resources. 
              From basic concepts to advanced trading strategies, we've got you covered.
            </p>
          </div>

          {/* Learning Paths */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Learning Paths</h2>
              <p className="text-lg text-muted-foreground">
                Structured courses designed to take you from beginner to expert
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {learningPaths.map((path, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <path.icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{path.level}</Badge>
                    </div>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    <p className="text-muted-foreground">{path.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Duration: {path.duration}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">What you'll learn:</h4>
                      <ul className="space-y-1">
                        {path.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full">
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Guides */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quick Guides</h2>
              <p className="text-lg text-muted-foreground">
                Short, focused articles on specific cryptocurrency topics
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickGuides.map((guide, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {guide.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {guide.readTime}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {guide.description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Read more
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Expert Content</h3>
                <p className="text-muted-foreground">
                  Learn from industry experts and seasoned crypto professionals
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Practical Examples</h3>
                <p className="text-muted-foreground">
                  Real-world examples and hands-on exercises to reinforce learning
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Community Support</h3>
                <p className="text-muted-foreground">
                  Join a community of learners and get help when you need it
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
