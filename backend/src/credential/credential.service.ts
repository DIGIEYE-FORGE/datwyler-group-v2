import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateCredentialDto, UpdateCredentialDto } from './entities';

@Injectable()
export class CredentialService {
  constructor(private prisma: PrismaService) {}
  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.credential.count({
      where: options.where,
    });
    const results = await this.prisma.credential.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.credential.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateCredentialDto) {
    return await this.prisma.credential.create({ data });
  }
  @HandleRequestErrors()
  async update(id: number, data: UpdateCredentialDto) {
    return await this.prisma.credential.update({ where: { id }, data });
  }
  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.credential.delete({ where: { id } });
  }
}
