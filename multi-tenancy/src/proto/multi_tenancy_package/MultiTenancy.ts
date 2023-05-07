// Original file: user-tenant.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { UserTenantRequest as _multi_tenancy_package_UserTenantRequest, UserTenantRequest__Output as _multi_tenancy_package_UserTenantRequest__Output } from '../multi_tenancy_package/UserTenantRequest';
import type { UserTenantResponse as _multi_tenancy_package_UserTenantResponse, UserTenantResponse__Output as _multi_tenancy_package_UserTenantResponse__Output } from '../multi_tenancy_package/UserTenantResponse';
import type { getMeRequest as _multi_tenancy_package_getMeRequest, getMeRequest__Output as _multi_tenancy_package_getMeRequest__Output } from '../multi_tenancy_package/getMeRequest';
import type { getMeResponse as _multi_tenancy_package_getMeResponse, getMeResponse__Output as _multi_tenancy_package_getMeResponse__Output } from '../multi_tenancy_package/getMeResponse';

export interface MultiTenancyClient extends grpc.Client {
  GetMe(argument: _multi_tenancy_package_getMeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_multi_tenancy_package_getMeResponse__Output>): grpc.ClientUnaryCall;
  GetMe(argument: _multi_tenancy_package_getMeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_multi_tenancy_package_getMeResponse__Output>): grpc.ClientUnaryCall;
  GetMe(argument: _multi_tenancy_package_getMeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_multi_tenancy_package_getMeResponse__Output>): grpc.ClientUnaryCall;
  GetMe(argument: _multi_tenancy_package_getMeRequest, callback: grpc.requestCallback<_multi_tenancy_package_getMeResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _multi_tenancy_package_getMeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_multi_tenancy_package_getMeResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _multi_tenancy_package_getMeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_multi_tenancy_package_getMeResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _multi_tenancy_package_getMeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_multi_tenancy_package_getMeResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _multi_tenancy_package_getMeRequest, callback: grpc.requestCallback<_multi_tenancy_package_getMeResponse__Output>): grpc.ClientUnaryCall;
  
  UserTenant(argument: _multi_tenancy_package_UserTenantRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_multi_tenancy_package_UserTenantResponse__Output>): grpc.ClientUnaryCall;
  UserTenant(argument: _multi_tenancy_package_UserTenantRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_multi_tenancy_package_UserTenantResponse__Output>): grpc.ClientUnaryCall;
  UserTenant(argument: _multi_tenancy_package_UserTenantRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_multi_tenancy_package_UserTenantResponse__Output>): grpc.ClientUnaryCall;
  UserTenant(argument: _multi_tenancy_package_UserTenantRequest, callback: grpc.requestCallback<_multi_tenancy_package_UserTenantResponse__Output>): grpc.ClientUnaryCall;
  userTenant(argument: _multi_tenancy_package_UserTenantRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_multi_tenancy_package_UserTenantResponse__Output>): grpc.ClientUnaryCall;
  userTenant(argument: _multi_tenancy_package_UserTenantRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_multi_tenancy_package_UserTenantResponse__Output>): grpc.ClientUnaryCall;
  userTenant(argument: _multi_tenancy_package_UserTenantRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_multi_tenancy_package_UserTenantResponse__Output>): grpc.ClientUnaryCall;
  userTenant(argument: _multi_tenancy_package_UserTenantRequest, callback: grpc.requestCallback<_multi_tenancy_package_UserTenantResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface MultiTenancyHandlers extends grpc.UntypedServiceImplementation {
  GetMe: grpc.handleUnaryCall<_multi_tenancy_package_getMeRequest__Output, _multi_tenancy_package_getMeResponse>;
  
  UserTenant: grpc.handleUnaryCall<_multi_tenancy_package_UserTenantRequest__Output, _multi_tenancy_package_UserTenantResponse>;
  
}

export interface MultiTenancyDefinition extends grpc.ServiceDefinition {
  GetMe: MethodDefinition<_multi_tenancy_package_getMeRequest, _multi_tenancy_package_getMeResponse, _multi_tenancy_package_getMeRequest__Output, _multi_tenancy_package_getMeResponse__Output>
  UserTenant: MethodDefinition<_multi_tenancy_package_UserTenantRequest, _multi_tenancy_package_UserTenantResponse, _multi_tenancy_package_UserTenantRequest__Output, _multi_tenancy_package_UserTenantResponse__Output>
}
