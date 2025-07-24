
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, Shield, Zap } from 'lucide-react';
import { AffiliateLink as AffiliateLinkType } from '@/lib/types';

interface AffiliateLinkProps {
  link: AffiliateLinkType;
  className?: string;
  variant?: 'button' | 'card' | 'text' | 'banner';
  showDisclosure?: boolean;
}

export function AffiliateLink({ 
  link, 
  className = '', 
  variant = 'button',
  showDisclosure = true 
}: AffiliateLinkProps) {
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicking(true);

    try {
      // Generate session ID for tracking
      const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Track the click
      const response = await fetch('/api/affiliate/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          linkId: link.id,
          sessionId 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Open in new tab to preserve user experience
        window.open(data.redirectUrl, '_blank', 'noopener,noreferrer');
      } else {
        // Fallback to direct link
        window.open(link.targetUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
      // Fallback to direct link
      window.open(link.targetUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setIsClicking(false);
    }
  };

  if (variant === 'text') {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <button
          onClick={handleClick}
          disabled={isClicking}
          className="text-primary hover:underline font-medium"
        >
          {link.name}
          <ExternalLink className="w-3 h-3 ml-1 inline" />
        </button>
        {showDisclosure && (
          <Badge variant="outline" className="ml-2 text-xs">
            Ad
          </Badge>
        )}
      </span>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 hover:shadow-lg transition-all ${className}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {link.partner?.logoUrl && (
              <img 
                src={link.partner.logoUrl} 
                alt={link.partner.name}
                className="w-8 h-8 rounded"
              />
            )}
            <div>
              <h4 className="font-semibold text-sm">{link.partner?.name}</h4>
              {showDisclosure && (
                <Badge variant="outline" className="text-xs">
                  Sponsored
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {link.partner?.category === 'exchange' && <Zap className="w-4 h-4 text-yellow-500" />}
            {link.partner?.category === 'wallet' && <Shield className="w-4 h-4 text-green-500" />}
            <Star className="w-4 h-4 text-orange-500" />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {link.description || link.partner?.description}
        </p>
        
        <Button 
          onClick={handleClick}
          disabled={isClicking}
          size="sm" 
          className="w-full"
        >
          {isClicking ? 'Opening...' : link.name}
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-primary/10 via-blue-50 to-purple-50 dark:from-primary/20 dark:via-blue-950 dark:to-purple-950 border border-primary/20 rounded-lg p-6 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              {link.partner?.logoUrl && (
                <img 
                  src={link.partner.logoUrl} 
                  alt={link.partner.name}
                  className="w-10 h-10 rounded"
                />
              )}
              <div>
                <h3 className="font-bold text-lg">{link.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {link.partner?.name}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-3">
              {link.description || link.partner?.description}
            </p>
            {showDisclosure && (
              <Badge variant="outline" className="text-xs">
                Sponsored Content
              </Badge>
            )}
          </div>
          <Button 
            onClick={handleClick}
            disabled={isClicking}
            size="lg"
            className="ml-4"
          >
            {isClicking ? 'Opening...' : 'Get Started'}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Default button variant
  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <Button 
        onClick={handleClick}
        disabled={isClicking}
        variant="default"
        size="sm"
      >
        {isClicking ? (
          'Opening...'
        ) : (
          <>
            {link.name}
            <ExternalLink className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
      {showDisclosure && (
        <Badge variant="outline" className="text-xs">
          Ad
        </Badge>
      )}
    </div>
  );
}
