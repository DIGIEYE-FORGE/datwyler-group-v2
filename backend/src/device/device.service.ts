import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import fs = require('fs');
import {
  AddAttirbutes,
  addLastTelemetry,
  CreateDeviceDto,
  UpdateDeviceDto,
} from './entities';
import { Workbook } from 'exceljs';
import { v4 as uuid } from 'uuid';
import * as path from 'path';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any, data?: any) {
    console.log('data', data);
    if (data.tenantIds) {
      options.where = {
        ...options.where,
        tenantId: {
          in: data.tenantIds,
        },
      };
    }
    const totalResult = await this.prisma.device.count({
      where: options.where,
    });
    const results = await this.prisma.device.findMany(options);
    return { totalResult, results };
  }

  async download() {
    try {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Users');
      const devices = await this.prisma.device.findMany({
        include: {
          deviceProfile: true,
          tags: true,
          attributes: true,
          group: true,
        },
      });
      const rows = devices.map((user) => {
        const { deviceProfile, tags, attributes, group, ...res } = user;
        return Object.values({
          deviceProfile: deviceProfile?.name || 'null',
          tags: tags?.map((tag) => tag.name).join(', '),
          attributes: attributes?.map((attr) => attr.name)?.join(', '),
          group: group?.name,
          ...res,
        });
      });
      const { deviceProfile, tags, attributes, group, ...res } = devices[0];
      rows.unshift(
        Object.keys({
          deviceProfile: deviceProfile?.name || 'null',
          tags: tags?.map((tag) => tag?.name)?.join(', '),
          attributes: attributes?.map((attr) => attr.name)?.join(', '),
          group: group?.name,
          ...res,
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
  async findOne(id: number, query?: any) {
    return await this.prisma.device.findUnique({ where: { id }, ...query });
  }

  // @HandleRequestErrors()
  async create(data: CreateDeviceDto, file: Express.Multer.File) {
    const {
      tags,
      attributes,
      credential,
      deviceProfileId,
      firmwareId,
      groupId,
      ...rest
    } = data;

    try {
      if (file) {
        data.configuration = file.path.substring(8);
        delete data['file'];
      }
      const res = await this.prisma.device.create({
        data: {
          ...rest,
          tags: tags && {
            connectOrCreate: tags
              .filter((tag) => tag)
              .map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
          },
          credential: credential && {
            connectOrCreate: {
              where: { username: credential.username },
              create: { ...credential },
            },
          },
          deviceProfile: deviceProfileId && {
            connect: { id: deviceProfileId },
          },
          group: groupId && {
            connect: { id: groupId },
          },
          firmware: firmwareId && {
            connect: { id: firmwareId },
          },
          attributes: attributes && {
            createMany: { data: attributes },
          },
        },
      });
      return res;
    } catch (e: any) {
      console.log(e);
      if (file) fs.unlinkSync(`./uploads/${data.configuration}`);

      if (e.code === 'P2002')
        throw new ConflictException(
          e.meta.target.filter((data: any) => data !== 'deleted_at'),
        );
      if (e?.message === 'Not Found' || e?.code === 'P2025')
        throw new NotFoundException();
      if (e.message === 'Error') throw new BadRequestException(e);
      if (e.code === 'P2003')
        throw new NotFoundException(
          `Foreign key constraint failed on the field: ${e.meta.field_name}`,
        );
      throw new BadRequestException(`${e}`);
    }
  }
  @HandleRequestErrors()
  async update(id: number, data: UpdateDeviceDto) {
    return await this.prisma.device.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async linkProfile(id: number, profileId: number) {
    return await this.prisma.device.update({
      where: { id },
      data: {
        deviceProfile: {
          connect: { id: profileId },
        },
      },
    });
  }

  @HandleRequestErrors()
  async addAttributes(id: number, data: AddAttirbutes) {
    const device = await this.prisma.device.findUnique({ where: { id } });
    if (device) {
      await Promise.all(
        data.attributes.map(async (attribute) => {
          await this.prisma.attribute.upsert({
            where: {
              deviceId_name: {
                deviceId: id,
                name: attribute.name,
              },
            },
            update: {
              value: attribute.value,
            },
            create: {
              name: attribute.name,
              value: attribute.value,
              deviceId: id,
            },
          });
        }),
      );
    }
    return device;
  }
  @HandleRequestErrors()
  async addLastTelemetry(id: number, data: addLastTelemetry) {
    const device = await this.prisma.device.findUnique({ where: { id } });
    if (device) {
      await Promise.all(
        data.lastTelemetries.map(async (telemetry) => {
          const { alias, name, ...rest } = telemetry;
          await this.prisma.lastTelemetry.upsert({
            where: {
              deviceId_name: {
                deviceId: id,
                name,
              },
            },
            update: {
              alias: alias || name,
              ...rest,
            },
            create: {
              name,
              deviceId: id,
              value: rest.value,
              alias: alias || name,
              ...rest,
            },
          });
        }),
      );
    }
    return device;
  }
  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.device.delete({ where: { id } });
  }
}
