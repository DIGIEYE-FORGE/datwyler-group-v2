import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateDashbordAlertsDto, UpdateDashbordAlertsDto } from './entities';

@Injectable()
export class DashbordAlertsService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.dashbordAlert.count({
      where: options.where,
    });
    if (totalResult == 0) {
      const data = await this.prisma.dashbordAlert.upsert({
        where: {
          userId_tenantId: {
            userId: options?.where?.userId || 1,
            tenantId: options?.where?.tenantId || 1,
          },
        },
        update: {},
        create: {
          userId: options?.where?.userId || 1,
          tenantId: options?.where?.tenantId || 1,
          data: options?.where?.data || [],
        },
      });
      return { totalResult: 1, results: [data] };
    }
    const results = await this.prisma.dashbordAlert.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.dashbordAlert.findUnique({
      where: { id },
      ...query,
    });
  }

  @HandleRequestErrors()
  async create(data: CreateDashbordAlertsDto) {
    return await this.prisma.dashbordAlert.create({
      data: {
        userId: data.userId,
        tenantId: data.tenantId,
        data: data.data,
      },
    });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateDashbordAlertsDto) {
    return await this.prisma.dashbordAlert.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.dashbordAlert.delete({ where: { id } });
  }

  @FindAllOptions({})
  @HandleRequestErrors()
  async GetAccountDashbordeAlerts(where: { userId: number; tenantId: number }) {
    {
      const results = {};
      const data = await this.prisma.dashbordAlert.findMany({
        where: {
          userId: where?.userId,
          tenantId: where?.tenantId,
        },
      });
      const res = data?.[0]?.data as any[];
      const alertType = res?.map((item) => item.alertType);
      for (let i = 0; i < alertType?.length; i++) {
        const count = await this.prisma.alert.count({
          where: {
            type: alertType[i],
            device: {
              tenantId: where?.tenantId || 0,
            },
            acknowledgedBy: null,
          },
        });
        results[alertType[i]] = count;
      }
      return results;
    }
  }
}
