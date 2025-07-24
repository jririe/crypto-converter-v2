
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Cryptocurrency Price Charts & Technical Analysis | CryptoConverter',
  description: 'Interactive cryptocurrency price charts with technical indicators. Analyze Bitcoin, Ethereum, and altcoin price movements.',
  alternates: {
    canonical: '/charts',
  }
};

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Price Charts</h1>
            <p className="text-xl text-muted-foreground">
              Coming Soon - Interactive cryptocurrency price charts and technical analysis
            </p>
          </div>

          <Card className="mt-12 p-8">
            <CardHeader>
              <CardTitle className="text-center">Charts Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                We're developing advanced charting capabilities with technical indicators, 
                multiple timeframes, and interactive analysis tools.
              </p>
              <p className="text-sm text-muted-foreground">
                Features will include candlestick charts, volume analysis, moving averages, and more.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
