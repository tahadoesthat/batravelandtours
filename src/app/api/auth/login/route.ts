import { NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || 'admin@bilawalabdullah.com';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'bilawal@travels#2026';

    if (
      !email ||
      !password ||
      email.trim().toLowerCase() !== expectedEmail.toLowerCase() ||
      password !== expectedPassword
    ) {
      return NextResponse.json(
        { error: 'Invalid administrator email or password.' },
        { status: 401 }
      );
    }

    const token = await signAdminToken(expectedEmail);

    const response = NextResponse.json({
      success: true,
      email: expectedEmail,
      message: 'Signed in successfully.',
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
