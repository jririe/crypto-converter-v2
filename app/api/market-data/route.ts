
import { NextRequest, NextResponse } from 'next/server';
import { fetchGlobalMarketData } from '@/lib/crypto-api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await fetchGlobalMarketData();
    
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error in /api/market-data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
}
