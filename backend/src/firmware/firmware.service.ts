import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import {
  CreateFirmwareDto,
  UpdateFirmwareDto,
  UploadedFilesDto,
} from './entities';
import fs = require('fs');

@Injectable()
export class FirmwareService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.firmware.count({
      where: options.where,
    });
    const results = await this.prisma.firmware.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.firmware.findUnique({ where: { id }, ...query });
  }

  async create(data: CreateFirmwareDto) {
    try {
      delete data['file'];
      return await this.prisma.firmware.create({ data });
    } catch (e) {
      if (data.url) {
        fs.unlinkSync(`./uploads/${data.url}`);
      }
      if (e?.message === 'Not Found' || e?.code === 'P2025')
        throw new NotFoundException();
      if (e.message === 'Error') throw new BadRequestException(e);
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

  async update(id: number, data: UpdateFirmwareDto) {
    try {
      if (data && data.size > 0) {
        delete data['file'];
        const res = await this.prisma.firmware.findFirst({
          where: {
            id: id,
          },
        });
        fs.unlinkSync(`./uploads/${res.url}`);
      }
      return await this.prisma.firmware.update({
        data,
        where: {
          id,
        },
      });
    } catch (e) {
      if (data && data.url) {
        fs.unlinkSync(`./uploads/${data.url}`);
      }
      if (e?.message === 'Not Found' || e?.code === 'P2025')
        throw new NotFoundException();
      if (e.message === 'Error') throw new BadRequestException(e);
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
    const res = await this.prisma.firmware.findUnique({
      where: {
        id,
      },
    });
    try {
      if (res.url) fs.unlinkSync(`./uploads/${res.url}`);
      return await this.prisma.firmware.delete({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(`${e}`);
    }
  }

  @HandleRequestErrors()
  async firmwardownload(data: UploadedFilesDto) {
    return `./uploads/${data.url}`;
  }
}
