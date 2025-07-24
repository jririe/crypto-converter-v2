
import { NextRequest, NextResponse } from 'next/server';
import { fetchCryptocurrencies } from '@/lib/crypto-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');
    const vsCurrency = searchParams.get('vs_currency') || 'usd';

    const data = await fetchCryptocurrencies(limit, page, vsCurrency);
    
    return NextResponse.json({
      success: true,
      data,
      count: data.length
    });
  } catch (error) {
    console.error('Error in /api/cryptocurrencies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cryptocurrencies' },
      { status: 500 }
    );
  }
}
