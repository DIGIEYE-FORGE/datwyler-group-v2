import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/user-tenant";
import env from "../commun/env";
import logger from "../commun/logger";
import handlers from "./services";

const PROTO_FILE = path.resolve(__dirname, "..", "..", "user-tenant.proto");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE)
);

const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const userTenantPackage = grpcObject.multi_tenancy_package;

class GrpcServer {
  private server: grpc.Server;
  constructor() {
    this.server = new grpc.Server();
  }
  start() {
    this.server.addService(userTenantPackage.MultiTenancy.service, handlers);

    this.server.bindAsync(
      `0.0.0.0:${env.GRPC_PORT}`,
      grpc.ServerCredentials.createInsecure(),
      (err, PORT) => {
        if (err) {
          logger.error("grpc server error: ", err);
          return;
        }
        logger.info(`grpc server running on port ${env.GRPC_PORT}`);
        this.server.start();
      }
    );
  }
}

export default GrpcServer;
