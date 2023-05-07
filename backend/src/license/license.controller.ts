import { Controller, Post, Body } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LicenseService } from './license.service';
@ApiTags('license')
@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Post()
  async checkToken(@Body() data: any) {
    return await this.licenseService.checkData(data).toPromise();
  }
}
