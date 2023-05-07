import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateDeviceProfileDto, UpdateDeviceProfileDto } from './entities';
import fs = require('fs');
import { contains } from 'class-validator';
@Injectable()
export class DeviceProfileService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.deviceProfile.count({
      where: options.where,
    });
    const results = await this.prisma.deviceProfile.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.deviceProfile.findUnique({
      where: { id },
      ...query,
    });
  }

  @HandleRequestErrors()
  async create(data: any, file: Express.Multer.File) {
    try {
      if (file && file.path) data.logo = file.path.substring(8);
      delete data['file'];
      data.deviceTypeId = +data.deviceTypeId || null;
      data.protocolId = +data.protocolId || null;
      data.decoderId = +data.decoderId || null;
      console.log('0000000000000000000000000000000\n', data);
      return await this.prisma.deviceProfile.create({ data });
    } catch (e) {
      if (file && file.path) {
        fs.unlinkSync(`./uploads/${data.logo}`);
      }
      if (e?.message === 'Not Found' || e?.code === 'P2025')
        throw new NotFoundException();
      if (e.code === 'P2002')
        throw new ConflictException(
          e.meta.target.filter((data) => data !== 'deleted_at'),
        );
      if (e.code === 'P2003')
        throw new NotFoundException(
          `Foreign key constraint failed on the field: ${e.meta.field_name}`,
        );
      throw new BadRequestException(`${e}`);
    }
  }

  @HandleRequestErrors()
  async update(
    id: number,
    data: UpdateDeviceProfileDto,
    file: Express.Multer.File,
  ) {
    try {
      if (file && file.path) {
        const res = await this.prisma.deviceProfile.findUnique({
          where: {
            id,
          },
        });
        if (res.logo) {
          fs.unlinkSync(`./uploads/${data.logo}`);
        }
        data.logo = file.path;
      }
      if (data.deviceTypeId) data.deviceTypeId = +data.deviceTypeId;
      if (data.protocolId) data.protocolId = +data.protocolId;
      if (data.decoderId) data.decoderId = +data.decoderId;
      return await this.prisma.deviceProfile.update({ where: { id }, data });
    } catch (e) {
      if (data.logo) fs.unlinkSync(`./uploads/${data.logo}`);
      if (e?.message === 'Not Found' || e?.code === 'P2025')
        throw new NotFoundException();
      if (e.code === 'P2002')
        throw new ConflictException(
          e.meta.target.filter((data) => data !== 'deleted_at'),
        );
      if (e.code === 'P2003')
        throw new NotFoundException(
          `Foreign key constraint failed on the field: ${e.meta.field_name}`,
        );
      throw new BadRequestException(`${e}`);
    }
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.deviceProfile.delete({ where: { id } });
  }
}
