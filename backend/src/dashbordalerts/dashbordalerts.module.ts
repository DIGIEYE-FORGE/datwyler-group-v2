import { Module } from '@nestjs/common';
import { DashbordAlertsService } from './dashbordalerts.service';
import { DashbordAlertsController } from './dashbordalerts.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DashbordAlertsController],
  providers: [DashbordAlertsService, PrismaService],
})
export class DashbordAlertsModule {}
