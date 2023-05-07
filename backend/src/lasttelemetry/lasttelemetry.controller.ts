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
import { LastTelemetryService } from './lasttelemetry.service';
import {
  LastTelemetry,
  CreateLastTelemetryDto,
  UpdateLastTelemetryDto,
} from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('lasttelemetry')
@Controller('lasttelemetry')
export class LastTelemetryController {
  constructor(private readonly lasttelemetryService: LastTelemetryService) {}

  @ApiOkResponse({ type: [LastTelemetry] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.lasttelemetryService.findAll(query);
  }

  @ApiOkResponse({ type: LastTelemetry })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.lasttelemetryService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: LastTelemetry })
  @Post()
  create(@Body() data: CreateLastTelemetryDto) {
    console.log('data', data);
    return this.lasttelemetryService.create(data);
  }

  @ApiOkResponse({ type: LastTelemetry })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateLastTelemetryDto,
  ) {
    return this.lasttelemetryService.update(id, data);
  }

  @ApiOkResponse({ type: LastTelemetry })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lasttelemetryService.remove(id);
  }
}
