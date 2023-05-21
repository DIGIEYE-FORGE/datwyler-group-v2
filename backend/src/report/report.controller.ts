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
import { Report, CreateReportDto, UpdateReportDto, GenerateRapport } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

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

  @Get('download/excel')
  @Header('Content-type', 'application/xlsx')
  async downloadExcel(@Body() data: Record<string, any>[], @Res() res: any) {
    const file = await this.reportService.generateFileExcel('Report', data);
    return res.download(file);
  }

  
  // @Get('download')
  // async DownloadExcelAndPdf(@Request() req: any, @Res() res: any) {
  // }
}
