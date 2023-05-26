import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaService } from 'src/prisma.service';
import { LicenseService } from 'src/license/license.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, PrismaService, LicenseService],
})
export class GroupModule {}
