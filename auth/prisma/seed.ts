import { PrismaClient, User } from "@prisma/client";
import { hashPassword } from "../src/common";
import logger from "../src/common/logger";
const prisma = new PrismaClient();

type CreateUser = {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
};

const users: CreateUser[] = [
  {
    id: 1,
    email: "oussamajamil@gmail.com",
    password: "12345678",
    firstName: "oussama",
    lastName: "jamil",
    phoneNumber: "0682712855",
  },
  {
    id: 2,
    email: "iseljao@gmail.com",
    password: "12345678",
    firstName: "issam",
    lastName: "el jaouhary",
    phoneNumber: "0682712855",
  },
  {
    id: 3,
    email: "yassinouraq@gmail.com",
    password: "12345678",
    firstName: "yassin",
    lastName: "ouraq",
    phoneNumber: "0682712855",
  },
  {
    id: 4,
    email: "ismailsalam@gmail.com",
    password: "12345678",
    firstName: "ismail",
    lastName: "salam",
    phoneNumber: "0682712855",
  },
];

async function seedUsers() {
  return Promise.all(
    users.map(async (user) => {
      const hashedPassword = await hashPassword(user.password);
      const newUser = await prisma.user.upsert({
        where: {
          id: user.id,
        },
        update: {},
        create: {
          ...user,
          password: hashedPassword,
        },
      });
      logger.info(`Created user with id: ${newUser.id}`);
      return newUser;
    })
  );
}

async function main() {
  await prisma.$connect();
  const result = await seedUsers();
  console.log(result);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
