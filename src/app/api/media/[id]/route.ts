import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return new NextResponse('Media ID missing', { status: 400 });
    }

    const media = await prisma.mediaFile.findUnique({
      where: { id },
    });

    if (!media) {
      return new NextResponse('Media file not found', { status: 404 });
    }

    // Return binary buffer with appropriate Content-Type and browser caching headers
    return new NextResponse(new Uint8Array(media.data), {
      status: 200,
      headers: {
        'Content-Type': media.mimeType || 'image/jpeg',
        'Content-Length': media.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('Error serving media file:', error);
    return new NextResponse('Failed to load media file', { status: 500 });
  }
}
