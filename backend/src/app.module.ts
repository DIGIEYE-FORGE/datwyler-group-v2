import { ReportModule } from './report/report.module';
import { GroupModule } from './group/group.module';
import { VmqAuthAclModule } from './vmqauthacl/vmqauthacl.module';

import { ProtocolModule } from './protocol/protocol.module';
import { AlertModule } from './alert/alert.module';
import { UserModule } from './user/user.module';
import { LastTelemetryModule } from './lasttelemetry/lasttelemetry.module';
import { AttributeModule } from './attribute/attribute.module';
import { DeviceModule } from './device/device.module';
import { CredentialModule } from './credential/credential.module';
import { DeviceProfileModule } from './deviceprofile/deviceprofile.module';
import { FirmwareModule } from './firmware/firmware.module';
import { DeviceTypeModule } from './devicetype/devicetype.module';
import { join } from 'path';
import { DecoderModule } from './decoder/decoder.module';
import { MulterModule } from '@nestjs/platform-express';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';

import { PrismaService } from './prisma.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TagsModule } from './tags/tags.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { MultitenancyService } from './multitenancy/multitanancy.service';
import { MultitenancyMiddleware } from './common/middleware/multitenancy.middleware';
import { LicenseModule } from './license/license.module';
import { MultitenancyModule } from './multitenancy/multitenancy.module';
import { LicenseService } from './license/license.service';
import { json, urlencoded } from 'express';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ReportModule,
    GroupModule,
    ConfigModule.forRoot(),
    VmqAuthAclModule,
    ProtocolModule,
    AlertModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    TagsModule,
    AttributeModule,
    LastTelemetryModule,
    DeviceModule,
    CredentialModule,
    DeviceProfileModule,
    FirmwareModule,

    DeviceTypeModule,
    MultitenancyModule,
    DecoderModule,
    LicenseModule,
    AuthModule,
    MulterModule.register({
      dest: './uploads',
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AuthService, MultitenancyService, LicenseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(json(), urlencoded({ extended: true })).forRoutes('*');
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer.apply(MultitenancyMiddleware).forRoutes(
      { path: '/device', method: RequestMethod.ALL },
      {
        path: '/group',
        method: RequestMethod.ALL,
      },
      {
        path: '/deviceProfile',
        method: RequestMethod.ALL,
      },
      {
        path: '/decoder',
        method: RequestMethod.ALL,
      },
      {
        path: '/firmware',
        method: RequestMethod.ALL,
      },
      {
        path: '/report/generate',
        method: RequestMethod.ALL,
      },
      {
        path: '/report',
        method: RequestMethod.ALL,
      },
    );
  }
}
