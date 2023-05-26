import { Observable } from 'rxjs';

export interface LicenseInterface {
  GetLicensePermission(data: LicenseRequest): Observable<LicenseResponse>;
  // AffectType(data: AffectUserRequest): Observable<ResultRequestAffectation>;
  DeleteAffictaion(data: DeleteAffictaion);
}
export enum Type {
  USERS,
  DATACENTER,
}

export interface LicenseRequest {
  tenantId: number;
  type: Type;
}

export interface LicenseResponse {
  permission?: boolean;
  licenseId?: number;
}

export interface DeleteAffictaion {
  licenseRequest: LicenseRequest;
  deletedId: number;
}

export interface AffectTypeRequest {
  licenseRequest: LicenseRequest;
}

export interface ResultRequestAffectation {
  result: boolean;
}
