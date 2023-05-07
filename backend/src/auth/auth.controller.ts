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
import { AuthInterface } from './auth.interface';
import { AuthService } from './auth.service';
import { microservicesOption } from './grpc.options';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async checkToken(@Body() body: string) {
    return this.authService.checkToken({ accessToken: body });
  }
}
