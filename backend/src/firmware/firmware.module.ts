import { Module } from '@nestjs/common';
import { FirmwareService } from './firmware.service';
import { FirmwareController } from './firmware.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [FirmwareController],
  providers: [FirmwareService, PrismaService],
})
export class FirmwareModule {}
