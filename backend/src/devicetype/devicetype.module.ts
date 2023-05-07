import { Module } from '@nestjs/common';
import { DeviceTypeService } from './devicetype.service';
import { DeviceTypeController } from './devicetype.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DeviceTypeController],
  providers: [DeviceTypeService, PrismaService],
})
export class DeviceTypeModule {}
