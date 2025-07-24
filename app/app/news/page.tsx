
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CryptoNews } from '@/components/crypto-news';
import { AdSpace } from '@/components/ad-spaces';

export const metadata: Metadata = {
  title: 'Cryptocurrency News - Latest Bitcoin & Crypto Updates | CryptoConverter',
  description: 'Stay updated with the latest cryptocurrency news, Bitcoin updates, DeFi developments, and blockchain technology trends from trusted sources.',
  keywords: [
    'cryptocurrency news',
    'bitcoin news',
    'ethereum news',
    'defi news',
    'blockchain news',
    'crypto updates',
    'digital currency news'
  ],
  alternates: {
    canonical: '/news',
  }
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Cryptocurrency News
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest developments in cryptocurrency, blockchain technology, 
              and digital finance from trusted news sources.
            </p>
          </div>

          {/* Ad Space */}
          <AdSpace position="content" size="small" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <CryptoNews limit={20} showImages={true} />
            </div>
            
            <div className="space-y-6">
              <AdSpace position="sidebar" size="medium" />
              <AdSpace position="sidebar" size="medium" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
