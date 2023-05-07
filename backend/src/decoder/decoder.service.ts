import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateDecoderDto, UpdateDecoderDto } from './entities';

@Injectable()
export class DecoderService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.decoder.count({
      where: options.where,
    });
    const results = await this.prisma.decoder.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.decoder.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateDecoderDto) {
    return await this.prisma.decoder.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateDecoderDto) {
    return await this.prisma.decoder.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.decoder.delete({ where: { id } });
  }
}
