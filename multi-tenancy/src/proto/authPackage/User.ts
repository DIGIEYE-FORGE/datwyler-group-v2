// Original file: auth.proto


// Original file: auth.proto

export const _authPackage_User_Role = {
  ADMIN: 0,
  USER: 1,
} as const;

export type _authPackage_User_Role =
  | 'ADMIN'
  | 0
  | 'USER'
  | 1

export type _authPackage_User_Role__Output = typeof _authPackage_User_Role[keyof typeof _authPackage_User_Role]

export interface User {
  'id'?: (number);
  'firstName'?: (string);
  'lastName'?: (string);
  'email'?: (string);
  'password'?: (string);
  'role'?: (_authPackage_User_Role);
  'tenantIds'?: (number)[];
}

export interface User__Output {
  'id'?: (number);
  'firstName'?: (string);
  'lastName'?: (string);
  'email'?: (string);
  'password'?: (string);
  'role'?: (_authPackage_User_Role__Output);
  'tenantIds'?: (number)[];
}
