import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CredentialController } from './credential.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CredentialController],
  providers: [CredentialService, PrismaService],
})
export class CredentialModule {}
