import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateLastTelemetryDto, UpdateLastTelemetryDto } from './entities';

@Injectable()
export class LastTelemetryService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.lastTelemetry.count({
      where: options.where,
    });
    const results = await this.prisma.lastTelemetry.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.lastTelemetry.findUnique({
      where: { id },
      ...query,
    });
  }

  @HandleRequestErrors()
  async create(data: CreateLastTelemetryDto) {
    console.log('data', data);
    return await this.prisma.lastTelemetry.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateLastTelemetryDto) {
    return await this.prisma.lastTelemetry.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.lastTelemetry.delete({ where: { id } });
  }
}
