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
import { CredentialService } from './credential.service';
import {
  Credential,
  CreateCredentialDto,
  UpdateCredentialDto,
} from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('credential')
@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @ApiOkResponse({ type: [Credential] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.credentialService.findAll(query);
  }

  @ApiOkResponse({ type: Credential })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.credentialService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Credential })
  @Post()
  create(@Body() data: CreateCredentialDto) {
    return this.credentialService.create(data);
  }

  @ApiOkResponse({ type: Credential })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCredentialDto,
  ) {
    return this.credentialService.update(id, data);
  }

  @ApiOkResponse({ type: Credential })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.credentialService.remove(id);
  }
}
