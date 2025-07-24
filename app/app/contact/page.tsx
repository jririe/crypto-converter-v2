
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  Globe
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - Get Support & Feedback | CryptoConverter',
  description: 'Contact the CryptoConverter team for support, feedback, or partnership inquiries. We\'re here to help with all your cryptocurrency conversion needs.',
  alternates: {
    canonical: '/contact',
  }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or need support? We'd love to hear from you. 
              Get in touch with our team and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What's this about?" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                  />
                </div>
                
                <Button className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 24 hours
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Response Times
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">General Inquiries</span>
                    <span className="font-medium">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Technical Support</span>
                    <span className="font-medium">12 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Partnership Inquiries</span>
                    <span className="font-medium">48 hours</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Other Ways to Reach Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">General Support</h3>
                    <p className="text-muted-foreground text-sm">
                      For general questions about using CryptoConverter, feature requests, 
                      or feedback about our platform.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Technical Issues</h3>
                    <p className="text-muted-foreground text-sm">
                      Experiencing technical problems? Report bugs, conversion errors, 
                      or other technical issues.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Business Partnerships</h3>
                    <p className="text-muted-foreground text-sm">
                      Interested in partnerships, integrations, or business collaborations? 
                      We'd love to explore opportunities.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="font-semibold">Frequently Asked Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    Before contacting us, you might find your answer in our 
                    comprehensive FAQ section covering common questions about 
                    cryptocurrency conversion, market data, and platform features.
                  </p>
                  <Button variant="outline" size="sm">
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
