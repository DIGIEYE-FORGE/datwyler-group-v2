import { Module } from '@nestjs/common';
import { VmqAuthAclService } from './vmqauthacl.service';
import { VmqAuthAclController } from './vmqauthacl.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VmqAuthAclController],
  providers: [VmqAuthAclService, PrismaService],
})
export class VmqAuthAclModule {}
