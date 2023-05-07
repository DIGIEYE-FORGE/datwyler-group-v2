import { PrismaClient, Tenant, Role } from "@prisma/client";
import logger from "../src/commun/logger";
const prisma = new PrismaClient();

type User = {
  userId: number;
  role: Role;
};

type CreateTenantDto = {
  id: number;
  name: string;
  children?: CreateTenantDto[];
  users?: User[];
};

const digieyTenant: CreateTenantDto = {
  id: 1,
  name: "digi-forge",
  users: [
    {
      userId: 1,
      role: Role.ADMIN,
    },
    {
      userId: 2,
      role: Role.ADMIN,
    },
    {
      userId: 3,
      role: Role.ADMIN,
    },
  ],
  children: [
    {
      id: 2,
      name: "datwyler",
      users: [
        {
          userId: 4,
          role: Role.ADMIN,
        },
      ],
    },
  ],
};

const seedTenant = async (
  data: CreateTenantDto,
  parentId?: number
): Promise<Tenant> => {
  const tenant = await prisma.tenant.create({
    data: {
      id: data.id,
      name: data.name,
      parentId,
      users: data.users
        ? {
            create: data.users.map((user) => ({
              user: {
                connectOrCreate: {
                  where: { id: user.userId },
                  create: { id: user.userId },
                },
              },
              role: user.role,
            })),
          }
        : undefined,
    },

    include: {
      children: true,
      users: true,
    },
  });

  const children = await Promise.all(
    data.children?.map(async (child) => {
      return await seedTenant(child, tenant.id);
    }) ?? []
  );

  tenant.children = children;

  return tenant;
};

async function main() {
  try {
    await prisma.tenant.deleteMany();
    const tenant = await seedTenant(digieyTenant);
    logger.info(
      JSON.stringify(
        tenant,
        (key, value) => {
          if (key === "createdAt" || key === "updatedAt") {
            return undefined;
          }
          return value;
        },
        2
      )
    );
  } catch (e) {
    logger.error(e);
  }
}

main();
