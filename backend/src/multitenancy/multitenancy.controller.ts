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
  OnModuleInit,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthClient } from 'src/grpc/proto/authPackage/Auth';
import { FindAllQuery, FindOneQuery } from 'src/utils';
// import { AuthInterface } from './multitenancy.interface';
import { microservicesOption } from './grpc.options';
import { MultitenancyService } from './multitanancy.service';

@ApiTags('multi-tenancy')
@Controller('multitenancy')
export class MultitenancyController {
  constructor(private readonly multitenancyService: MultitenancyService) { }

  @Post()
  async checkToken(@Body() body: { userId: number; tenantId?: number }) {
    try {
      body.tenantId = 1;
      const data = await this.multitenancyService
        .MultiTenancy(body)
        .toPromise();
      return data;
    } catch (e) {
      return 'data';
    }
  }
}
