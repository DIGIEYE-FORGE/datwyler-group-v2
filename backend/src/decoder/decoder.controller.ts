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
import { DecoderService } from './decoder.service';
import { Decoder, CreateDecoderDto, UpdateDecoderDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('decoder')
@Controller('decoder')
export class DecoderController {
  constructor(private readonly decoderService: DecoderService) {}

  @ApiOkResponse({ type: [Decoder] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.decoderService.findAll(query);
  }

  @ApiOkResponse({ type: Decoder })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.decoderService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Decoder })
  @Post()
  create(@Body() data: CreateDecoderDto) {
    return this.decoderService.create(data);
  }

  @ApiOkResponse({ type: Decoder })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDecoderDto,
  ) {
    return this.decoderService.update(id, data);
  }

  @ApiOkResponse({ type: Decoder })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.decoderService.remove(id);
  }
}
