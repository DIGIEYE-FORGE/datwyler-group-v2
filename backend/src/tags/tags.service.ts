import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateTageDto, UpdateTageDto } from './entities';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.tag.count({
      where: options.where,
    });
    const results = await this.prisma.tag.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.tag.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateTageDto) {
    return await this.prisma.tag.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateTageDto) {
    return await this.prisma.tag.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.tag.delete({ where: { id } });
  }
}
