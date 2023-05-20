import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/auth";
import env from "../commun/env";
import { AuthClient } from "../proto/authPackage/Auth";
import logger from "../commun/logger";
import { VerifyRequest } from "../proto/authPackage/VerifyRequest";
import { VerifyResponse__Output } from "../proto/authPackage/VerifyResponse";
import { GetUsersResponse__Output } from "../proto/authPackage/GetUsersResponse";

const PROTO_FILE = path.resolve(__dirname, "..", "..", "auth.proto");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE)
);
const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

class GrpcClient {
  private client: AuthClient;
  constructor() {
    this.client = new grpcObject.authPackage.Auth(
      env.AUTH_SEVER_URL,
      grpc.credentials.createInsecure()
    );
  }

  public start() {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 5);
    let maxAttempts = 200;
    let attempts = 0;
    const interval = setInterval(() => {
      logger.info("Connecting to auth client...");
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        logger.error("Auth client not ready");
        return;
      }
      attempts++;

      this.client.waitForReady(deadline, (err) => {
        if (err) {
          logger.error("Auth client not ready");
          return;
        }
        logger.info("Auth client ready");
        clearInterval(interval);
      });
    }, 1000);
  }

  public verify(
    data: VerifyRequest
  ): Promise<VerifyResponse__Output | undefined> {
    return new Promise((resolve, reject) => {
      this.client.Verify(data, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  public getUsers(data: {
    ids: number[];
  }): Promise<GetUsersResponse__Output | undefined> {
    return new Promise((resolve, reject) => {
      this.client.GetUsers(data, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}
const authClient = new GrpcClient();
authClient.start();

export default authClient;
