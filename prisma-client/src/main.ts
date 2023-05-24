import { PrismaClient as AuthClient } from "./auth-client";
import { PrismaClient as BackendClient } from "./backend-client";
import { PrismaClient as MultitenancyClient, Role, Tenant } from "./multitenancy-client";
import { genSalt, hash } from "bcrypt";

const authClient = new AuthClient();
const backendClient = new BackendClient();
const multitenancyClient = new MultitenancyClient();


type CreateUser = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
};

type CreateTenant = {
  id: number;
  name: string;
  users: {
    id: number;
    role: Role;
  }
}

type CreateGroup = {
  id?: number;
  name: string;
  tenantId: number;
  location: string;
  lat: number;
  lng: number;
  ip: string;
}

const usersSeed: CreateUser[] = [
  {
    id: 1,
    email: "iseljao@gmail.com",
    password: "12345678",
    firstName: "isel",
    lastName: "jao",
    phoneNumber: "0682712855",
  },
];

const tenantsSeed: CreateTenant[] = [
  {
    id: 1,
    name: "dig-forge",
    users: {
      id: 1,
      role: "ADMIN",
    }
  },
];

type CreateDevice = {
  name: string;
  tenantId: number;
  description: string;
  serial: string;
}


type CreateAlert = {

}

const systems = [
  "HVAC",
  "CCTV",
  "PABX",
  "Fire Alarm",
  "Access Control",
  "Cooling",
  "Public Address",
  "UPS",
]

const descriptions = [
  "HVAC (Heating, Ventilation, and Air Conditioning): HVAC systems are designed to control the temperature, humidity, and air quality within a building or confined space. They provide heating, cooling, and ventilation to maintain a comfortable environment.",
  "CCTV (Closed Circuit Television): CCTV systems are used to monitor and record video footage of a property or building. They are often used for security purposes, but can also be used to monitor traffic flow or other activities.",
  "PABX (Private Automatic Branch Exchange): PABX systems are used to connect multiple phone lines within a building or office. They allow users to make calls between extensions without having to dial an outside number.",
  "Fire Alarm: Fire alarm systems are designed to detect smoke or fire and alert occupants of a building. They can be used to notify the fire department, activate sprinkler systems, or sound an alarm.",
  "Access Control: Access control systems are used to restrict access to a building or area. They can be used to control who enters a building, or to restrict access to certain areas within a building.",
  "Cooling: Cooling systems are used to maintain a comfortable temperature within a building or confined space. They can be used to cool the air, or to remove heat from a space.",
  "Public Address: Public address systems are used to broadcast announcements or music throughout a building or area. They can be used to make announcements in a school, or to play music in a store.",
  "UPS (Uninterruptible Power Supply): UPS systems are used to provide backup power in the event of a power outage. They can be used to keep critical systems running, or to provide power for emergency lighting.",
]



const sites: CreateGroup[] = [
  {
    id: 1,
    name: "morroco site",
    tenantId: 1,
    // morroco info
    location: "Morocco",
    lat: 31.791702,
    lng: -7.092620,
    ip: "www.google.com",
  },
  {
    id: 2,
    name: "ksa site",
    tenantId: 1,
    // france info
    location: "Saudi Arabia",
    lat: 23.885942,
    lng: 45.079162,
    ip: "www.google.com",
  },
  {
    id: 3,
    name: "uae site",
    tenantId: 1,
    // uea info
    location: "United Arab Emirates",
    lat: 23.424076,
    lng: 53.847818,
    ip: "www.google.com",
  },
]

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

async function seedUsers() {
  return Promise.all(
    usersSeed.map(async (user) => {
      const hashedPassword = await hashPassword(user.password);
      const newUser = await authClient.user.upsert({
        where: {
          id: user.id,
        },
        update: {},
        create: {
          ...user,
          password: hashedPassword,
        },
      });
      console.log();
      (`Created user with id: ${newUser.id}`);
      return newUser;
    })
  );
}

async function seedDevices() {
  return Promise.all(
    systems.map(async (system, i) => backendClient.device.create({
      data: {
        id: i + 1,
        name: system,
        serial: `serial-${(i + 1).toString().padStart(4, '0')}`,
        tenantId: 1,
        groupId: Math.floor(Math.random() * 3) + 1,
        description: descriptions[i],
        alerts: {
          createMany: {
            data: Array.from({ length: 10 }, () => ({
              type: ["TEMPERATURE", "HUMIDITY", "POWER", "PRESSURE", "VOLTAGE", "CURRENT"][Math.floor(Math.random() * 6)],
              level: ["CRITICAL", "WARNING", "INFO"][Math.floor(Math.random() * 3)],
              message: ["Temperature is too high", "Humidity is too high", "Power is too high", "Pressure is too high", "Voltage is too high", "Current is too high"][Math.floor(Math.random() * 6)],
            }))
          }
        },
        lastTelemetries: {
          createMany: {
            data: Array.from({ length: 4 }, (_v, i) => ({
              name: ["TEMPERATURE", "HUMIDITY", "POWER", "PRESSURE", "VOLTAGE", "CURRENT"][i],
              value: Math.floor(Math.random() * 100),
            }))
          }
        }
      }
    }))
  )
}


async function seedTenants() {
  return Promise.all(
    tenantsSeed.map(async (tenant) => {
      return await multitenancyClient.tenant.create({
        data: {
          id: tenant.id,
          name: tenant.name,
          users: {
            createMany: {
              data: tenant.users
            }
          }
        }
      });
    })
  );
}

async function seedSites() {
  return Promise.all(
    sites.map(async (site) => {
      return await backendClient.group.create({
        data: site
      });
    })
  );
}


async function freshStart() {
  await authClient.user.deleteMany({});
  await multitenancyClient.user.deleteMany({});
  await multitenancyClient.tenant.deleteMany({});
  await backendClient.alert.deleteMany({});
  await backendClient.lastTelemetry.deleteMany({});
  await backendClient.device.deleteMany({});
  await backendClient.group.deleteMany({});
  const users = await seedUsers();
  const tenants = await seedTenants();
  const sites = await seedSites();
  const devices = await seedDevices();
  console.log({ users, tenants, sites, devices });

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
