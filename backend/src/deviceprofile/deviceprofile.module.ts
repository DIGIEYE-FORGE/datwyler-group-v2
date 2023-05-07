import { Module } from '@nestjs/common';
import { DeviceProfileService } from './deviceprofile.service';
import { DeviceProfileController } from './deviceprofile.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/profile',
    }),
  ],
  controllers: [DeviceProfileController],
  providers: [DeviceProfileService, PrismaService],
})
export class DeviceProfileModule {}
