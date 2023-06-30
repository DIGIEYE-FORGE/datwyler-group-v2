import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardHistory(query: { where?: string }) {
    const { groupId, startDate } = JSON.parse(query.where);
    const devices = await this.prisma.device.findMany({
      where: {
        groupId,
        name: 'TEMPERATURE AND HUMIDITY',
      },
    });
    return await Promise.all(
      devices.map(async (device) => {
        const temperature = await this.prisma.history.findMany({
          where: {
            deviceId: 2,
            name: 'TEMPERATURE',
            createdAt: { gte: startDate },
          },
          orderBy: {
            createdAt: 'asc',
          },
        });
        const humidity = await this.prisma.history.findMany({
          where: {
            deviceId: device.id,
            name: 'HUMIDITY',
            createdAt: { gte: startDate },
          },
          orderBy: {
            createdAt: 'asc',
          },
        });
        return {
          ...device,
          temperature,
          humidity,
        };
      }),
    );
  }

  async findAll(query: { where?: string }) {
    const where = query?.where ? JSON.parse(query.where) : {};
    console.log('find all', where);
    const totalDevices = await this.prisma.device.count({
      where: {
        ...where,
      },
    });
    const onlineDevices = await this.prisma.device.count({
      where: {
        lastTelemetries: {
          some: {
            updatedAt: {
              gte: new Date(Date.now() - 60 * 1000),
            },
          },
        },
        ...where,
      },
    });
    const criticalAlarms = await this.prisma.alert.count({
      where: {
        level: 'Critical',
        acknowledgedBy: null,
        device: {
          ...where,
        },
      },
    });
    const waterLeakAlarms = await this.prisma.alert.count({
      where: {
        type: 'Water Leakage',
        acknowledgedBy: null,
        device: {
          ...where,
        },
      },
    });
    const doorAlarms = await this.prisma.alert.count({
      where: {
        type: 'Door',
        acknowledgedBy: null,
        device: {
          ...where,
        },
      },
    });
    const smokeAlarms = await this.prisma.alert.count({
      where: {
        type: 'Smoke',
        acknowledgedBy: null,
        device: {
          ...where,
        },
      },
    });
    const upsAlarms = await this.prisma.alert.findMany({
      take: 10000,
      where: {
        device: { name: 'UPS', ...where },
        acknowledgedBy: null,
      },
    });
    const coolingUnitAlarms = await this.prisma.alert.findMany({
      take: 10000,
      where: {
        device: { name: 'COOLING UNIT', ...where },
        acknowledgedBy: null,
      },
    });

    return {
      devices: {
        total: totalDevices,
        online: onlineDevices,
      },
      criticalAlarms,
      waterLeakAlarms,
      doorAlarms,
      smokeAlarms,
      upsAlarms,
      coolingUnitAlarms,
    };
  }
}
