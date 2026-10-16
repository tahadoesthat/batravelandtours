import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial database state...');

  // 1. Upsert Admin Profile
  await prisma.adminProfile.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      name: 'Bilawal Abdullah',
      phone: '+1 (555) 019-2834',
      description:
        'Travel photographer, storyteller, and explorer sharing honest advice, boutique expedition notes, and bespoke itineraries.',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  });

  console.log('Admin profile ensured.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
