import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }
  async findAll(query: { where?: string }) {
    const where = query?.where ? JSON.parse(query.where) : {};
    console.log(where);
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
      where: {
        device: { name: 'UPS', ...where },
        acknowledgedBy: null,
      },
    });
    const coolingUnitAlarms = await this.prisma.alert.findMany({
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
