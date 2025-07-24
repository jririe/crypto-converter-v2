
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { linkId, sessionId } = body;

    if (!linkId) {
      return NextResponse.json(
        { error: 'Link ID is required' },
        { status: 400 }
      );
    }

    // Get link details
    const link = await prisma.affiliateLink.findUnique({
      where: { id: linkId },
      include: { partner: true },
    });

    if (!link || !link.isActive) {
      return NextResponse.json(
        { error: 'Invalid or inactive link' },
        { status: 404 }
      );
    }

    // Extract client info
    const clientIP = request.ip || 
      request.headers.get('x-forwarded-for')?.split(',')[0] || 
      request.headers.get('x-real-ip') || 
      'unknown';
    
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    // Determine device type
    let device = 'desktop';
    if (userAgent.includes('Mobile')) device = 'mobile';
    else if (userAgent.includes('Tablet')) device = 'tablet';

    // Record the click
    await prisma.affiliateClick.create({
      data: {
        linkId,
        partnerId: link.partnerId,
        sessionId,
        ipAddress: clientIP,
        userAgent,
        referrer,
        device,
      },
    });

    // Build tracking URL with UTM parameters
    let trackingUrl = link.targetUrl;
    const urlParams = new URLSearchParams();
    
    if (link.utmSource) urlParams.set('utm_source', link.utmSource);
    if (link.utmMedium) urlParams.set('utm_medium', link.utmMedium);
    if (link.utmCampaign) urlParams.set('utm_campaign', link.utmCampaign);
    if (link.utmContent) urlParams.set('utm_content', link.utmContent);
    if (sessionId) urlParams.set('ref', sessionId);

    if (urlParams.toString()) {
      trackingUrl += (trackingUrl.includes('?') ? '&' : '?') + urlParams.toString();
    }

    return NextResponse.json({ 
      success: true, 
      redirectUrl: trackingUrl,
      partner: link.partner.name 
    });

  } catch (error) {
    console.error('Error tracking affiliate click:', error);
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    );
  }
}
