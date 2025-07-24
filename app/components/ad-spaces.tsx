
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, DollarSign } from 'lucide-react';

interface AdSpaceProps {
  position: 'header' | 'sidebar' | 'content' | 'footer';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function AdSpace({ position, size = 'medium', className = '' }: AdSpaceProps) {
  const adContent = {
    header: {
      title: 'Premium Trading Platform',
      description: 'Trade crypto with zero fees for 30 days',
      cta: 'Start Trading',
      sponsor: 'Sponsored'
    },
    sidebar: {
      title: 'Crypto Learning Hub',
      description: 'Master cryptocurrency trading with expert courses',
      cta: 'Learn More',
      sponsor: 'Sponsored'
    },
    content: {
      title: 'Best Crypto Exchange 2025',
      description: 'Join millions of users trading on the most trusted platform',
      cta: 'Join Now',
      sponsor: 'Sponsored'
    },
    footer: {
      title: 'Portfolio Management',
      description: 'Track your crypto investments like a pro',
      cta: 'Get Started',
      sponsor: 'Ad'
    }
  };

  const sizeClasses = {
    small: 'h-20',
    medium: 'h-32',
    large: 'h-48'
  };

  const content = adContent[position];

  return (
    <Card className={`w-full ${sizeClasses[size]} ${className} border border-dashed border-muted-foreground/30 bg-muted/20`}>
      <CardContent className="p-4 h-full flex flex-col justify-center items-center text-center space-y-2">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <Badge variant="outline" className="text-xs">
            {content.sponsor}
          </Badge>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-semibold text-sm">{content.title}</h3>
          <p className="text-xs text-muted-foreground">{content.description}</p>
        </div>
        
        <div className="flex items-center text-xs text-primary hover:underline cursor-pointer">
          {content.cta}
          <ExternalLink className="w-3 h-3 ml-1" />
        </div>
      </CardContent>
    </Card>
  );
}

// Google AdSense placeholder component
export function GoogleAdSense({ slot, format = 'auto' }: { slot: string; format?: string }) {
  return (
    <div className="w-full">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX" // Replace with actual AdSense ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {/* In production, you would load the AdSense script */}
    </div>
  );
}
