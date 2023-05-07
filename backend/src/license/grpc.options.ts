import { ClientOptions, Transport } from '@nestjs/microservices';

export const microservicesOption: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_LICENCE_SERVICE,
    package: 'licensePackage',
    protoPath: 'src/licenceGrpc/license.proto',
  },
};
