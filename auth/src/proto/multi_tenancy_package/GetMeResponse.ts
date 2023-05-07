// Original file: user-tenant.proto

import type { Tenant as _multi_tenancy_package_Tenant, Tenant__Output as _multi_tenancy_package_Tenant__Output } from '../multi_tenancy_package/Tenant';

export interface GetMeResponse {
  'tenants'?: (_multi_tenancy_package_Tenant)[];
}

export interface GetMeResponse__Output {
  'tenants'?: (_multi_tenancy_package_Tenant__Output)[];
}
