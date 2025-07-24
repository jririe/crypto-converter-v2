
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AffiliateLink } from './affiliate-link';
import { AffiliateLink as AffiliateLinkType } from '@/lib/types';

interface EnhancedAdSpaceProps {
  position: 'header' | 'sidebar' | 'content' | 'footer' | 'native';
  size?: 'small' | 'medium' | 'large' | 'responsive';
  pageContext?: string;
  className?: string;
}

export function EnhancedAdSpace({ 
  position, 
  size = 'medium', 
  pageContext,
  className = '' 
}: EnhancedAdSpaceProps) {
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLinkType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliateLinks = async () => {
      try {
        const params = new URLSearchParams({
          placement: position,
          limit: position === 'sidebar' ? '2' : '1',
        });
        
        if (pageContext) {
          params.set('pageContext', pageContext);
        }

        const response = await fetch(`/api/affiliate/partners?${params}`);
        if (response.ok) {
          const partners = await response.json();
          const links = partners.flatMap((partner: any) => 
            partner.links.map((link: any) => ({
              ...link,
              partner
            }))
          );
          setAffiliateLinks(links);
        }
      } catch (error) {
        console.error('Error fetching affiliate links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliateLinks();
  }, [position, pageContext]);

  const sizeClasses = {
    small: 'min-h-[100px]',
    medium: 'min-h-[200px]',
    large: 'min-h-[300px]',
    responsive: 'min-h-[150px] lg:min-h-[250px]'
  };

  if (loading) {
    return (
      <div className={`${sizeClasses[size]} ${className} animate-pulse bg-muted rounded-lg flex items-center justify-center`}>
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

  if (affiliateLinks.length === 0) {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <GoogleAdSense 
          slot={getAdSlotByPosition(position)} 
          format={size === 'responsive' ? 'auto' : getAdFormatBySize(size)}
        />
      </div>
    );
  }

  if (position === 'native') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="text-xs text-muted-foreground mb-2">Recommended Services</div>
        {affiliateLinks.slice(0, 3).map((link) => (
          <AffiliateLink 
            key={link.id} 
            link={link} 
            variant="card"
            className="mb-3"
          />
        ))}
      </div>
    );
  }

  if (position === 'sidebar') {
    return (
      <div className={`space-y-4 ${className}`}>
        {affiliateLinks.slice(0, 2).map((link) => (
          <AffiliateLink 
            key={link.id} 
            link={link} 
            variant="card"
          />
        ))}
        <div className="mt-4">
          <GoogleAdSense slot="sidebar-ad" format="rectangle" />
        </div>
      </div>
    );
  }

  if (position === 'header' || position === 'content') {
    return (
      <div className={`${className}`}>
        {affiliateLinks[0] && (
          <AffiliateLink 
            link={affiliateLinks[0]} 
            variant="banner"
          />
        )}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <GoogleAdSense 
        slot={getAdSlotByPosition(position)} 
        format={size === 'responsive' ? 'auto' : getAdFormatBySize(size)}
      />
    </div>
  );
}

// Enhanced Google AdSense component with better optimization
export function GoogleAdSense({ 
  slot, 
  format = 'auto',
  responsive = true 
}: { 
  slot: string; 
  format?: string;
  responsive?: boolean;
}) {
  useEffect(() => {
    // Load AdSense script if not already loaded
    if (typeof window !== 'undefined' && !window.adsbygoogle_loaded) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
      window.adsbygoogle_loaded = true;
    }

    // Push ad after component mounts
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle as any[]).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [slot]);

  return (
    <div className="w-full overflow-hidden">
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX" // Replace with your AdSense ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

// Utility functions
function getAdSlotByPosition(position: string): string {
  const slots = {
    header: '1234567890',
    sidebar: '2345678901',
    content: '3456789012',
    footer: '4567890123',
    native: '5678901234',
  };
  return slots[position as keyof typeof slots] || '1234567890';
}

function getAdFormatBySize(size: string): string {
  const formats = {
    small: 'horizontal',
    medium: 'rectangle',
    large: 'large-rectangle',
    responsive: 'auto',
  };
  return formats[size as keyof typeof formats] || 'auto';
}

// Type declaration for AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
    adsbygoogle_loaded: boolean;
  }
}
