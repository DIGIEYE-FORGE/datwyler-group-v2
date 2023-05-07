// Original file: auth.proto

export interface LogoutRequest {
  accessToken?: string;
  refreshToken?: string;
}

export interface LogoutRequest__Output {
  accessToken?: string;
  refreshToken?: string;
}
