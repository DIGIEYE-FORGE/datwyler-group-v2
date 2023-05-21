import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateReportDto, GenerateRapport, UpdateReportDto } from './entities';
import { Workbook } from 'exceljs';
import { createPdf } from 'pdfmake/build/pdfmake';
import { pdfMake } from 'pdfmake/build/vfs_fonts';
import * as path from 'path';
import * as fs from 'fs';
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
    console.log('res', res);

    if (res.length == 0) {
      throw new Error('No data found');
    } else {
      console.log('hello', data.format);

      if (data.format == 'csv') {
        file = await this.generateFileExcel(data.name, res);
      } else if (data.format == 'pdf') {
        file = await this.generateFilePdf(data.name, res);
      }
    }
    //   console.log(file);
    return 'test';
    // await this.prisma.report.create({
    //   data: {
    //     name: data.name,
    //     url: file,
    //     type: data.type,
    //     format: data.format,
    //   },
    // });
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
    return `${filename}`;
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
    const filepath = path.join(__dirname, '..', '..', 'uploads', filename);
    const pdfDoc = pdfMake.createPdf(pdfData);
    const stream = pdfDoc.getStream();
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      const pdfBytes = Buffer.concat(chunks);
      fs.writeFileSync(filepath, pdfBytes);
      console.log('PDF file generated successfully.');
    });
    return filename;
  }
}
