
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get click metrics
    const totalClicks = await prisma.affiliateClick.count({
      where: {
        timestamp: { gte: startDate },
      },
    });

    // Get conversion metrics
    const conversions = await prisma.affiliateConversion.findMany({
      where: {
        timestamp: { gte: startDate },
        status: { in: ['confirmed', 'paid'] },
      },
      include: { partner: true },
    });

    const totalConversions = conversions.length;
    const totalRevenue = conversions.reduce((sum, conv) => sum + (conv.commission || 0), 0);
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    // Top partners by revenue
    const partnerRevenue = conversions.reduce((acc, conv) => {
      const partnerId = conv.partnerId;
      if (!acc[partnerId]) {
        acc[partnerId] = {
          partner: conv.partner!,
          revenue: 0,
          conversions: 0,
          clicks: 0,
        };
      }
      acc[partnerId].revenue += conv.commission || 0;
      acc[partnerId].conversions += 1;
      return acc;
    }, {} as Record<string, any>);

    // Get clicks for top partners
    const partnerClicks = await prisma.affiliateClick.groupBy({
      by: ['partnerId'],
      where: {
        timestamp: { gte: startDate },
        partnerId: { in: Object.keys(partnerRevenue) },
      },
      _count: { _all: true },
    });

    partnerClicks.forEach((click) => {
      if (partnerRevenue[click.partnerId]) {
        partnerRevenue[click.partnerId].clicks = click._count._all;
      }
    });

    const topPartners = Object.values(partnerRevenue)
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 5);

    // Revenue by category
    const revenueByCategory = conversions.reduce((acc, conv) => {
      const category = conv.partner?.category || 'unknown';
      acc[category] = (acc[category] || 0) + (conv.commission || 0);
      return acc;
    }, {} as Record<string, number>);

    // Clicks by device
    const deviceClicks = await prisma.affiliateClick.groupBy({
      by: ['device'],
      where: {
        timestamp: { gte: startDate },
      },
      _count: { _all: true },
    });

    const clicksByDevice = deviceClicks.reduce((acc, item) => {
      acc[item.device || 'unknown'] = item._count._all;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      totalClicks,
      totalConversions,
      totalRevenue,
      conversionRate: Math.round(conversionRate * 100) / 100,
      topPartners,
      revenueByCategory,
      clicksByDevice,
    });

  } catch (error) {
    console.error('Error fetching monetization metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}
