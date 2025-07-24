
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Cryptocurrency Market Analysis & Insights | CryptoConverter',
  description: 'In-depth cryptocurrency market analysis, trends, and insights. Expert commentary on Bitcoin, Ethereum, and major altcoins.',
  alternates: {
    canonical: '/analysis',
  }
};

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Market Analysis</h1>
            <p className="text-xl text-muted-foreground">
              Coming Soon - In-depth cryptocurrency market analysis and expert insights
            </p>
          </div>

          <Card className="mt-12 p-8">
            <CardHeader>
              <CardTitle className="text-center">Under Development</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                We're working on bringing you comprehensive market analysis, trend insights, 
                and expert commentary on the cryptocurrency market.
              </p>
              <p className="text-sm text-muted-foreground">
                Check back soon for detailed analysis of Bitcoin, Ethereum, and major altcoins.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
