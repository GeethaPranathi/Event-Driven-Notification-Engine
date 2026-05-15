import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Users
  const user1 = await prisma.user.upsert({
    where: { email: 'rahul.shah@example.com' },
    update: {},
    create: {
      id: uuidv4(),
      email: 'rahul.shah@example.com',
      phone: '+919876543210',
      name: 'Rahul Shah',
      language: 'hi',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'ananya.m@example.com' },
    update: {},
    create: {
      id: uuidv4(),
      email: 'ananya.m@example.com',
      phone: '+919988776655',
      name: 'Ananya Mishra',
      language: 'en',
    },
  });

  // Create Preferences
  await prisma.userPreference.createMany({
    data: [
      {
        userId: user1.id,
        eventCategory: 'TXNX',
        channel: 'sms',
        enabled: true,
      },
      {
        userId: user1.id,
        eventCategory: 'RISK',
        channel: 'push',
        enabled: true,
      },
      {
        userId: user2.id,
        eventCategory: 'TXNX',
        channel: 'email',
        enabled: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
