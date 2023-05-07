import { Observable } from 'rxjs';

export interface MultiTenancyInterface {
  UserTenant(data: UserTenantRequest): Observable<UserTenantResponse>;
}

export interface UserTenantRequest {
  userId?: number;
  tenantId?: number;
}

export interface UserTenantResponse {
  id?: number[];
}
