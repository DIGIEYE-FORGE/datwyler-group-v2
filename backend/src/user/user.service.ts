import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateUserDto, Login, UpdateUserDto } from './entities';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { Workbook } from 'exceljs';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  // @FindAllOptions({})
  // @HandleRequestErrors()
  // async findAll(options?: any) {
  //   const totalResult = await this.prisma.user.count({
  //     where: options.where,
  //   });
  //   const results = await this.prisma.user.findMany(options);
  //   return { totalResult, results };
  // }

  // @HandleRequestErrors()
  // async findOne(id: number, query?: any) {
  //   return await this.prisma.user.findUnique({ where: { id }, ...query });
  // }

  // async download() {
  //   try {
  //     const workbook = new Workbook();
  //     const worksheet = workbook.addWorksheet('Users');
  //     const users = await this.prisma.user.findMany();

  //     const rows = users.map((user) => {
  //       const { password, logo, ...res } = user;
  //       return Object.values(res);
  //     });
  //     delete users[0].password;
  //     delete users[0].logo;
  //     rows.unshift(Object.keys(users[0]));
  //     worksheet.addRows(rows);
  //     const filename = `${uuid()}.xlsx`;
  //     const filepath = path.join(
  //       __dirname,
  //       '..',
  //       '..',
  //       '..',
  //       'uploads',
  //       filename,
  //     );
  //     await workbook.xlsx.writeFile(filepath);
  //     return `uploads/${filename}`;
  //   } catch (e) {
  //     throw new BadRequestException(e);
  //   }
  // }
  // async create(file: Express.Multer.File, data: CreateUserDto) {
  //   try {
  //     if (file?.filename) {
  //       data['logo'] = file.filename;
  //       delete data['file'];
  //     }
  //     return await this.prisma.user.create({ data });
  //   } catch (e) {
  //     if (data['logo']) {
  //       fs.unlinkSync(`./uploads/${data['logo']}`);
  //     }
  //     if (e?.message === 'Not Found' || e?.code === 'P2025')
  //       throw new NotFoundException();
  //     if (e.message === 'Error') throw new BadRequestException(e);
  //     if (e.code === 'P2002')
  //       throw new ConflictException(
  //         e.meta.target.filter((data) => data !== 'deleted_at'),
  //       );
  //     if (e.code === 'P2003')
  //       throw new NotFoundException(
  //         `Foreign key constraint failed on the field: ${e.meta.field_name}`,
  //       );
  //     throw new BadRequestException(`${e}`);
  //   }
  // }

  // async update(id: number, data: UpdateUserDto, file: Express.Multer.File) {
  //   try {
  //     if (file?.filename) {
  //       data['logo'] = file.filename;
  //       delete data['file'];
  //     }
  //     return await this.prisma.user.update({ where: { id }, data });
  //   } catch (e) {
  //     if (data['logo']) {
  //       fs.unlinkSync(`./uploads/${data['logo']}`);
  //     }
  //     if (e?.message === 'Not Found' || e?.code === 'P2025')
  //       throw new NotFoundException();
  //     if (e.message === 'Error') throw new BadRequestException(e);
  //     if (e.code === 'P2002')
  //       throw new ConflictException(
  //         e.meta.target.filter((data) => data !== 'deleted_at'),
  //       );
  //     if (e.code === 'P2003')
  //       throw new NotFoundException(
  //         `Foreign key constraint failed on the field: ${e.meta.field_name}`,
  //       );
  //     throw new BadRequestException(`${e}`);
  //   }
  // }

  // @HandleRequestErrors()
  // async remove(id: number) {
  //   return await this.prisma.user.delete({ where: { id } });
  // }
  // @HandleRequestErrors()
  // async login(data: Login) {
  //   const user = await this.prisma.user.findFirst({
  //     where: {
  //       email: data.email,
  //     },
  //   });
  //   if (!user) {
  //     throw new NotFoundException();
  //   } else {
  //     const is_valide = await bcrypt.compare(data.password, user.password);
  //     if (is_valide) {
  //       return {
  //         data: user,
  //       };
  //     } else throw new NotFoundException();
  //   }
  // }
}
