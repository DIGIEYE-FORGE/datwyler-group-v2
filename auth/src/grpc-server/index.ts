import env from "../common/env";
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/auth";
import logger from "../common/logger";
import { handlers } from "./services";
const PROTO_FILE = path.resolve(__dirname, "..", "..", "auth.proto");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE)
);

const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const authPackage = grpcObject.authPackage;

class GrpcServer {
  private server: grpc.Server;
  constructor() {
    this.server = new grpc.Server();
  }

  public start() {
    this.server.addService(authPackage.Auth.service, handlers);
    this.server.bindAsync(
      `0.0.0.0:${env.GRPC_PORT}`,
      grpc.ServerCredentials.createInsecure(),
      (err, PORT) => {
        if (err) {
          return;
        }
        logger.info(`grpc Server running on port ${env.GRPC_PORT}`);
        this.server.start();
      }
    );
  }
}

export default GrpcServer;
