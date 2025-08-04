
import { NextRequest, NextResponse } from 'next/server';
import { fetchExchangeRates } from '@/lib/crypto-api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await fetchExchangeRates();
    
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error in /api/exchange-rates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch exchange rates' },
      { status: 500 }
    );
  }
}
