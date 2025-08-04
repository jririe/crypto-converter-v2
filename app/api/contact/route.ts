
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, formType = 'contact' } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const clientIP = request.ip || 
      request.headers.get('x-forwarded-for')?.split(',')[0] || 
      request.headers.get('x-real-ip');
    
    const userAgent = request.headers.get('user-agent');
    const source = request.headers.get('referer');

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message,
        formType,
        ipAddress: clientIP,
        userAgent,
        source,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been sent successfully' 
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
