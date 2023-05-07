// Original file: tenant-liscence.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AffectUserRequest as _licensePackage_AffectUserRequest, AffectUserRequest__Output as _licensePackage_AffectUserRequest__Output } from '../licensePackage/AffectUserRequest';
import type { DeleteAffictaionRequest as _licensePackage_DeleteAffictaionRequest, DeleteAffictaionRequest__Output as _licensePackage_DeleteAffictaionRequest__Output } from '../licensePackage/DeleteAffictaionRequest';
import type { DeleteAffictaionResponse as _licensePackage_DeleteAffictaionResponse, DeleteAffictaionResponse__Output as _licensePackage_DeleteAffictaionResponse__Output } from '../licensePackage/DeleteAffictaionResponse';
import type { LicenseRequest as _licensePackage_LicenseRequest, LicenseRequest__Output as _licensePackage_LicenseRequest__Output } from '../licensePackage/LicenseRequest';
import type { LicenseResponse as _licensePackage_LicenseResponse, LicenseResponse__Output as _licensePackage_LicenseResponse__Output } from '../licensePackage/LicenseResponse';
import type { ResultRequestAffectation as _licensePackage_ResultRequestAffectation, ResultRequestAffectation__Output as _licensePackage_ResultRequestAffectation__Output } from '../licensePackage/ResultRequestAffectation';

export interface LicenseServiceClient extends grpc.Client {
  AffectUser(argument: _licensePackage_AffectUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  AffectUser(argument: _licensePackage_AffectUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  AffectUser(argument: _licensePackage_AffectUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  AffectUser(argument: _licensePackage_AffectUserRequest, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  affectUser(argument: _licensePackage_AffectUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  affectUser(argument: _licensePackage_AffectUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  affectUser(argument: _licensePackage_AffectUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  affectUser(argument: _licensePackage_AffectUserRequest, callback: grpc.requestCallback<_licensePackage_ResultRequestAffectation__Output>): grpc.ClientUnaryCall;
  
  DeleteAffictation(argument: _licensePackage_DeleteAffictaionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_DeleteAffictaionResponse__Output>): grpc.ClientUnaryCall;
  DeleteAffictation(argument: _licensePackage_DeleteAffictaionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_DeleteAffictaionResponse__Output>): grpc.ClientUnaryCall;
  DeleteAffictation(argument: _licensePackage_DeleteAffictaionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_DeleteAffictaionResponse__Output>): grpc.ClientUnaryCall;
  DeleteAffictation(argument: _licensePackage_DeleteAffictaionRequest, callback: grpc.requestCallback<_licensePackage_DeleteAffictaionResponse__Output>): grpc.ClientUnaryCall;
  deleteAffictation(argument: _licensePackage_DeleteAffictaionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_DeleteAffictaionResponse__Output>): grpc.ClientUnaryCall;
  deleteAffictation(argument: _licensePackage_DeleteAffictaionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_DeleteAffictaionResponse__Output>): grpc.ClientUnaryCall;
  deleteAffictation(argument: _licensePackage_DeleteAffictaionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_DeleteAffictaionResponse__Output>): grpc.ClientUnaryCall;
  deleteAffictation(argument: _licensePackage_DeleteAffictaionRequest, callback: grpc.requestCallback<_licensePackage_DeleteAffictaionResponse__Output>): grpc.ClientUnaryCall;
  
  GetLicensePermission(argument: _licensePackage_LicenseRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_LicenseResponse__Output>): grpc.ClientUnaryCall;
  GetLicensePermission(argument: _licensePackage_LicenseRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_LicenseResponse__Output>): grpc.ClientUnaryCall;
  GetLicensePermission(argument: _licensePackage_LicenseRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_LicenseResponse__Output>): grpc.ClientUnaryCall;
  GetLicensePermission(argument: _licensePackage_LicenseRequest, callback: grpc.requestCallback<_licensePackage_LicenseResponse__Output>): grpc.ClientUnaryCall;
  getLicensePermission(argument: _licensePackage_LicenseRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_LicenseResponse__Output>): grpc.ClientUnaryCall;
  getLicensePermission(argument: _licensePackage_LicenseRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_licensePackage_LicenseResponse__Output>): grpc.ClientUnaryCall;
  getLicensePermission(argument: _licensePackage_LicenseRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_licensePackage_LicenseResponse__Output>): grpc.ClientUnaryCall;
  getLicensePermission(argument: _licensePackage_LicenseRequest, callback: grpc.requestCallback<_licensePackage_LicenseResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface LicenseServiceHandlers extends grpc.UntypedServiceImplementation {
  AffectUser: grpc.handleUnaryCall<_licensePackage_AffectUserRequest__Output, _licensePackage_ResultRequestAffectation>;
  
  DeleteAffictation: grpc.handleUnaryCall<_licensePackage_DeleteAffictaionRequest__Output, _licensePackage_DeleteAffictaionResponse>;
  
  GetLicensePermission: grpc.handleUnaryCall<_licensePackage_LicenseRequest__Output, _licensePackage_LicenseResponse>;
  
}

export interface LicenseServiceDefinition extends grpc.ServiceDefinition {
  AffectUser: MethodDefinition<_licensePackage_AffectUserRequest, _licensePackage_ResultRequestAffectation, _licensePackage_AffectUserRequest__Output, _licensePackage_ResultRequestAffectation__Output>
  DeleteAffictation: MethodDefinition<_licensePackage_DeleteAffictaionRequest, _licensePackage_DeleteAffictaionResponse, _licensePackage_DeleteAffictaionRequest__Output, _licensePackage_DeleteAffictaionResponse__Output>
  GetLicensePermission: MethodDefinition<_licensePackage_LicenseRequest, _licensePackage_LicenseResponse, _licensePackage_LicenseRequest__Output, _licensePackage_LicenseResponse__Output>
}
