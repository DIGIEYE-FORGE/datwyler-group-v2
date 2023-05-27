// Original file: tenant-liscence.proto


// Original file: tenant-liscence.proto

export const _licensePackage_DeleteAffictationRequest_Type = {
  USERS: 0,
  DATACENTER: 1,
} as const;

export type _licensePackage_DeleteAffictationRequest_Type =
  | 'USERS'
  | 0
  | 'DATACENTER'
  | 1

export type _licensePackage_DeleteAffictationRequest_Type__Output = typeof _licensePackage_DeleteAffictationRequest_Type[keyof typeof _licensePackage_DeleteAffictationRequest_Type]

export interface DeleteAffictationRequest {
  'type'?: (_licensePackage_DeleteAffictationRequest_Type);
  'typeId'?: (number);
}

export interface DeleteAffictationRequest__Output {
  'type'?: (_licensePackage_DeleteAffictationRequest_Type__Output);
  'typeId'?: (number);
}
