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
import { ProtocolService } from './protocol.service';
import { Protocol, CreateProtocolDto, UpdateProtocolDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('protocol')
@Controller('protocol')
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) {}

  @ApiOkResponse({ type: [Protocol] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.protocolService.findAll(query);
  }

  @ApiOkResponse({ type: Protocol })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.protocolService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Protocol })
  @Post()
  create(@Body() data: CreateProtocolDto) {
    return this.protocolService.create(data);
  }

  @ApiOkResponse({ type: Protocol })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProtocolDto,
  ) {
    return this.protocolService.update(id, data);
  }

  @ApiOkResponse({ type: Protocol })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.protocolService.remove(id);
  }
}
