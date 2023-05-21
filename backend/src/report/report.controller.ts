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
} from '@nestjs/common';
import { ReportService } from './report.service';
import { Report, CreateReportDto, UpdateReportDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

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
}
