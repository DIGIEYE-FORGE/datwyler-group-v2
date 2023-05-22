import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateReportDto, GenerateRapport, UpdateReportDto } from './entities';
import { Workbook } from 'exceljs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as path from 'path';
import * as fs from 'fs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.report.count({
      where: options.where,
    });
    const results = await this.prisma.report.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.report.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async generate(data: GenerateRapport) {
    console.log('------data-----------', data);
    let res;
    let file;
    if (data.type == 'alert') {
      res = await this.prisma.alert.findMany({
        where: {
          deviceId: {
            in: data.devices,
          },
          // createdAt: {
          //   gte: new Date(data.date),
          // },
        },
      });
    } else if (data.type == 'Mesurement') {
      res = await this.prisma.history.findMany({
        where: {
          deviceId: {
            in: data.devices,
          },
        },
      });
    }

    if (res.length == 0) {
      throw new Error('No data found');
    } else {
      if (data.format == 'csv') {
        file = await this.generateFileExcel(
          data.name + 'tanantId-' + data.tenantId,
          res,
        );
      } else if (data.format == 'pdf') {
        file = await this.generateFilePdf(
          data.name + 'tanantId-' + data.tenantId,
          res,
        );
      }
    }
    await this.prisma.report.create({
      data: {
        name: data.name,
        url: file,
        query: '---',
        type: data.type,
        format: data.format,
        tenantId: data.tenantId,
      },
    });
    return file;
  }

  @HandleRequestErrors()
  async create(data: CreateReportDto) {
    return await this.prisma.report.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateReportDto) {
    return await this.prisma.report.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.report.delete({ where: { id } });
  }

  async generateFileExcel(name: string, data: Record<string, any>[]) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Report');

    const dataExcel = data.map((item) => Object.values(item));
    dataExcel.unshift(Object.keys(data[0]));
    worksheet.addRows(dataExcel);
    const filename = `${name}.xlsx`;
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
  }

  async generateFilePdf(name: string, data: Record<string, any>[]) {
    const pdfData = {
      content: [
        {
          text: name,
          style: 'header',
        },
        {
          style: 'tableExample',
          table: {
            body: [
              Object.keys(data[0]),
              ...data.map((item) => Object.values(item)),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };
    const filename = `${name}.pdf`;
    const filepath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      filename,
    );
    const pdfDoc = pdfMake.createPdf(pdfData);
    pdfDoc.getBuffer(async (buffer) => {
      try {
        await fs.promises.writeFile(filepath, buffer);
        console.log('PDF created');
      } catch (err) {
        console.log(err);
      }
    });
    return `uploads/${filename}`;
  }
}
