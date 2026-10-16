import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Country code to friendly name lookup
const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  GB: 'United Kingdom',
  AU: 'Australia',
  DE: 'Germany',
  ID: 'Indonesia',
  CA: 'Canada',
  FR: 'France',
  IT: 'Italy',
  JP: 'Japan',
  AE: 'United Arab Emirates',
  PK: 'Pakistan',
  IN: 'India',
  NL: 'Netherlands',
  SG: 'Singapore',
  CH: 'Switzerland',
  ES: 'Spain',
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = body.path || '/';

    const headers = new Headers(request.headers);
    const countryCode =
      headers.get('x-vercel-ip-country') ||
      headers.get('cf-ipcountry') ||
      headers.get('x-country-code') ||
      'US';

    const countryName = COUNTRY_NAMES[countryCode] || countryCode;

    // Optional ipHash
    const ip =
      headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headers.get('x-real-ip') ||
      'local';

    // Simple hash for privacy
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
      hash = (hash << 5) - hash + ip.charCodeAt(i);
      hash |= 0;
    }
    const ipHash = Math.abs(hash).toString(16);

    await prisma.siteVisit.create({
      data: {
        path,
        countryCode: countryCode.toUpperCase(),
        countryName,
        ipHash,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Analytics is non-blocking, return success even if DB is temporarily busy
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
