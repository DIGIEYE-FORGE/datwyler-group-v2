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
import { AttributeService } from './attribute.service';
import { Attribute, CreateAttributeDto, UpdateAttributeDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('attribute')
@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @ApiOkResponse({ type: [Attribute] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.attributeService.findAll(query);
  }

  @ApiOkResponse({ type: Attribute })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.attributeService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Attribute })
  @Post()
  create(@Body() data: CreateAttributeDto) {
    return this.attributeService.create(data);
  }

  @ApiOkResponse({ type: Attribute })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAttributeDto,
  ) {
    return this.attributeService.update(id, data);
  }

  @ApiOkResponse({ type: Attribute })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.attributeService.remove(id);
  }
}
