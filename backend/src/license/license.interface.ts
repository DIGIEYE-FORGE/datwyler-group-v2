import { Observable } from 'rxjs';

export interface LicenseInterface {
  AffectType(data: LicenseRequest): Observable<ResultRequestAffectation>;
  DeleteAffictation(
    data: DeleteAffictationRequest,
  ): Observable<ResultRequestAffectation>;
}
export enum Type {
  USERS,
  DATACENTER,
}

export interface DeleteAffictationRequest {
  type: Type;
  typeId: number;
}
export interface LicenseRequest {
  type: Type;
  tenantId: number;
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
