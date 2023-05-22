import { PrismaClient as AuthClient } from "./auth-client";
import { PrismaClient as BackendClient } from "./backend-client";
import { PrismaClient as MultitenancyClient } from "./multitenancy-client";

const authClient = new AuthClient();
const backendClient = new BackendClient();
const multitenancyClient = new MultitenancyClient();

type CreateSite = {
  id: number,
  tenantId: number,
  name: string,
  location: string,
  lat: number,
  lng: number,
  ip: string,
  attributes?: Record<string, string | number | boolean>
}

const sites: CreateSite[] = [
  {
    id: 1,
    name: 'site 001',
    location: 'location 001',
    lat: 33.66827563569613,
    lng: 32.0194220494259,
    ip: 'www.google.com',
    tenantId: 1,
    attributes: {
      key1: "value 1",
      key2: "value 3",
    }
  },
  {
    id: 2,
    name: 'site 002',
    location: 'location 002',
    lat: 34.64780671836041,
    lng: 36.6652237647074,
    ip: 'www.google.com',
    tenantId: 1,
    attributes: {
      key1: "value 2",
      key2: "value 5",
    }
  },
  {
    id: 3,
    name: 'site 003',
    location: 'location 003',
    lat: 26.32309496643186,
    lng: 27.12966250105811,
    ip: 'www.google.com',
    tenantId: 1
  },
  {
    id: 4,
    name: 'site 004',
    location: 'location 004',
    lat: 37.19851058594345,
    lng: 28.24925884176564,
    ip: 'www.google.com',
    tenantId: 1
  }
]



async function main() {
  const datwyler = await multitenancyClient.tenant.findUnique({
    where: { id: 2 },
    include: { children: true }
  })
  console.log(datwyler);

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
