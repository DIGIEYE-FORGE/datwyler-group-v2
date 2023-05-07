import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateAlertDto, UpdateAlertDto } from './entities';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.alert.count({
      where: options.where,
    });
    const results = await this.prisma.alert.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.alert.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateAlertDto) {
    const alert = await this.prisma.alert.create({
      data,
      include: {
        device: {
          select: {
            groupId: true,
          },
        },
      },
    });

    if (alert.device.groupId) {
      const group = await this.prisma.group.findUnique({
        where: { id: alert.device.groupId },
      });
      console.log(group);
      const attributes: any = group.attributes || {};
      await this.prisma.group.update({
        where: { id: group.id },
        data: {
          attributes: {
            ...attributes,
            alerts: (parseInt(attributes.alerts) || 0) + 1,
          },
        },
      });
    }
    return alert;
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateAlertDto) {
    return await this.prisma.alert.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async close(id: number, userId: number) {
    //   const alert = await this.prisma.alert.update({
    //     where: { id },
    //     data: {
    //       acknowledgedById: userId,
    //     },
    //     include: {
    //       device: {
    //         select: {
    //           groupId: true,
    //         },
    //       },
    //     },
    //   });

    //   if (alert.device.groupId) {
    //     const group = await this.prisma.group.findUnique({
    //       where: { id: alert.device.groupId },
    //     });
    //     const attributes: any = group.attributes || {};
    //     await this.prisma.group.update({
    //       where: { id: group.id },
    //       data: {
    //         attributes: {
    //           ...attributes,
    //           alerts: Math.max((parseInt(attributes.alerts) || 0) - 1, 0),
    //         },
    //       },
    //     });
    // }

    //   return alert;
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.alert.delete({ where: { id } });
  }
}
