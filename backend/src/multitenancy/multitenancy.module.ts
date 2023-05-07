import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MultitenancyService } from './multitanancy.service';
import { MultitenancyController } from './multitenancy.controller';

@Module({
  controllers: [MultitenancyController],
  providers: [PrismaService, MultitenancyService],
})
export class MultitenancyModule {}
