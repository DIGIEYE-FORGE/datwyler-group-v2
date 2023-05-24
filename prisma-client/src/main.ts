import { PrismaClient as AuthClient } from "./auth-client";
import { PrismaClient as BackendClient } from "./backend-client";
import { PrismaClient as MultitenancyClient, Role, Tenant } from "./multitenancy-client";

const authClient = new AuthClient();
const backendClient = new BackendClient();
const multitenancyClient = new MultitenancyClient();




async function main() {
  const tenant = await multitenancyClient.tenant.create({
    data: {
      name: "digi-forge",
    },
  });
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
