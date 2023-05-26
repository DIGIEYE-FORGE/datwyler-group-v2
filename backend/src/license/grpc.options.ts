import { ClientOptions, Transport } from '@nestjs/microservices';

export const microservicesOption: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'license:2001',
    package: 'licensePackage',
    protoPath: 'src/licenseGrpc/license.proto',
    loader: {
      arrays: true,
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    },
  },
};
