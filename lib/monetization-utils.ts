
// Utility functions for monetization and tracking

export interface TrackingConfig {
  sessionId?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
}

// Generate unique session ID for tracking
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create session ID from localStorage
export function getSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId();
  
  const existing = localStorage.getItem('session_id');
  if (existing) return existing;
  
  const newSessionId = generateSessionId();
  localStorage.setItem('session_id', newSessionId);
  return newSessionId;
}

// Track affiliate click with analytics
export async function trackAffiliateClick(
  linkId: string, 
  config?: TrackingConfig
): Promise<string | null> {
  try {
    const sessionId = config?.sessionId || getSessionId();
    
    const response = await fetch('/api/affiliate/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        linkId,
        sessionId,
        ...config
      }),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Track in Google Analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', 'affiliate_click', {
          link_id: linkId,
          partner_name: data.partner,
          session_id: sessionId,
          source: config?.source,
        });
      }
      
      return data.redirectUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error tracking affiliate click:', error);
    return null;
  }
}

// Track ad impression
export async function trackAdImpression(
  adSpaceId: string,
  config?: TrackingConfig
): Promise<void> {
  try {
    const sessionId = config?.sessionId || getSessionId();
    
    // Only track if ad space is visible
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Track impression
              fetch('/api/ad/impression', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  adSpaceId,
                  sessionId,
                  pageUrl: window.location.href,
                  referrer: document.referrer,
                }),
              }).catch(console.error);
              
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );
      
      const adElement = document.querySelector(`[data-ad-space="${adSpaceId}"]`);
      if (adElement) {
        observer.observe(adElement);
      }
    }
  } catch (error) {
    console.error('Error tracking ad impression:', error);
  }
}

// Get device type for tracking
export function getDeviceType(): string {
  if (typeof window === 'undefined') return 'server';
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  
  return 'desktop';
}

// Get country code from timezone (fallback)
export function getCountryFromTimezone(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countryMap: Record<string, string> = {
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'America/Chicago': 'US',
      'Europe/London': 'GB',
      'Europe/Paris': 'FR',
      'Europe/Berlin': 'DE',
      'Asia/Tokyo': 'JP',
      'Asia/Shanghai': 'CN',
      'Asia/Kolkata': 'IN',
      'Australia/Sydney': 'AU',
    };
    
    return countryMap[timezone] || 'unknown';
  } catch {
    return 'unknown';
  }
}

// Format revenue for display
export function formatRevenue(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

// Calculate conversion rate
export function calculateConversionRate(conversions: number, clicks: number): number {
  if (clicks === 0) return 0;
  return Math.round((conversions / clicks) * 10000) / 100; // Round to 2 decimal places
}

// A/B test assignment (for future optimization)
export function getABTestVariant(testName: string): 'A' | 'B' {
  if (typeof window === 'undefined') return 'A';
  
  const stored = localStorage.getItem(`ab_test_${testName}`);
  if (stored && ['A', 'B'].includes(stored)) {
    return stored as 'A' | 'B';
  }
  
  const variant = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(`ab_test_${testName}`, variant);
  return variant;
}

// Check if user is in supported region for affiliate links
export function isInSupportedRegion(regions: string[]): boolean {
  if (regions.length === 0) return true; // No restrictions
  
  const userCountry = getCountryFromTimezone();
  return regions.includes(userCountry) || regions.includes('global');
}

// Get referral parameter from URL
export function getReferralParam(): string | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('ref') || urlParams.get('referral') || null;
}

// Track newsletter signup conversion
export function trackNewsletterSignup(source: string): void {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'newsletter_signup', {
      source,
      session_id: getSessionId(),
    });
  }
}

// Track contact form submission
export function trackContactFormSubmission(formType: string): void {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'contact_form_submit', {
      form_type: formType,
      session_id: getSessionId(),
    });
  }
}

// Monetization constants
export const MONETIZATION_CONFIG = {
  DEFAULT_COOKIE_DURATION: 30, // days
  MIN_CLICK_INTERVAL: 1000, // ms to prevent spam clicks
  CONVERSION_TRACKING_WINDOW: 30, // days
  AD_REFRESH_INTERVAL: 30000, // ms for ad refresh
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
} as const;

// Types for analytics
declare global {
  function gtag(...args: any[]): void;
}
