import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateGroupDto, UpdateGroupDto } from './entities';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.group.count({
      where: options.where,
    });
    const results = await this.prisma.group.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.group.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateGroupDto) {
    return await this.prisma.group.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateGroupDto) {
    return await this.prisma.group.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.group.delete({ where: { id } });
  }
}
