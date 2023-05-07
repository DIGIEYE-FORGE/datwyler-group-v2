const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addLastTelemetries(serial, telemetries) {
  const device = await prisma.device.findUnique({ where: { serial } });
  if (!device) {
    throw new Error('Device not found');
  }
  return await prisma.device.update({
    where: { serial },
    data: {
      lastTelemetries: {
        upsert: Object.entries(telemetries).map(([key, value]) => ({
          where: {
            deviceId_name: {
              deviceId: device.id,
              name: key,
            },
          },
          update: {
            value,
          },
          create: {
            name: key,
            value,
          },
        })),
      },
    },
  });
}

async function addAlert(alert) {
  const { serial, ...data } = alert;
  const device = await prisma.device.update({
    where: { serial: alert.serial },
    data: {
      alerts: { create: data },
    },
  });
  if (!device) {
    throw new Error('Device not found');
  }
  return device;
}

const telemetries = {
  carbonDioxide: '1000',
  temperature: '2000',
  pression: '3000',
};

const alert = {
  serial: '123456789',
  level: 'warning',
  meaning: 'low battery',
  startTime: new Date(),
  endTime: new Date(),
};

const upSertDevice = async (serial) => {
  return await prisma.device.upsert({
    where: { serial },
    update: {},
    create: {
      serial,
      name: serial,
    },
  });
};

const serials = [
  '123456789',
  '987654321',
  '123456789',
  '987654321',
  '123456789',
  '987654321',
  '123456789',
  '987654321',
  '123456789',
  '987654321',
  '123456789',
  '987654321',
];

async function main() {
  for (const serial of serials) {
    await upSertDevice(serial);
    await addLastTelemetries(serial, telemetries);
    await addAlert({ ...alert, serial });
  }
}

main();
