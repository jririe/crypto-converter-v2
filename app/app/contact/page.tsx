
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { EnhancedContactForm } from '@/components/enhanced-contact-form';
import { RecommendedServices } from '@/components/recommended-services';
import { EnhancedAdSpace } from '@/components/enhanced-ad-spaces';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Phone,
  Handshake,
  HelpCircle,
  Shield
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - CryptoConverter Support & Partnership Inquiries',
  description: 'Get in touch with CryptoConverter team. Contact us for support, partnership opportunities, or general inquiries. Quick response guaranteed.',
  keywords: [
    'contact crypto converter',
    'cryptocurrency support',
    'crypto partnership',
    'customer service',
    'technical support'
  ],
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help with technical issues and account questions',
      value: 'support@cryptoconverter.com',
      responseTime: '< 24 hours',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Real-time assistance for urgent matters',
      value: 'Available 24/7',
      responseTime: '< 5 minutes',
    },
    {
      icon: Handshake,
      title: 'Partnership',
      description: 'Explore collaboration opportunities',
      value: 'partnerships@cryptoconverter.com',
      responseTime: '< 48 hours',
    },
  ];

  const features = [
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your crypto needs',
    },
    {
      icon: Shield,
      title: 'Secure Communication',
      description: 'All communications are encrypted and confidential',
    },
    {
      icon: HelpCircle,
      title: 'Expert Team',
      description: 'Get answers from cryptocurrency and trading experts',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Mail className="w-3 h-3 mr-1" />
            We're Here to Help
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Get in Touch
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Have questions about cryptocurrency, need technical support, or interested in partnerships? 
            Our expert team is ready to assist you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <method.icon className="w-8 h-8 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium">{method.value}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {method.responseTime}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <EnhancedContactForm variant="full" />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Why Contact Us?</h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <feature.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm">{feature.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Ad Space */}
              <EnhancedAdSpace position="sidebar" size="medium" pageContext="contact" />

              {/* Office Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Office Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium">Headquarters</p>
                      <p className="text-muted-foreground">
                        San Francisco, California<br />
                        United States
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                        Weekend: Limited support available
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Quick answers to common questions about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">How accurate are your price conversions?</h3>
                <p className="text-sm text-muted-foreground">
                  Our prices are updated every 30 seconds using data from multiple reliable sources 
                  including CoinGecko and other major cryptocurrency data providers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Do you offer API access?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer API access for developers and businesses. Contact our partnership 
                  team for more information about API rates and documentation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">How do you ensure data security?</h3>
                <p className="text-sm text-muted-foreground">
                  We use enterprise-grade security measures including SSL encryption, secure data 
                  centers, and regular security audits to protect user data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Can I suggest new features?</h3>
                <p className="text-sm text-muted-foreground">
                  Absolutely! We value user feedback and regularly implement new features based 
                  on community suggestions. Use our contact form to share your ideas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recommended Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">While You're Here</h2>
            <p className="text-muted-foreground">
              Check out these recommended crypto services from our trusted partners.
            </p>
          </div>
          
          <RecommendedServices limit={3} variant="grid" />
          
          <div className="mt-12">
            <EnhancedAdSpace position="content" size="large" pageContext="contact" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
