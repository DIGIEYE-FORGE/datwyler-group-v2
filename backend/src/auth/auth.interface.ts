import { Observable } from 'rxjs';

export interface AuthInterface {
  Verify(data: AuthClient): Observable<AutchResponse>;
}

export interface AuthClient {
  accessToken: string;
}
export interface AutchResponse {
  id?: number;
  email?: string;
}
