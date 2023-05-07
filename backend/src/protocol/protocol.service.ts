import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateProtocolDto, UpdateProtocolDto } from './entities';

@Injectable()
export class ProtocolService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.protocol.count({
      where: options.where,
    });
    const results = await this.prisma.protocol.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.protocol.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateProtocolDto) {
    return await this.prisma.protocol.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateProtocolDto) {
    return await this.prisma.protocol.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.protocol.delete({ where: { id } });
  }
}
