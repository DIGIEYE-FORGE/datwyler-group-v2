import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  Query,
  Res,
} from '@nestjs/common';
import { FirmwareService } from './firmware.service';
import { storage } from '../utils';
import {
  Firmware,
  CreateFirmwareDto,
  UpdateFirmwareDto,
  CreateFirmwareWithOutUrlDto,
  UploadedFilesDto,
} from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('firmware')
@Controller('firmware')
export class FirmwareController {
  constructor(private readonly firmwareService: FirmwareService) { }

  @ApiOkResponse({ type: [Firmware] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.firmwareService.findAll(query);
  }

  @ApiCreatedResponse({ type: Firmware })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
    if (file) {
      data.url = file.path.substring(8);
      data.size = file.size;
    }
    return this.firmwareService.create(data);
  }

  @ApiOkResponse({ type: Firmware })
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFirmwareDto,
  ) {
    if (file) {
      data.url = file.path.substring(8);
      data.size = file.size;
    }
    return this.firmwareService.update(id, data);
  }

  @ApiOkResponse({ type: Firmware })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.firmwareService.remove(id);
  }

  @Get('/download')
  async downloads(@Query() query: UploadedFilesDto, @Res() res: any) {
    if (!query.url) return res.status(400).send({ message: 'url is required' });
    const file = await this.firmwareService.firmwardownload(query);
    return res.download(file);
  }

  @ApiOkResponse({ type: Firmware })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.firmwareService.findOne(+id, query);
  }
}
