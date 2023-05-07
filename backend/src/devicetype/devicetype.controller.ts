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
import { DeviceTypeService } from './devicetype.service';
import {
  DeviceType,
  CreateDeviceTypeDto,
  UpdateDeviceTypeDto,
} from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('devicetype')
@Controller('devicetype')
export class DeviceTypeController {
  constructor(private readonly devicetypeService: DeviceTypeService) {}

  @ApiOkResponse({ type: [DeviceType] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.devicetypeService.findAll(query);
  }

  @ApiOkResponse({ type: DeviceType })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.devicetypeService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: DeviceType })
  @Post()
  create(@Body() data: CreateDeviceTypeDto) {
    return this.devicetypeService.create(data);
  }

  @ApiOkResponse({ type: DeviceType })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDeviceTypeDto,
  ) {
    return this.devicetypeService.update(id, data);
  }

  @ApiOkResponse({ type: DeviceType })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.devicetypeService.remove(id);
  }
}
