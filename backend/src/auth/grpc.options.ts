import { ClientOptions, Transport } from '@nestjs/microservices';

export const microservicesOption: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_AUTH_SERVICE,
    package: 'authPackage',
    protoPath: 'src/grpc/auth.proto',
  },
};
