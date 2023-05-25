import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/user-tenant";
import env from "../common/env";
import { MultiTenancyClient } from "../proto/multi_tenancy_package/MultiTenancy";
import logger from "../common/logger";
import {
  getMeRequest,
  getMeRequest__Output,
} from "../proto/multi_tenancy_package/getMeRequest";
import {
  getMeResponse,
  getMeResponse__Output,
} from "../proto/multi_tenancy_package/getMeResponse";

const PROTO_FILE = path.resolve(__dirname, "..", "..", "user-tenant.proto");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE)
);

console.log("packageDefinition", packageDefinition);

const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

class GrpcClient {
  private client: MultiTenancyClient;
  constructor() {
    this.client = new grpcObject.multi_tenancy_package.MultiTenancy(
      env.GRPC_MULTI_SERVICE,
      grpc.credentials.createInsecure()
    );
  }

  public start() {
    const deadline = new Date();

    let maxAttempts = 200;
    let attempts = 0;
    deadline.setSeconds(deadline.getSeconds() + 5);
    const interval = setInterval(() => {
      logger.info("Connecting to Multi client...");
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        logger.error("Multi client not ready");
        throw new Error("Multi client not ready");
        return;
      }
      attempts++;
      this.client.waitForReady(deadline, (err) => {
        if (err) {
          return;
        }
        logger.info("Multi client ready");
        clearInterval(interval);
      });
    }, 1000);
  }

  public getUserTenants(
    data: getMeRequest
  ): Promise<getMeResponse__Output | undefined> {
    return new Promise((resolve, reject) => {
      this.client.GetMe(data, (err, res) => {
        console.log('getMe', res);

        if (err) {
          logger.error("UserTenant error: ", err);
          reject(err);
          return;
        }
        logger.info("UserTenant response: ", res);
        resolve(res);
      });
    });
  }
}
const multiTenancyClient = new GrpcClient();
multiTenancyClient.start();

export default multiTenancyClient;
