
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AffiliateLink } from './affiliate-link';
import { AffiliatePartner, AffiliateLink as AffiliateLinkType } from '@/lib/types';
import { 
  Building2, 
  Wallet, 
  GraduationCap, 
  TrendingUp, 
  Coins,
  Star,
  Shield,
  Zap,
  Users
} from 'lucide-react';

interface RecommendedServicesProps {
  category?: 'exchange' | 'wallet' | 'educational' | 'trading' | 'defi';
  limit?: number;
  variant?: 'grid' | 'list' | 'carousel';
  className?: string;
}

export function RecommendedServices({ 
  category,
  limit = 6,
  variant = 'grid',
  className = '' 
}: RecommendedServicesProps) {
  const [services, setServices] = useState<(AffiliatePartner & { links: AffiliateLinkType[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const params = new URLSearchParams({
          limit: limit.toString(),
        });
        
        if (category) {
          params.set('category', category);
        }

        const response = await fetch(`/api/affiliate/partners?${params}`);
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching recommended services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [category, limit]);

  const categoryIcons = {
    exchange: Building2,
    wallet: Wallet,
    educational: GraduationCap,
    trading: TrendingUp,
    defi: Coins,
  };

  const categoryColors = {
    exchange: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
    wallet: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    educational: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800',
    trading: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800',
    defi: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4 w-2/3"></div>
                <div className="h-8 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-muted-foreground">No recommended services available at the moment.</div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {services.map((service) => {
          const primaryLink = service.links[0];
          if (!primaryLink) return null;

          const CategoryIcon = categoryIcons[service.category as keyof typeof categoryIcons] || Building2;
          
          return (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      {service.logoUrl ? (
                        <img 
                          src={service.logoUrl} 
                          alt={service.name}
                          className="w-8 h-8 rounded"
                        />
                      ) : (
                        <CategoryIcon className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <Badge variant="outline" className="text-xs capitalize">
                          {service.category}
                        </Badge>
                        {service.priority > 5 && (
                          <Badge className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <Star className="w-3 h-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 mr-1" />
                          Trusted Partner
                        </div>
                        {service.commission && (
                          <div className="flex items-center">
                            <Zap className="w-4 h-4 mr-1" />
                            {service.commission}% Commission
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <AffiliateLink 
                      link={primaryLink} 
                      variant="button"
                      showDisclosure={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const primaryLink = service.links[0];
          if (!primaryLink) return null;

          const CategoryIcon = categoryIcons[service.category as keyof typeof categoryIcons] || Building2;
          const colorClass = categoryColors[service.category as keyof typeof categoryColors] || categoryColors.exchange;
          
          return (
            <Card key={service.id} className={`hover:shadow-lg transition-all ${colorClass}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-background/80 flex items-center justify-center">
                      {service.logoUrl ? (
                        <img 
                          src={service.logoUrl} 
                          alt={service.name}
                          className="w-6 h-6 rounded"
                        />
                      ) : (
                        <CategoryIcon className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1 capitalize">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  {service.priority > 5 && (
                    <Badge className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      <Star className="w-3 h-3 mr-1" />
                      Top
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    Trusted by thousands
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Secure
                  </div>
                </div>

                <AffiliateLink 
                  link={primaryLink} 
                  variant="button"
                  className="w-full"
                  showDisclosure={false}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
