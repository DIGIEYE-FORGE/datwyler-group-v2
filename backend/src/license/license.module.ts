import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LicenseController } from './license.controller';
import { LicenseService } from './license.service';

@Module({
  controllers: [LicenseController],
  providers: [PrismaService, LicenseService],
})
export class LicenseModule {}
