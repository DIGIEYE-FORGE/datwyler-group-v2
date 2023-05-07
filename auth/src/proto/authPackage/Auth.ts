// Original file: auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddTenantRequest as _authPackage_AddTenantRequest, AddTenantRequest__Output as _authPackage_AddTenantRequest__Output } from '../authPackage/AddTenantRequest';
import type { AddTenantResponse as _authPackage_AddTenantResponse, AddTenantResponse__Output as _authPackage_AddTenantResponse__Output } from '../authPackage/AddTenantResponse';
import type { RemoveTenantRequest as _authPackage_RemoveTenantRequest, RemoveTenantRequest__Output as _authPackage_RemoveTenantRequest__Output } from '../authPackage/RemoveTenantRequest';
import type { RemoveTenantResponse as _authPackage_RemoveTenantResponse, RemoveTenantResponse__Output as _authPackage_RemoveTenantResponse__Output } from '../authPackage/RemoveTenantResponse';
import type { VerifyRequest as _authPackage_VerifyRequest, VerifyRequest__Output as _authPackage_VerifyRequest__Output } from '../authPackage/VerifyRequest';
import type { VerifyResponse as _authPackage_VerifyResponse, VerifyResponse__Output as _authPackage_VerifyResponse__Output } from '../authPackage/VerifyResponse';

export interface AuthClient extends grpc.Client {
  AddTenant(argument: _authPackage_AddTenantRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_AddTenantResponse__Output>): grpc.ClientUnaryCall;
  AddTenant(argument: _authPackage_AddTenantRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_AddTenantResponse__Output>): grpc.ClientUnaryCall;
  AddTenant(argument: _authPackage_AddTenantRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_AddTenantResponse__Output>): grpc.ClientUnaryCall;
  AddTenant(argument: _authPackage_AddTenantRequest, callback: grpc.requestCallback<_authPackage_AddTenantResponse__Output>): grpc.ClientUnaryCall;
  addTenant(argument: _authPackage_AddTenantRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_AddTenantResponse__Output>): grpc.ClientUnaryCall;
  addTenant(argument: _authPackage_AddTenantRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_AddTenantResponse__Output>): grpc.ClientUnaryCall;
  addTenant(argument: _authPackage_AddTenantRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_AddTenantResponse__Output>): grpc.ClientUnaryCall;
  addTenant(argument: _authPackage_AddTenantRequest, callback: grpc.requestCallback<_authPackage_AddTenantResponse__Output>): grpc.ClientUnaryCall;
  
  RemoveTenant(argument: _authPackage_RemoveTenantRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_RemoveTenantResponse__Output>): grpc.ClientUnaryCall;
  RemoveTenant(argument: _authPackage_RemoveTenantRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_RemoveTenantResponse__Output>): grpc.ClientUnaryCall;
  RemoveTenant(argument: _authPackage_RemoveTenantRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_RemoveTenantResponse__Output>): grpc.ClientUnaryCall;
  RemoveTenant(argument: _authPackage_RemoveTenantRequest, callback: grpc.requestCallback<_authPackage_RemoveTenantResponse__Output>): grpc.ClientUnaryCall;
  removeTenant(argument: _authPackage_RemoveTenantRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_RemoveTenantResponse__Output>): grpc.ClientUnaryCall;
  removeTenant(argument: _authPackage_RemoveTenantRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authPackage_RemoveTenantResponse__Output>): grpc.ClientUnaryCall;
  removeTenant(argument: _authPackage_RemoveTenantRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authPackage_RemoveTenantResponse__Output>): grpc.ClientUnaryCall;
  removeTenant(argument: _authPackage_RemoveTenantRequest, callback: grpc.requestCallback<_authPackage_RemoveTenantResponse__Output>): grpc.ClientUnaryCall;
  
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
  AddTenant: grpc.handleUnaryCall<_authPackage_AddTenantRequest__Output, _authPackage_AddTenantResponse>;
  
  RemoveTenant: grpc.handleUnaryCall<_authPackage_RemoveTenantRequest__Output, _authPackage_RemoveTenantResponse>;
  
  Verify: grpc.handleUnaryCall<_authPackage_VerifyRequest__Output, _authPackage_VerifyResponse>;
  
}

export interface AuthDefinition extends grpc.ServiceDefinition {
  AddTenant: MethodDefinition<_authPackage_AddTenantRequest, _authPackage_AddTenantResponse, _authPackage_AddTenantRequest__Output, _authPackage_AddTenantResponse__Output>
  RemoveTenant: MethodDefinition<_authPackage_RemoveTenantRequest, _authPackage_RemoveTenantResponse, _authPackage_RemoveTenantRequest__Output, _authPackage_RemoveTenantResponse__Output>
  Verify: MethodDefinition<_authPackage_VerifyRequest, _authPackage_VerifyResponse, _authPackage_VerifyRequest__Output, _authPackage_VerifyResponse__Output>
}
