import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@demo.local',
      password: 'admin123', // ⚠️ luego se cambiará por hash bcrypt
      role: 'ADMIN',
    },
  });

  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
