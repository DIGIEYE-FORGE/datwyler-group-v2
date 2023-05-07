import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateDeviceTypeDto, UpdateDeviceTypeDto } from './entities';

@Injectable()
export class DeviceTypeService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.deviceType.count({
      where: options.where,
    });
    const results = await this.prisma.deviceType.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.deviceType.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateDeviceTypeDto) {
    return await this.prisma.deviceType.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateDeviceTypeDto) {
    return await this.prisma.deviceType.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.deviceType.delete({ where: { id } });
  }
}
