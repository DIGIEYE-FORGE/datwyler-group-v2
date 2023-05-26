import { PrismaClient as AuthClient } from "./auth-client";
import { PrismaClient as BackendClient } from "./backend-client";
import {
  PrismaClient as MultitenancyClient,
  Role,
  Tenant,
} from "./multitenancy-client";
import { genSalt, hash } from "bcrypt";
import { systems, alarmsMap } from "./utils";
const authClient = new AuthClient();
const backendClient = new BackendClient();
const multitenancyClient = new MultitenancyClient();

type CreateUser = {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
};

type CreateTenant = {
  id?: number;
  name: string;
};

type CreateGroup = {
  name: string;
  location: string;
  lat: number;
  lng: number;
  ip: string;
};

type CreateDevice = {
  name: string;
  tenantId: number;
  description: string;
  serial: string;
};

const defaulUser: CreateUser = {
  email: "iseljao@gmail.com",
  password: "12345678",
  firstName: "isel",
  lastName: "jao",
  phoneNumber: "0682712855",
};

const defaulTenant: CreateTenant = {
  name: "dig-forge",
};

const descriptions = [
  "HVAC (Heating, Ventilation, and Air Conditioning): HVAC systems are designed to control the temperature, humidity, and air quality within a building or confined space. They provide heating, cooling, and ventilation to maintain a comfortable environment.",
  "CCTV (Closed Circuit Television): CCTV systems are used to monitor and record video footage of a property or building. They are often used for security purposes, but can also be used to monitor traffic flow or other activities.",
  "PABX (Private Automatic Branch Exchange): PABX systems are used to connect multiple phone lines within a building or office. They allow users to make calls between extensions without having to dial an outside number.",
  "Fire Alarm: Fire alarm systems are designed to detect smoke or fire and alert occupants of a building. They can be used to notify the fire department, activate sprinkler systems, or sound an alarm.",
  "Access Control: Access control systems are used to restrict access to a building or area. They can be used to control who enters a building, or to restrict access to certain areas within a building.",
  "Cooling: Cooling systems are used to maintain a comfortable temperature within a building or confined space. They can be used to cool the air, or to remove heat from a space.",
  "Public Address: Public address systems are used to broadcast announcements or music throughout a building or area. They can be used to make announcements in a school, or to play music in a store.",
  "UPS (Uninterruptible Power Supply): UPS systems are used to provide backup power in the event of a power outage. They can be used to keep critical systems running, or to provide power for emergency lighting.",
];

const sites: CreateGroup[] = [
  {
    name: "morroco site",
    // morroco info
    location: "Morocco",
    lat: 31.791702,
    lng: -7.09262,
    ip: "www.google.com",
  },
  {
    name: "ksa site",
    // france info
    location: "Saudi Arabia",
    lat: 23.885942,
    lng: 45.079162,
    ip: "www.google.com",
  },
  {
    name: "uae site",
    // uea info
    location: "United Arab Emirates",
    lat: 23.424076,
    lng: 53.847818,
    ip: "www.google.com",
  },
];

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

async function initUser() {
  return await authClient.user.create({
    data: { ...defaulUser, password: await hashPassword(defaulUser.password) },
  });
}

async function seedDevices({
  tenantId,
  groupIds,
}: {
  tenantId: number;
  groupIds: number[];
}) {
  return Promise.all(
    [...systems].map(async (system, i) =>
      backendClient.device.create({
        data: {
          id: i + 1,
          name: system,
          serial: `serial-${(i + 1).toString().padStart(4, "0")}`,
          tenantId,
          groupId: groupIds[Math.floor(Math.random() * groupIds.length)],
          description: descriptions[i],
          alerts: {
            createMany: {
              data: Object.entries(alarmsMap[system]).map(([type, level]) => ({
                type,
                level,
                message: `This is a ${level} alarm for ${type}`,
              })),
            },
          },
          lastTelemetries: {
            createMany: {
              data: Array.from({ length: 4 }, (_v, i) => ({
                name: [
                  "TEMPERATURE",
                  "HUMIDITY",
                  "POWER",
                  "PRESSURE",
                  "VOLTAGE",
                  "CURRENT",
                ][i],
                value: Math.floor(Math.random() * 100),
              })),
            },
          },
        },
      })
    )
  );
}

async function initTenant(userId: number) {
  return await multitenancyClient.tenant.create({
    data: {
      name: defaulTenant.name,
      users: {
        create: {
          id: userId,
          role: "ADMIN",
        },
      },
    },
  });
}

async function seedSites(tenantId: number) {
  return Promise.all(
    sites.map(async (site) => {
      return await backendClient.group.create({
        data: {
          tenantId,
          ...site,
        },
      });
    })
  );
}


async function createAlert({ serial, data }) {
  return await backendClient.alert.create({
    data: {
      device: {
        connect: {
          serial,
        },
      },
      level: data.level,
      type: data.type,
      message: data.message,
    },
  });
}

async function freshStart() {
  await authClient.user.deleteMany({});
  await multitenancyClient.user.deleteMany({});
  await multitenancyClient.tenant.deleteMany({});
  await backendClient.alert.deleteMany({});
  await backendClient.lastTelemetry.deleteMany({});
  await backendClient.device.deleteMany({});
  await backendClient.group.deleteMany({});
  const user = await initUser();
  const tenant = await initTenant(user.id);
  const sites = await seedSites(tenant.id);
  const devices = await seedDevices({
    tenantId: tenant.id,
    groupIds: sites.map((site) => site.id),
  });
  console.log({ user, tenant, sites, devices });
}

async function main() {
  freshStart();
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
