import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateReportDto, UpdateReportDto } from './entities';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.report.count({
      where: options.where,
    });
    const results = await this.prisma.report.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.report.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateReportDto) {
    return await this.prisma.report.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateReportDto) {
    return await this.prisma.report.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.report.delete({ where: { id } });
  }
}
