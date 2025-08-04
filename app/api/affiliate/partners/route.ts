
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const placement = searchParams.get('placement');
    const pageContext = searchParams.get('pageContext');
    const limit = parseInt(searchParams.get('limit') || '10');

    let whereClause: any = {
      isActive: true,
    };

    if (category) {
      whereClause.category = category;
    }

    const partners = await prisma.affiliatePartner.findMany({
      where: whereClause,
      include: {
        links: {
          where: {
            isActive: true,
            ...(placement && { placement }),
            ...(pageContext && { pageContext }),
          },
        },
      },
      orderBy: { priority: 'desc' },
      take: limit,
    });

    return NextResponse.json(partners);
  } catch (error) {
    console.error('Error fetching affiliate partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch affiliate partners' },
      { status: 500 }
    );
  }
}
