import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microservicesOption } from './grpc.options';
import { Observable } from 'rxjs';
import { MultiTenancyInterface } from './multitanancy.interface';

@Injectable()
export class MultitenancyService implements OnModuleInit {
  @Client(microservicesOption)
  private client: ClientGrpc;
  private authService: MultiTenancyInterface;

  onModuleInit() {
    this.authService =
      this.client.getService<MultiTenancyInterface>('MultiTenancy');
  }

  MultiTenancy(data: { userId: number; tenantId?: number }): Observable<any> {
    return this.authService.UserTenant(data);
  }
}
