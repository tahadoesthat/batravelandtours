import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateUniqueSlug } from '@/lib/slugify';
import { calculateReadingTime } from '@/lib/utils';
import { getAdminSession } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const plan = await prisma.travelPlan.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Travel plan not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    console.error('Error fetching travel plan:', error);
    return NextResponse.json({ error: 'Failed to fetch travel plan.' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    const existing = await prisma.travelPlan.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Travel plan not found.' }, { status: 404 });
    }

    const {
      title,
      destination,
      category,
      primeThumbnail,
      images,
      shortDescription,
      content,
      status,
    } = body;

    let newSlug = existing.slug;
    if (title && title.trim() !== existing.title) {
      newSlug = await generateUniqueSlug(title.trim(), existing.id);
    }

    const updatedReadingTime =
      content !== undefined ? calculateReadingTime(content) : existing.readingTime;

    const [updatedPlan, changelog] = await prisma.$transaction([
      prisma.travelPlan.update({
        where: { id },
        data: {
          title: title ? title.trim() : existing.title,
          slug: newSlug,
          destination: destination ? destination.trim() : existing.destination,
          category: category || existing.category,
          primeThumbnail: primeThumbnail || existing.primeThumbnail,
          images: Array.isArray(images) ? images.slice(0, 10) : existing.images,
          shortDescription:
            shortDescription !== undefined
              ? shortDescription.trim().slice(0, 300)
              : existing.shortDescription,
          content: content !== undefined ? content : existing.content,
          readingTime: updatedReadingTime,
          status: status ? (status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT') : existing.status,
        },
      }),
      prisma.changelogEntry.create({
        data: {
          action: 'UPDATED',
          packageTitle: title ? title.trim() : existing.title,
          performedBy: 'Bilawal Abdullah',
        },
      }),
    ]);

    return NextResponse.json({ success: true, plan: updatedPlan, changelog });
  } catch (error: any) {
    console.error('Error updating travel plan:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update travel plan.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const existing = await prisma.travelPlan.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Travel plan not found.' }, { status: 404 });
    }

    const [deletedPlan, changelog] = await prisma.$transaction([
      prisma.travelPlan.delete({
        where: { id },
      }),
      prisma.changelogEntry.create({
        data: {
          action: 'DELETED',
          packageTitle: existing.title,
          performedBy: 'Bilawal Abdullah',
        },
      }),
    ]);

    return NextResponse.json({ success: true, deletedPlan, changelog });
  } catch (error: any) {
    console.error('Error deleting travel plan:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete travel plan.' },
      { status: 500 }
    );
  }
}
