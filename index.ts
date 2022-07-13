import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  // await prisma.user.create({
  //   data: {
  //     name: 'Rich',
  //     email: 'hello@prisma.com',
  //     posts: {
  //       create: {
  //         title: 'My first post'
  //       },
  //     },
  //   },
  // });

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //   },
  // });
  // console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
