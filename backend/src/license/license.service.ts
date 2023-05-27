import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microservicesOption } from './grpc.options';
import { Observable } from 'rxjs';

import { LicenseInterface, Type } from './license.interface';
@Injectable()
export class LicenseService implements OnModuleInit {
  @Client(microservicesOption)
  private client: ClientGrpc;
  private lisenceService: LicenseInterface;

  onModuleInit() {
    this.lisenceService =
      this.client.getService<LicenseInterface>('LicenseService');
  }

  AffectType(data: {
    type: Type;
    tenantId: number;
    typeId: number;
  }): Observable<any> {
    return this.lisenceService.AffectType(data);
  }

  DeleteAffictation(data: { type: Type; typeId: number }): Observable<any> {
    return this.lisenceService.DeleteAffictation(data);
  }
}
