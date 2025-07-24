
import { NextRequest, NextResponse } from 'next/server';
import { fetchCryptocurrencyById } from '@/lib/crypto-api';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await fetchCryptocurrencyById(id);
    
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Cryptocurrency not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error(`Error in /api/cryptocurrency/${params.id}:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cryptocurrency' },
      { status: 500 }
    );
  }
}
