import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma, getOrCreateAdminProfile } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profile = await getOrCreateAdminProfile();
    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    console.error('Error fetching admin profile:', error);
    return NextResponse.json({ error: 'Failed to fetch admin profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, description, avatarUrl } = body;

    const profile = await prisma.adminProfile.upsert({
      where: { id: 'singleton' },
      update: {
        ...(name !== undefined ? { name: name.trim() } : {}),
        ...(phone !== undefined ? { phone: phone.trim() } : {}),
        ...(description !== undefined ? { description: description.trim().slice(0, 300) } : {}),
        ...(avatarUrl !== undefined ? { avatarUrl } : {}),
      },
      create: {
        id: 'singleton',
        name: name ? name.trim() : 'Bilawal Abdullah',
        phone: phone ? phone.trim() : '+1 (555) 019-2834',
        description: description
          ? description.trim().slice(0, 300)
          : 'Travel photographer, storyteller, and explorer sharing honest advice and bespoke itineraries.',
        avatarUrl:
          avatarUrl ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
    });

    try {
      revalidatePath('/about');
      revalidatePath('/contact');
      revalidatePath('/');
      revalidatePath('/visas');
      revalidatePath('/visas/[slug]', 'page');
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    console.error('Error updating admin profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update admin profile' },
      { status: 500 }
    );
  }
}
