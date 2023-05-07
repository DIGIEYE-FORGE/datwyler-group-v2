// Original file: auth.proto

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  VerifyRequest as _authPackage_VerifyRequest,
  VerifyRequest__Output as _authPackage_VerifyRequest__Output,
} from './VerifyRequest';
import type {
  VerifyResponse as _authPackage_VerifyResponse,
  VerifyResponse__Output as _authPackage_VerifyResponse__Output,
} from './VerifyResponse';

export interface AuthClient extends grpc.Client {
  Verify(
    argument: _authPackage_VerifyRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>,
  ): grpc.ClientUnaryCall;
  Verify(
    argument: _authPackage_VerifyRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>,
  ): grpc.ClientUnaryCall;
  Verify(
    argument: _authPackage_VerifyRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>,
  ): grpc.ClientUnaryCall;
  Verify(
    argument: _authPackage_VerifyRequest,
    callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>,
  ): grpc.ClientUnaryCall;
  verify(
    argument: _authPackage_VerifyRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>,
  ): grpc.ClientUnaryCall;
  verify(
    argument: _authPackage_VerifyRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>,
  ): grpc.ClientUnaryCall;
  verify(
    argument: _authPackage_VerifyRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>,
  ): grpc.ClientUnaryCall;
  verify(
    argument: _authPackage_VerifyRequest,
    callback: grpc.requestCallback<_authPackage_VerifyResponse__Output>,
  ): grpc.ClientUnaryCall;
}

export interface AuthHandlers extends grpc.UntypedServiceImplementation {
  Verify: grpc.handleUnaryCall<
    _authPackage_VerifyRequest__Output,
    _authPackage_VerifyResponse
  >;
}

export interface AuthDefinition extends grpc.ServiceDefinition {
  Verify: MethodDefinition<
    _authPackage_VerifyRequest,
    _authPackage_VerifyResponse,
    _authPackage_VerifyRequest__Output,
    _authPackage_VerifyResponse__Output
  >;
}
