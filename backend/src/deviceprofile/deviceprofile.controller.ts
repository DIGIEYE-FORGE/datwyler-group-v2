import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UploadedFile,
  UseInterceptors,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeviceProfileService } from './deviceprofile.service';
import {
  DeviceProfile,
  CreateDeviceProfileDto,
  UpdateDeviceProfileDto,
} from './entities';
import { storage } from '../utils';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('deviceprofile')
@Controller('deviceprofile')
export class DeviceProfileController {
  constructor(private readonly deviceprofileService: DeviceProfileService) {}

  @ApiOkResponse({ type: [DeviceProfile] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.deviceprofileService.findAll(query);
  }

  @ApiOkResponse({ type: DeviceProfile })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.deviceprofileService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: DeviceProfile })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  create(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
    return this.deviceprofileService.create(data, file);
  }

  @ApiOkResponse({ type: DeviceProfile })
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateDeviceProfileDto,
  ) {
    return this.deviceprofileService.update(id, data, file);
  }

  @ApiOkResponse({ type: DeviceProfile })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deviceprofileService.remove(id);
  }
}
