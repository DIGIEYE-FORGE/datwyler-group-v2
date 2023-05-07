import { Observable } from 'rxjs';

export interface LicenseInterface {
  GetLicensePermission(data: LicenseRequest): Observable<LicenseResponse>;
  AffectUser(data: AffectUserRequest): Observable<ResultRequestAffectation>;
  DeleteAffictaion(data: DeleteAffictaion);
}
export enum Type {
  USER,
  ADMIN,
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

export interface AffectUserRequest {
  licenseRequest: LicenseRequest;
  licenseId?: number;
  injectedId?: number;
}

export interface ResultRequestAffectation {
  result: boolean;
}
