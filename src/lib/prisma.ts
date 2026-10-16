import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * Ensures the singleton AdminProfile row exists in the database.
 */
export async function getOrCreateAdminProfile() {
  try {
    const profile = await prisma.adminProfile.upsert({
      where: { id: 'singleton' },
      update: {},
      create: {
        id: 'singleton',
        name: 'Bilawal Abdullah',
        phone: '+1 (555) 019-2834',
        description:
          'Travel photographer, storyteller, and explorer sharing honest advice and bespoke itineraries.',
        avatarUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
    });
    return profile;
  } catch (error) {
    console.error('Failed to get or create admin profile:', error);
    // Return default in-memory fallback if DB connection is unavailable during build/offline testing
    return {
      id: 'singleton',
      name: 'Bilawal Abdullah',
      phone: '+1 (555) 019-2834',
      description:
        'Travel photographer, storyteller, and explorer sharing honest advice and bespoke itineraries.',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      updatedAt: new Date(),
    };
  }
}
