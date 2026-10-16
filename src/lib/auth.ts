import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'bat_admin_session';
const DEFAULT_SECRET = 'super-secret-jwt-key-minimum-32-characters-long-12345';

function getJwtSecret() {
  const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
  return new TextEncoder().encode(secret);
}

export interface AdminSession {
  role: 'admin';
  email: string;
}

/**
 * Creates and signs an admin session token (valid for 7 days)
 */
export async function signAdminToken(email: string): Promise<string> {
  const secret = getJwtSecret();
  return await new SignJWT({ role: 'admin', email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

/**
 * Verifies a given token string
 */
export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    if (payload && payload.role === 'admin' && typeof payload.email === 'string') {
      return {
        role: 'admin',
        email: payload.email,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Retrieves the current admin session from incoming cookies (Server Components / Routes)
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
