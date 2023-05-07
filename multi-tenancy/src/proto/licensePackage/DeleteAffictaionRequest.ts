// Original file: tenant-liscence.proto

import type { LicenseRequest as _licensePackage_LicenseRequest, LicenseRequest__Output as _licensePackage_LicenseRequest__Output } from '../licensePackage/LicenseRequest';

export interface DeleteAffictaionRequest {
  'licenseRequest'?: (_licensePackage_LicenseRequest | null);
  'deletedId'?: (number);
}

export interface DeleteAffictaionRequest__Output {
  'licenseRequest'?: (_licensePackage_LicenseRequest__Output);
  'deletedId'?: (number);
}
