// Original file: auth.proto

import type { Any as _google_protobuf_Any, Any__Output as _google_protobuf_Any__Output } from '../google/protobuf/Any';

export interface User {
  'id'?: (number);
  'firstName'?: (string);
  'lastName'?: (string);
  'email'?: (string);
  'password'?: (string);
  'avatar'?: (_google_protobuf_Any | null);
}

export interface User__Output {
  'id'?: (number);
  'firstName'?: (string);
  'lastName'?: (string);
  'email'?: (string);
  'password'?: (string);
  'avatar'?: (_google_protobuf_Any__Output);
}
