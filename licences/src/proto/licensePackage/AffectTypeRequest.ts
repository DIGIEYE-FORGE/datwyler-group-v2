// Original file: license.proto


// Original file: license.proto

export const _licensePackage_AffectTypeRequest_Type = {
  USERS: 0,
  DATACENTER: 1,
} as const;

export type _licensePackage_AffectTypeRequest_Type =
  | 'USERS'
  | 0
  | 'DATACENTER'
  | 1

export type _licensePackage_AffectTypeRequest_Type__Output = typeof _licensePackage_AffectTypeRequest_Type[keyof typeof _licensePackage_AffectTypeRequest_Type]

export interface AffectTypeRequest {
  'type'?: (_licensePackage_AffectTypeRequest_Type);
  'tenantId'?: (number);
  'typeId'?: (number);
}

export interface AffectTypeRequest__Output {
  'type'?: (_licensePackage_AffectTypeRequest_Type__Output);
  'tenantId'?: (number);
  'typeId'?: (number);
}
