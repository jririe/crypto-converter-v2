
import { NextRequest, NextResponse } from 'next/server';
import { searchCryptocurrencies } from '@/lib/crypto-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        data: []
      });
    }

    const data = await searchCryptocurrencies(query);
    
    return NextResponse.json({
      success: true,
      data,
      count: data.length
    });
  } catch (error) {
    console.error('Error in /api/search:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search cryptocurrencies' },
      { status: 500 }
    );
  }
}
