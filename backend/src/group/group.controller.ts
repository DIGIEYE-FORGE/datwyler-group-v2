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
import { GroupService } from './group.service';
import { Group, CreateGroupDto, UpdateGroupDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @ApiOkResponse({ type: [Group] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.groupService.findAll(query);
  }

  @ApiOkResponse({ type: Group })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.groupService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Group })
  @Post()
  create(@Body() data: CreateGroupDto) {
    return this.groupService.create(data);
  }

  @ApiOkResponse({ type: Group })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateGroupDto) {
    return this.groupService.update(id, data);
  }

  @ApiOkResponse({ type: Group })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.remove(id);
  }
}
