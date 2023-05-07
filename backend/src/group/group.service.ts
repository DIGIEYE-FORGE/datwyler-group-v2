import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateGroupDto, UpdateGroupDto } from './entities';
import * as fs from 'fs';
import { Workbook } from 'exceljs';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import { LicenseService } from 'src/license/license.service';

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
    if (data.tenantId) {
      const license = await this.licenseService
        .checkData({
          tenantId: data.tenantId,
          type: 2,
        })
        .toPromise();
      const res = await this.prisma.group.create({ data });
      if (res.id) {
        console.log(license);
        console.log(res);

        const results = await this.licenseService
          .affectUser({
            licenseRequest: {
              tenantId: data.tenantId,
              type: 2,
            },
            licenseId: license.licenseId,
            injectedId: res.id,
          })
          .toPromise();
        return res;
      }
    } else return await this.prisma.group.create({ data });
  }

  async download() {
    try {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Users');
      const groups = await this.prisma.group.findMany({
        include: {
          _count: true,
        },
      });
      const rows = groups.map((user) => {
        const { _count, ...res } = user;
        return Object.values({
          ...res,
          number_devices: _count.devices,
          groups: _count.subgroups,
        });
      });
      const { _count, ...res } = groups[0];
      rows.unshift(
        Object.keys({
          ...res,
          number_devices: _count.devices,
          groups: _count.subgroups,
        }),
      );
      worksheet.addRows(rows);
      const filename = `${uuid()}.xlsx`;
      const filepath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'uploads',
        filename,
      );
      await workbook.xlsx.writeFile(filepath);
      return `uploads/${filename}`;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateGroupDto) {
    const group = await this.prisma.group.findUnique({ where: { id } });
    if (!group.attributes) group.attributes = {};
    Object.keys(group.attributes).forEach((key) => {
      if (!data.attributes[key] && data.attributes['alerts count'] == 0)
        data.attributes[key] = group.attributes[key];
    });
    return await this.prisma.group.update({ where: { id }, data });
  }
  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.group.delete({ where: { id } });
  }
}
