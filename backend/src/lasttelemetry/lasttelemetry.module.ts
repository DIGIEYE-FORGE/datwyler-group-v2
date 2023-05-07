import { Module } from '@nestjs/common';
import { LastTelemetryService } from './lasttelemetry.service';
import { LastTelemetryController } from './lasttelemetry.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LastTelemetryController],
  providers: [LastTelemetryService, PrismaService],
})
export class LastTelemetryModule {}
