// Original file: license.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AffectTypeRequest as _licensePackage_AffectTypeRequest, AffectTypeRequest__Output as _licensePackage_AffectTypeRequest__Output } from '../licensePackage/AffectTypeRequest';
import type { AuthPermissionRequest as _licensePackage_AuthPermissionRequest, AuthPermissionRequest__Output as _licensePackage_AuthPermissionRequest__Output } from '../licensePackage/AuthPermissionRequest';
import type { AuthPermissionResponse as _licensePackage_AuthPermissionResponse, AuthPermissionResponse__Output as _licensePackage_AuthPermissionResponse__Output } from '../licensePackage/AuthPermissionResponse';
import type { ResultRequestAffectation as _licensePackage_ResultRequestAffectation, ResultRequestAffectation__Output as _licensePackage_ResultRequestAffectation__Output } from '../licensePackage/ResultRequestAffectation';

export interface LicenseServiceClient extends grpc.Client {
  AffectType(argument: _licensePackage_AffectTypeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  AffectType(argument: _licensePackage_AffectTypeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  AffectType(argument: _licensePackage_AffectTypeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  AffectType(argument: _licensePackage_AffectTypeRequest, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  affectType(argument: _licensePackage_AffectTypeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  affectType(argument: _licensePackage_AffectTypeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  affectType(argument: _licensePackage_AffectTypeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  affectType(argument: _licensePackage_AffectTypeRequest, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  
  AuthPermission(argument: _licensePackage_AuthPermissionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_AuthPermissionResponse__Output>): grpc.ClientUnaryCall;
  AuthPermission(argument: _licensePackage_AuthPermissionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_AuthPermissionResponse__Output>): grpc.ClientUnaryCall;
  AuthPermission(argument: _licensePackage_AuthPermissionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_AuthPermissionResponse__Output>): grpc.ClientUnaryCall;
  AuthPermission(argument: _licensePackage_AuthPermissionRequest, callback: grpc.requestCallback<_licensePackage_AuthPermissionResponse__Output>): grpc.ClientUnaryCall;
  authPermission(argument: _licensePackage_AuthPermissionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_AuthPermissionResponse__Output>): grpc.ClientUnaryCall;
  authPermission(argument: _licensePackage_AuthPermissionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_AuthPermissionResponse__Output>): grpc.ClientUnaryCall;
  authPermission(argument: _licensePackage_AuthPermissionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_AuthPermissionResponse__Output>): grpc.ClientUnaryCall;
  authPermission(argument: _licensePackage_AuthPermissionRequest, callback: grpc.requestCallback<_licensePackage_AuthPermissionResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteAffictation(argument: _licensePackage_AffectTypeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  DeleteAffictation(argument: _licensePackage_AffectTypeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  DeleteAffictation(argument: _licensePackage_AffectTypeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  DeleteAffictation(argument: _licensePackage_AffectTypeRequest, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  deleteAffictation(argument: _licensePackage_AffectTypeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  deleteAffictation(argument: _licensePackage_AffectTypeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  deleteAffictation(argument: _licensePackage_AffectTypeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  deleteAffictation(argument: _licensePackage_AffectTypeRequest, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  
}

export interface LicenseServiceHandlers extends grpc.UntypedServiceImplementation {
  AffectType: grpc.handleUnaryCall<_licensePackage_AffectTypeRequest__Output, _licensePackage_ResultRequestAffectation>;
  
  AuthPermission: grpc.handleUnaryCall<_licensePackage_AuthPermissionRequest__Output, _licensePackage_AuthPermissionResponse>;
  
  DeleteAffictation: grpc.handleUnaryCall<_licensePackage_AffectTypeRequest__Output, _licensePackage_ResultRequestAffectation>;
  
}

export interface LicenseServiceDefinition extends grpc.ServiceDefinition {
  AffectType: MethodDefinition<_licensePackage_AffectTypeRequest, _licensePackage_ResultRequestAffectation, _licensePackage_AffectTypeRequest__Output, _licensePackage_ResultRequestAffectation__Output>
  AuthPermission: MethodDefinition<_licensePackage_AuthPermissionRequest, _licensePackage_AuthPermissionResponse, _licensePackage_AuthPermissionRequest__Output, _licensePackage_AuthPermissionResponse__Output>
  DeleteAffictation: MethodDefinition<_licensePackage_AffectTypeRequest, _licensePackage_ResultRequestAffectation, _licensePackage_AffectTypeRequest__Output, _licensePackage_ResultRequestAffectation__Output>
}
