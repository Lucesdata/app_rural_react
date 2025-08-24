const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@demo.local' },
    update: { password: passwordHash, role: 'ADMIN' },
    create: { name: 'Admin', email: 'admin@demo.local', password: passwordHash, role: 'ADMIN' },
  });
  console.log('Seed OK');
}

main().finally(()=>prisma.$disconnect());
