import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { LicenseServiceClient as _licensePackage_LicenseServiceClient, LicenseServiceDefinition as _licensePackage_LicenseServiceDefinition } from './licensePackage/LicenseService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  licensePackage: {
    AffectTypeRequest: MessageTypeDefinition
    AuthPermissionRequest: MessageTypeDefinition
    AuthPermissionResponse: MessageTypeDefinition
    DeleteAffictaionRequest: MessageTypeDefinition
    DeleteAffictaionResponse: MessageTypeDefinition
    Empty: MessageTypeDefinition
    LicenseRequest: MessageTypeDefinition
    LicenseResponse: MessageTypeDefinition
    LicenseService: SubtypeConstructor<typeof grpc.Client, _licensePackage_LicenseServiceClient> & { service: _licensePackage_LicenseServiceDefinition }
    ResultRequestAffectation: MessageTypeDefinition
  }
}

