// Original file: auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetUsersRequest as _authPackage_GetUsersRequest, GetUsersRequest__Output as _authPackage_GetUsersRequest__Output } from '../authPackage/GetUsersRequest';
import type { GetUsersResponse as _authPackage_GetUsersResponse, GetUsersResponse__Output as _authPackage_GetUsersResponse__Output } from '../authPackage/GetUsersResponse';
import type { VerifyRequest as _authPackage_VerifyRequest, VerifyRequest__Output as _authPackage_VerifyRequest__Output } from '../authPackage/VerifyRequest';
import type { VerifyResponse as _authPackage_VerifyResponse, VerifyResponse__Output as _authPackage_VerifyResponse__Output } from '../authPackage/VerifyResponse';

export interface AuthClient extends grpc.Client {
  GetUsers(argument: _authPackage_GetUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _authPackage_GetUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _authPackage_GetUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  GetUsers(argument: _authPackage_GetUsersRequest, callback: grpc.requestCallback<_authPackage_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _authPackage_GetUsersRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _authPackage_GetUsersRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _authPackage_GetUsersRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  getUsers(argument: _authPackage_GetUsersRequest, callback: grpc.requestCallback<_authPackage_GetUsersResponse__Output>): grpc.ClientUnaryCall;
  
  Verify(argument: _authPackage_VerifyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  Verify(argument: _authPackage_VerifyRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  Verify(argument: _authPackage_VerifyRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  Verify(argument: _authPackage_VerifyRequest, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  verify(argument: _authPackage_VerifyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  verify(argument: _authPackage_VerifyRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  verify(argument: _authPackage_VerifyRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  verify(argument: _authPackage_VerifyRequest, callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthHandlers extends grpc.UntypedServiceImplementation {
  GetUsers: grpc.handleUnaryCall<_authPackage_GetUsersRequest__Output, _authPackage_GetUsersResponse>;
  
  Verify: grpc.handleUnaryCall<_authPackage_VerifyRequest__Output, _authPackage_VerifyResponse>;
  
}

export interface AuthDefinition extends grpc.ServiceDefinition {
  GetUsers: MethodDefinition<_authPackage_GetUsersRequest, _authPackage_GetUsersResponse, _authPackage_GetUsersRequest__Output, _authPackage_GetUsersResponse__Output>
  Verify: MethodDefinition<_authPackage_VerifyRequest, _authPackage_VerifyResponse, _authPackage_VerifyRequest__Output, _authPackage_VerifyResponse__Output>
}
