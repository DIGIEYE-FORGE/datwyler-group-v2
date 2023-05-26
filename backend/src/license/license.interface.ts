import { Observable } from 'rxjs';

export interface LicenseInterface {
  AffectType(data: LicenseRequest): Observable<ResultRequestAffectation>;
}
export enum Type {
  USERS,
  DATACENTER,
}

export interface LicenseRequest {
  tenantId: number;
  type: Type;
  typeId: number;
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
