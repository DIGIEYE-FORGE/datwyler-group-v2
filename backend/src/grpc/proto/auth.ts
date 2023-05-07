import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type {
  AuthClient as _authPackage_AuthClient,
  AuthDefinition as _authPackage_AuthDefinition,
} from './authPackage/Auth';

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype,
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  authPackage: {
    Auth: SubtypeConstructor<typeof grpc.Client, _authPackage_AuthClient> & {
      service: _authPackage_AuthDefinition;
    };
    VerifyRequest: MessageTypeDefinition;
    VerifyResponse: MessageTypeDefinition;
  };
}
