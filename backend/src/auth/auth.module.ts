import { Module } from '@nestjs/common';
// import { CredentialService } from './credential.service';
// import { CredentialController } from './credential.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AuthModule {}
