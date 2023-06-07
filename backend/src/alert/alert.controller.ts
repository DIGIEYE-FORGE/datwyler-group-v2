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
import { AlertService } from './alert.service';
import { Alert, CreateAlertDto, UpdateAlertDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';


@ApiTags('alert')
@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @ApiOkResponse({ type: [Alert] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.alertService.findAll(query);
  }

  @ApiOkResponse({ type: Alert })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.alertService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Alert })
  @Post()
  create(@Body() data: CreateAlertDto) {
    return this.alertService.create(data);
  }

  @ApiOkResponse({ type: Alert })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateAlertDto) {
    return this.alertService.update(id, data);
  }

  @ApiOkResponse({ type: Alert })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.alertService.remove(id);
  }
}
