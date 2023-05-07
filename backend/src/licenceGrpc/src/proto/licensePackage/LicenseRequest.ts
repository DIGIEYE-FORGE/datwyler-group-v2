// Original file: license.proto


// Original file: license.proto

export const _licensePackage_LicenseRequest_Type = {
  USER: 0,
  ADMIN: 1,
  DATACENTER: 2,
} as const;

export type _licensePackage_LicenseRequest_Type =
  | 'USER'
  | 0
  | 'ADMIN'
  | 1
  | 'DATACENTER'
  | 2

export type _licensePackage_LicenseRequest_Type__Output = typeof _licensePackage_LicenseRequest_Type[keyof typeof _licensePackage_LicenseRequest_Type]

export interface LicenseRequest {
  'tenantId'?: (number);
  'type'?: (_licensePackage_LicenseRequest_Type);
}

export interface LicenseRequest__Output {
  'tenantId'?: (number);
  'type'?: (_licensePackage_LicenseRequest_Type__Output);
}
