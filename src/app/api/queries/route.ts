import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (search && search.trim()) {
      where.OR = [
        { senderName: { contains: search.trim(), mode: 'insensitive' } },
        { email: { contains: search.trim(), mode: 'insensitive' } },
        { phone: { contains: search.trim(), mode: 'insensitive' } },
        { targetPackage: { contains: search.trim(), mode: 'insensitive' } },
        { message: { contains: search.trim(), mode: 'insensitive' } },
      ];
    }

    const queries = await prisma.query.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const unreadCount = await prisma.query.count({
      where: { status: 'UNREAD' },
    });

    return NextResponse.json({ success: true, queries, unreadCount });
  } catch (error: any) {
    console.error('Error fetching queries:', error);
    return NextResponse.json({ error: 'Failed to fetch queries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderName, email, phone, targetPackage, message } = body;

    if (!senderName || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const query = await prisma.query.create({
      data: {
        senderName: senderName.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : '',
        targetPackage: targetPackage ? targetPackage.trim() : 'General Inquiry',
        message: message.trim(),
        status: 'UNREAD',
      },
    });

    return NextResponse.json({ success: true, query }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating inquiry query:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit inquiry.' },
      { status: 500 }
    );
  }
}
