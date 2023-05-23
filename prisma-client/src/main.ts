import { PrismaClient as AuthClient } from "./auth-client";
import { PrismaClient as BackendClient } from "./backend-client";
import { PrismaClient as MultitenancyClient, Role, Tenant } from "./multitenancy-client";

const authClient = new AuthClient();
const backendClient = new BackendClient();
const multitenancyClient = new MultitenancyClient();




async function main() {
  const datwyler1 = await multitenancyClient.tenant.update({
    where: { id: 4 },
    include: { users: true },
    data: {
      users: {
        createMany: {
          data: [
            { id: 9, role: Role.ADMIN },
            { id: 10, role: Role.USER },
            { id: 11, role: Role.USER },
            { id: 12, role: Role.USER },
          ]
        }
      }
    }
  });
  console.log(datwyler1);


}

main()
  .then(async () => {
    await authClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await authClient.$disconnect();
    process.exit(1);
  });
