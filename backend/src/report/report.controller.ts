import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Header,
  Res,
  Request,
} from '@nestjs/common';
import { ReportService } from './report.service';
import {
  Report,
  CreateReportDto,
  UpdateReportDto,
  GenerateRapport,
} from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';
import { log } from 'console';
import * as fs from 'fs';
import path from 'path';
import { Response } from 'express';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOkResponse({ type: [Report] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.reportService.findAll(query);
  }

  @ApiOkResponse({ type: Report })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.reportService.findOne(+id, query);
  }
  @ApiCreatedResponse({ type: GenerateRapport })
  @Post('generate')
  generate(@Body() data: GenerateRapport) {
    return this.reportService.generate(data);
  }

  @ApiCreatedResponse({ type: Report })
  @Post()
  create(@Body() data: CreateReportDto) {
    return this.reportService.create(data);
  }

  @ApiOkResponse({ type: Report })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateReportDto) {
    return this.reportService.update(id, data);
  }

  @ApiOkResponse({ type: Report })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reportService.remove(id);
  }

  // @Get('download/excel')
  // @Header('Content-type', 'application/xlsx')
  // async downloadExcel(@Body() data: Record<string, any>[], @Res() res: any) {
  //   const file = await this.reportService.generateFileExcel('Report', data);
  //   return res.download(file);
  // }

  @ApiOkResponse({ type: Report })
  @Get('download/file')
  async download(
    @Query() query: { name: string; type: string },
    @Res() res: Response,
  ): Promise<any> {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=' + query.name);

    fs.readFile(query.name, (err, data) => {
      if (err) {
        return res.send(err);
      }
      res.send(data);
    });
  }
}
