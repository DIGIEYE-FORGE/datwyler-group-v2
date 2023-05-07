import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MultiTenancyClient as _multi_tenancy_package_MultiTenancyClient, MultiTenancyDefinition as _multi_tenancy_package_MultiTenancyDefinition } from './multi_tenancy_package/MultiTenancy';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  multi_tenancy_package: {
    MultiTenancy: SubtypeConstructor<typeof grpc.Client, _multi_tenancy_package_MultiTenancyClient> & { service: _multi_tenancy_package_MultiTenancyDefinition }
    UserTenantRequest: MessageTypeDefinition
    UserTenantResponse: MessageTypeDefinition
  }
}

