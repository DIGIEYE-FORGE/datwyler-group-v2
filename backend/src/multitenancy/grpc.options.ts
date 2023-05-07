import { ClientOptions, Transport } from '@nestjs/microservices';

export const microservicesOption: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_MULTI_SERVICE,
    package: 'multi_tenancy_package',
    protoPath: 'src/multitenancyGrpc/file.proto',
  },
};
