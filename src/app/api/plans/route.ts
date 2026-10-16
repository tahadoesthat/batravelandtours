import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateUniqueSlug } from '@/lib/slugify';
import { calculateReadingTime } from '@/lib/utils';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'ALL' | 'PUBLISHED' | 'DRAFT'
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;
    const excludeSlug = searchParams.get('excludeSlug');

    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (category && category !== 'ALL') {
      where.category = {
        equals: category,
        mode: 'insensitive',
      };
    }

    if (excludeSlug) {
      where.slug = { not: excludeSlug };
    }

    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: 'insensitive' } },
        { destination: { contains: search.trim(), mode: 'insensitive' } },
        { shortDescription: { contains: search.trim(), mode: 'insensitive' } },
      ];
    }

    const plans = await prisma.travelPlan.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({ success: true, plans });
  } catch (error: any) {
    console.error('Error fetching travel plans:', error);
    return NextResponse.json({ error: 'Failed to fetch travel plans' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      destination,
      category = 'Destinations',
      primeThumbnail,
      images = [],
      shortDescription,
      content,
      status = 'DRAFT',
    } = body;

    if (!title || !destination || !shortDescription) {
      return NextResponse.json(
        { error: 'Title, destination, and short description are required.' },
        { status: 400 }
      );
    }

    const slug = await generateUniqueSlug(title);
    const readingTime = calculateReadingTime(content || '');
    const coverImage =
      primeThumbnail ||
      (images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80');

    // Run creation + changelog within a transaction
    const [plan, changelog] = await prisma.$transaction([
      prisma.travelPlan.create({
        data: {
          title: title.trim(),
          slug,
          destination: destination.trim(),
          category,
          primeThumbnail: coverImage,
          images: Array.isArray(images) ? images.slice(0, 10) : [],
          shortDescription: shortDescription.trim().slice(0, 300),
          content: content || '',
          readingTime,
          status: status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
        },
      }),
      prisma.changelogEntry.create({
        data: {
          action: 'CREATED',
          packageTitle: title.trim(),
          performedBy: 'Bilawal Abdullah',
        },
      }),
    ]);

    return NextResponse.json({ success: true, plan, changelog }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating travel plan:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create travel plan.' },
      { status: 500 }
    );
  }
}
