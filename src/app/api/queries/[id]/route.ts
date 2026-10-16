import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { status } = await request.json();

    if (!['UNREAD', 'IN_PROGRESS', 'RESOLVED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid query status.' }, { status: 400 });
    }

    const query = await prisma.query.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, query });
  } catch (error: any) {
    console.error('Error updating query status:', error);
    return NextResponse.json({ error: 'Failed to update query status.' }, { status: 500 });
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

    await prisma.query.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Query deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting query:', error);
    return NextResponse.json({ error: 'Failed to delete query.' }, { status: 500 });
  }
}
