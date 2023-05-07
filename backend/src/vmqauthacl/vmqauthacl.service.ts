import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateVmqAuthAclDto, UpdateVmqAuthAclDto } from './entities';

@Injectable()
export class VmqAuthAclService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.vmqAuthAcl.count({
      where: options.where,
    });
    const results = await this.prisma.vmqAuthAcl.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.vmqAuthAcl.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateVmqAuthAclDto) {
    return await this.prisma.vmqAuthAcl.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateVmqAuthAclDto) {
    return await this.prisma.vmqAuthAcl.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.vmqAuthAcl.delete({ where: { id } });
  }
}
