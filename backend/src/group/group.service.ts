import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateGroupDto, UpdateGroupDto } from './entities';
import { LicenseService } from 'src/license/license.service';
import { Type } from 'src/license/license.interface';

@Injectable()
export class GroupService {
  constructor(
    private prisma: PrismaService,
    private licenseService: LicenseService,
  ) {}

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
    const { tenantParentId, ...rest } = data;
    const res = await this.prisma.group.create({
      data: {
        ...rest,
      },
    });
    if (tenantParentId) {
      if (res) {
        const dt = await this.licenseService
          .AffectType({
            tenantId: data.tenantId,
            typeId: res.id,
            type: Type.DATACENTER,
          })
          .toPromise();
        if (dt.result == false) {
          await this.prisma.group.delete({ where: { id: res.id } });
          throw new Error(dt.message);
        }
      }
    }
    return res;
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateGroupDto) {
    return await this.prisma.group.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    const res = await this.licenseService
      .DeleteAffictation({ type: Type.DATACENTER, typeId: id })
      .toPromise();
    return await this.prisma.group.delete({ where: { id } });
  }
}
