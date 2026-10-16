import { NextResponse } from 'next/server';
import { uploadMediaFile } from '@/lib/s3';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalFilename = (file as File).name || 'uploaded_image.jpg';
    const mimeType = file.type || 'image/jpeg';

    const result = await uploadMediaFile(buffer, originalFilename, mimeType);

    return NextResponse.json({
      success: true,
      url: result.url,
      filename: result.filename,
      size: result.size,
      mimeType: result.mimeType,
    });
  } catch (error: any) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image.' },
      { status: 500 }
    );
  }
}
