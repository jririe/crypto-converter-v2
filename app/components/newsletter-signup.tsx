
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Bell, TrendingUp, Newspaper, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface NewsletterSignupProps {
  variant?: 'card' | 'inline' | 'popup';
  source?: string;
  className?: string;
}

export function NewsletterSignup({ 
  variant = 'card', 
  source = 'website',
  className = '' 
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        toast.success('Successfully subscribed to our newsletter!');
        
        // Track newsletter signup for analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'newsletter_signup', {
            source: source,
            email_provided: !!email,
            name_provided: !!name,
          });
        }
      } else {
        toast.error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: TrendingUp, text: 'Daily market insights & analysis' },
    { icon: Bell, text: 'Breaking crypto news alerts' },
    { icon: Newspaper, text: 'Weekly roundup of top stories' },
  ];

  if (isSubscribed) {
    return (
      <Card className={`text-center bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 ${className}`}>
        <CardContent className="p-6">
          <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Welcome to the Community!</h3>
          <p className="text-muted-foreground">
            You've successfully subscribed to our newsletter. Check your email for a confirmation.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">Get the latest crypto insights</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">Free</Badge>
        </div>
        
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            size="sm"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl">Stay Ahead of the Market</CardTitle>
        <p className="text-muted-foreground">
          Join 10,000+ crypto enthusiasts getting daily insights and analysis
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4 mb-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">{benefit.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              'Subscribing...'
            ) : (
              <>
                Subscribe Free
                <Mail className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          No spam, unsubscribe anytime. See our privacy policy.
        </p>
      </CardContent>
    </Card>
  );
}
