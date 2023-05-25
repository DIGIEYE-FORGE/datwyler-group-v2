// Original file: user-tenant.proto


// Original file: user-tenant.proto

export const _multi_tenancy_package_Tenant_Role = {
  ADMIN: 0,
  USER: 1,
} as const;

export type _multi_tenancy_package_Tenant_Role =
  | 'ADMIN'
  | 0
  | 'USER'
  | 1

export type _multi_tenancy_package_Tenant_Role__Output = typeof _multi_tenancy_package_Tenant_Role[keyof typeof _multi_tenancy_package_Tenant_Role]

export interface Tenant {
  'id'?: (number);
  'name'?: (string);
  'role'?: (_multi_tenancy_package_Tenant_Role);
}

export interface Tenant__Output {
  'id'?: (number);
  'name'?: (string);
  'role'?: (_multi_tenancy_package_Tenant_Role__Output);
}
