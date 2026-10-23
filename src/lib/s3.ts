import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs/promises';
import path from 'path';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function isS3Configured(): boolean {
  return Boolean(
    process.env.AWS_S3_BUCKET_NAME &&
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_REGION
  );
}

function getS3Client(): S3Client {
  const config: {
    region: string;
    credentials: {
      accessKeyId: string;
      secretAccessKey: string;
    };
    endpoint?: string;
  } = {
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  };

  if (process.env.AWS_ENDPOINT) {
    config.endpoint = process.env.AWS_ENDPOINT;
  }

  return new S3Client(config);
}

export interface UploadResult {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

/**
 * Uploads a file buffer either to AWS S3 or to local /public/uploads as fallback.
 */
export async function uploadMediaFile(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<UploadResult> {
  // 1. Validation
  if (!ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase())) {
    throw new Error('Invalid file type. Only JPG, PNG, and WebP are allowed.');
  }

  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error('File exceeds maximum size of 10MB.');
  }

  // Generate safe unique filename
  const ext = path.extname(originalFilename).toLowerCase() || `.${mimeType.split('/')[1]}`;
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const cleanBase = path
    .basename(originalFilename, ext)
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 30);
  const filename = `${cleanBase}_${timestamp}_${randomStr}${ext}`;

  // 2. Upload to S3 if configured
  if (isS3Configured()) {
    const s3 = getS3Client();
    const bucket = process.env.AWS_S3_BUCKET_NAME!;
    const key = `uploads/${filename}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      })
    );

    // Format public URL
    const publicUrl = process.env.AWS_ENDPOINT
      ? `${process.env.AWS_ENDPOINT}/${bucket}/${key}`
      : `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return {
      url: publicUrl,
      filename,
      size: buffer.length,
      mimeType,
    };
  }

  // 3. Robust Serverless Fallback: Save to PostgreSQL MediaFile table and return clean URL /api/media/{id}
  try {
    const { prisma } = await import('@/lib/prisma');
    const media = await prisma.mediaFile.create({
      data: {
        filename,
        mimeType,
        data: buffer,
        size: buffer.length,
      },
    });

    return {
      url: `/api/media/${media.id}`,
      filename,
      size: buffer.length,
      mimeType,
    };
  } catch (dbError: any) {
    console.warn('MediaFile DB save error, attempting base64 fallback:', dbError?.message);
    const base64 = buffer.toString('base64');
    return {
      url: `data:${mimeType};base64,${base64}`,
      filename,
      size: buffer.length,
      mimeType,
    };
  }
}

export { ALLOWED_MIME_TYPES, MAX_FILE_SIZE };
