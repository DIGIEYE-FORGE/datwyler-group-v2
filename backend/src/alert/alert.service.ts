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
    return await this.prisma.alert.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateAlertDto) {
    return await this.prisma.alert.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.alert.delete({ where: { id } });
  }
}
