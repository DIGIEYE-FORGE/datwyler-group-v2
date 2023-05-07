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
  UploadedFile,
  Header,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import {
  Device,
  CreateDeviceDto,
  UpdateDeviceDto,
  AddAttirbutes,
  addLastTelemetry,
} from './entities';
import { storage } from '../utils';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @ApiOkResponse({ type: [Device] })
  @Get('/')
  findAll(@Body() data: any, @Query() query: FindAllQuery) {
    try {
      return this.deviceService.findAll(query, data);
    } catch (e) {
      console.log(e);
    }
  }

  @ApiOkResponse({ type: Device })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.deviceService.findOne(+id, query);
  }

  @ApiOkResponse({ type: Device })
  @Get('/file/download')
  @Header('Content-type', 'application/xlsx')
  async download(@Res() res) {
    const file = await this.deviceService.download();
    return res.download(file);
  }

  @ApiCreatedResponse({ type: Device })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateDeviceDto,
  ) {
    if (data.deviceProfileId) data.deviceProfileId = +data.deviceProfileId;
    if (data.firmwareId) data.firmwareId = +data.firmwareId;
    if (data.decoderId) data.decoderId = +data.decoderId;
    if (data.groupId) data.groupId = +data.groupId;
    if (data.isdecoded + '' == 'true') data.isdecoded = true;
    if (data.isdecoded + '' == 'false') data.isdecoded = false;
    if (data.isPassive + '' === 'true') data.isPassive = true;
    if (data.isPassive + '' === 'false') data.isPassive = false;
    if (data.isOnline + '' === 'true') data.isOnline = true;
    if (data.isOnline + '' === 'false') data.isOnline = false;
    if (data.tenantId) data.tenantId = +data.tenantId;
    return this.deviceService.create(data, file);
  }

  @ApiOkResponse({ type: Device })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDeviceDto) {
    return this.deviceService.update(id, data);
  }

  @ApiOkResponse({ type: Device })
  @Patch(':id/link-profile')
  linkProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { profileId: number },
  ) {
    return this.deviceService.linkProfile(id, data.profileId);
  }
  @ApiOkResponse({ type: Device })
  @Patch(':id/add-attributes')
  addAttributes(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AddAttirbutes,
  ) {
    return this.deviceService.addAttributes(id, data);
  }

  @ApiOkResponse({ type: Device })
  @Patch(':id/add-last-telemetries')
  addLastTelemetry(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: addLastTelemetry,
  ) {
    return this.deviceService.addLastTelemetry(id, data);
  }

  @ApiOkResponse({ type: Device })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deviceService.remove(id);
  }
}
