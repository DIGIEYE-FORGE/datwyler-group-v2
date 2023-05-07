// Original file: license.proto

import type { LicenseRequest as _licensePackage_LicenseRequest, LicenseRequest__Output as _licensePackage_LicenseRequest__Output } from '../licensePackage/LicenseRequest';

export interface AffectUserRequest {
  'licenseRequest'?: (_licensePackage_LicenseRequest | null);
  'licenseId'?: (number);
  'injectedId'?: (number);
}

export interface AffectUserRequest__Output {
  'licenseRequest'?: (_licensePackage_LicenseRequest__Output);
  'licenseId'?: (number);
  'injectedId'?: (number);
}
