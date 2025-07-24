
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, Newspaper, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Tools',
      links: [
        { name: 'Crypto Converter', href: '/', icon: Calculator },
        { name: 'Market Data', href: '/markets', icon: TrendingUp },
        { name: 'Price Charts', href: '/charts', icon: TrendingUp }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Crypto News', href: '/news', icon: Newspaper },
        { name: 'Educational Guides', href: '/learn', icon: Newspaper },
        { name: 'Market Analysis', href: '/analysis', icon: TrendingUp }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', icon: Mail },
        { name: 'Contact', href: '/contact', icon: Mail }
      ]
    }
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">CryptoConverter</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted platform for real-time cryptocurrency conversion, market data, and news. 
              Track 1000+ digital assets with live pricing and comprehensive analytics.
            </p>
            <div className="text-xs text-muted-foreground">
              <p>Real-time data powered by CoinGecko API</p>
              <p>Updated every 30 seconds</p>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} CryptoConverter. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Made for crypto enthusiasts worldwide</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-muted">
          <p className="text-xs text-muted-foreground text-center max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> Cryptocurrency investments are subject to market risk. 
            Prices shown are for informational purposes only and should not be considered as financial advice. 
            Always do your own research before making investment decisions. 
            Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
