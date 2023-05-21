import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Header,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import path from 'path';
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Get('excel')
  @Header('Content-type', 'application/xlsx')
  @Header('Content-Disposition', 'attachment; filename="example.xlsx"')
  async generateExcel(@Res() res: Response) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add data to the worksheet
    worksheet.getCell('A1').value = 'Hello';
    worksheet.getCell('B1').value = 'World!';
    await workbook.xlsx.write(res);
    res.end();
    const filename = `${Date.now()}.xlsx`;
    const filepath = path.join(__dirname, '..', '..', './uploads', filename);
    await workbook.xlsx.writeFile(filepath);

    res.download(`uploads/${filename}`);
  }
}
