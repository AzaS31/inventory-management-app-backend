// prisma/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding roles...');
  
  // Создание базовых ролей
  // Важно: ID 1 будет использоваться как дефолтный для новых пользователей
  const roles = [
    { id: 1, name: 'CREATOR' }, // Роль по умолчанию для всех зарегистрированных
    { id: 2, name: 'ADMIN' },
    { id: 3, name: 'GUEST' }, // Можно использовать для неаутентифицированных (хотя это логика middleware)
  ];

  for (const roleData of roles) {
    await prisma.role.upsert({
      where: { id: roleData.id },
      update: {}, // Не обновляем, если существует
      create: roleData,
    });
    console.log(`Created or updated role: ${roleData.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });