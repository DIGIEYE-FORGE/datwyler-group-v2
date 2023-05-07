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
import { VmqAuthAclService } from './vmqauthacl.service';
import {
  VmqAuthAcl,
  CreateVmqAuthAclDto,
  UpdateVmqAuthAclDto,
} from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('vmqauthacl')
@Controller('vmqauthacl')
export class VmqAuthAclController {
  constructor(private readonly vmqauthaclService: VmqAuthAclService) {}

  @ApiOkResponse({ type: [VmqAuthAcl] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.vmqauthaclService.findAll(query);
  }

  @ApiOkResponse({ type: VmqAuthAcl })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.vmqauthaclService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: VmqAuthAcl })
  @Post()
  create(@Body() data: CreateVmqAuthAclDto) {
    return this.vmqauthaclService.create(data);
  }

  @ApiOkResponse({ type: VmqAuthAcl })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateVmqAuthAclDto,
  ) {
    return this.vmqauthaclService.update(id, data);
  }

  @ApiOkResponse({ type: VmqAuthAcl })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vmqauthaclService.remove(id);
  }
}
