import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateAttributeDto, UpdateAttributeDto } from './entities';

@Injectable()
export class AttributeService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.attribute.count({
      where: options.where,
    });
    const results = await this.prisma.attribute.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.attribute.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateAttributeDto) {
    return await this.prisma.attribute.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateAttributeDto) {
    return await this.prisma.attribute.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.attribute.delete({ where: { id } });
  }
}
