import { PrismaClient, TypeCredential } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const protocols = ['HTTP', 'MQTT', 'COAP'];
const groups = [
  {
    id: 1,
    name: 'Group 1',
    type: 'PUBLIC',
  },
  {
    id: 2,
    name: 'Group 2',
    type: 'PRIVATE',
  },
  {
    id: 3,
    name: 'Group 3',
    type: 'PUBLIC',
  },
];

// model DeviceProfile {
//   id              Int @id @default (autoincrement())
//   name            String @unique @db.VarChar(50)
//   description     String ?         @db.VarChar(255)
//   logo            String ?         @db.VarChar(255)
//   cridentialsType TypeCredential ? @map("cridentials_type")
//   deviceType      DeviceType ?     @relation(fields: [deviceTypeId], references: [id])
//   deviceTypeId    Int ?            @map("device_type_id")
//   createdAt       DateTime @default (now()) @map("created_at")
//   updatedAt       DateTime @updatedAt @map("updated_at")
//   devices         Device[]
//   protocol        Protocol ?       @relation(fields: [protocolId], references: [id])
//   protocolId      Int ?
//     decoder         Decoder ?        @relation(fields: [decoderId], references: [id])
//   decoderId       Int ?
//     attributes      Json ?

//   @@map("device_profiles")
// }

type CreateDeviceTypeInput = {
  id?: number;
  name: string;
};

type CreateDeviceProfileInput = {
  id?: number;
  name: string;
  description?: string;
  logo?: string;
  cridentialsType?: TypeCredential;
  deviceTypeId?: number;
  protocolId?: number;
  decoderId?: number;
  attributes?: any;
};

const deviceTypes: CreateDeviceTypeInput[] = [
  {
    id: 1,
    name: 'GPS',
  },
  {
    id: 2,
    name: 'WEATHER',
  },
  {
    id: 3,
    name: 'CO2Meter',
  },
];

const deviceProfiles: CreateDeviceProfileInput[] = [
  {
    id: 1,
    name: 'GPS',
    description: 'GPS',
    cridentialsType: 'TOKEN',
    deviceTypeId: 1,
  },
  {
    id: 2,
    name: 'WEATHER',
    description: 'WEATHER',
    cridentialsType: 'TOKEN',
    deviceTypeId: 2,
  },
  {
    id: 3,
    name: 'CO2Meter',
    description: 'CO2Meter',
    cridentialsType: 'TOKEN',
    deviceTypeId: 3,
  },
];

async function main() {
  if (process.env.NODE_ENV === 'development') {
    // await prisma.deviceType.deleteMany();
    await seedDeviceTypes();
    await seedDeviceProfiles();
  }
}

main();

async function seedDeviceTypes() {
  try {
    // const res = await prisma.deviceType.createMany({
    //   data: deviceTypes,
    //   skipDuplicates: true,
    // });
    const res = await Promise.all(
      deviceTypes.map(async (deviceType) => {
        return await prisma.deviceType.upsert({
          where: {
            id: deviceType.id,
          },
          update: {
            name: deviceType.name,
          },
          create: {
            name: deviceType.name,
          },
        });
      }),
    );
    console.log('Device Types: ', res);
  } catch (e) {
    console.log(e);
  }
}

async function seedDeviceProfiles() {
  try {
    const res = await Promise.all(
      deviceProfiles.map(async (deviceProfile) => {
        return await prisma.deviceProfile.upsert({
          where: {
            id: deviceProfile.id,
          },
          update: {
            name: deviceProfile.name,
            description: deviceProfile.description,
            cridentialsType: deviceProfile.cridentialsType,
            deviceTypeId: deviceProfile.deviceTypeId,
          },
          create: {
            name: deviceProfile.name,
            description: deviceProfile.description,
            cridentialsType: deviceProfile.cridentialsType,
            deviceTypeId: deviceProfile.deviceTypeId,
          },
        });
      }),
    );
    console.log('Device Profiles: ', res);
  } catch (e) {
    console.log(e);
  }
}
