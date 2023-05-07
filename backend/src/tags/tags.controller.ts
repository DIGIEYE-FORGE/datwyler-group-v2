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
import { TagsService } from './tags.service';
import { Tage, CreateTageDto, UpdateTageDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('Tage')
@Controller('Tage')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOkResponse({ type: [Tage] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.tagsService.findAll(query);
  }

  @ApiOkResponse({ type: Tage })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.tagsService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Tage })
  @Post()
  create(@Body() data: CreateTageDto) {
    return this.tagsService.create(data);
  }

  @ApiOkResponse({ type: Tage })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTageDto) {
    return this.tagsService.update(id, data);
  }

  @ApiOkResponse({ type: Tage })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.remove(id);
  }
}
