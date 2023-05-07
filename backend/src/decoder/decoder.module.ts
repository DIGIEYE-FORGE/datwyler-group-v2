import { Module } from '@nestjs/common';
import { DecoderService } from './decoder.service';
import { DecoderController } from './decoder.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DecoderController],
  providers: [DecoderService, PrismaService],
})
export class DecoderModule {}
