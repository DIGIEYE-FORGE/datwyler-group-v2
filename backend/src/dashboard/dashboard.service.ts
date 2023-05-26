import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }
  async findAll() {
    const totalDevices = await this.prisma.device.count();
    const onlineDevices = await this.prisma.device.count({
      where: {
        updatedAt: {
          gte: new Date(Date.now() - 60 * 1000),
        },
      },
    });
    const criticalAlarms = await this.prisma.alert.count({
      where: { level: 'Critical', acknowledgedBy: null },
    });
    const waterLeakAlarms = await this.prisma.alert.count({
      where: { type: 'Water Leakage', acknowledgedBy: null },
    });
    const doorAlarms = await this.prisma.alert.count({
      where: { type: 'Door', acknowledgedBy: null },
    });
    const smokeAlarms = await this.prisma.alert.count({
      where: { type: 'Smoke', acknowledgedBy: null },
    });
    const upsAlarms = await this.prisma.alert.findMany({
      where: { device: { name: 'UPS' }, acknowledgedBy: null },
    });
    const coolingUnitAlarms = await this.prisma.alert.findMany({
      where: { device: { name: 'COOLING UNIT' }, acknowledgedBy: null },
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