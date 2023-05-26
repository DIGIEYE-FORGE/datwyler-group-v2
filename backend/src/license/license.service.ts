import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microservicesOption } from './grpc.options';
import { Observable } from 'rxjs';

import { DeleteAffictaion, LicenseInterface, Type } from './license.interface';
@Injectable()
export class LicenseService implements OnModuleInit {
  @Client(microservicesOption)
  private client: ClientGrpc;
  private lisenceService: LicenseInterface;

  onModuleInit() {
    this.lisenceService =
      this.client.getService<LicenseInterface>('LicenseService');
  }

  // checkData(data: { tenantId: number; type: Type }): Observable<any> {
  //   return this.lisenceService.GetLicensePermission(data);
  // }

  AffectType(data: {
    type: Type;
    tenantId: number;
    typeId: number;
  }): Observable<any> {
    return this.lisenceService.AffectType(data);
  }
  // affectUser(data: {
  //   licenseRequest: { tenantId: number; type: Type };
  //   licenseId?: number;
  //   injectedId?: number;
  // }): Observable<{
  //   result: boolean;
  // }> {
  //   return {
  //     result: true,
  //   }
  //   // return this.lisenceService.AffectUser(data);
  // }

  // deleteAffictaion(data: DeleteAffictaion) {
  //   return this.lisenceService.DeleteAffictaion(data);
  // }
}
