import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/tenant-liscence";
import env from "../commun/env";
import { LicenseServiceClient } from "../proto/licensePackage/LicenseService";

import { ResultRequestAffectation__Output } from "../proto/licensePackage/ResultRequestAffectation";
import logger from "../commun/logger";
import { AffectTypeRequest } from "../proto/licensePackage/AffectTypeRequest";
import { DeleteAffictationRequest } from "../proto/licensePackage/DeleteAffictationRequest";
const PROTO_FILE = path.resolve(__dirname, "..", "..", "tenant-liscence.proto");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE)
);
const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

class GrpcClient {
  private client: LicenseServiceClient;
  constructor() {
    this.client = new grpcObject.licensePackage.LicenseService(
      env.LISCENSE_SEVER_URL,
      grpc.credentials.createInsecure()
    );
  }

  public start() {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 5);
    let maxAttempts = 200;
    let attempts = 0;
    const interval = setInterval(() => {
      logger.info("Connecting to license client...");
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        logger.error("License client not ready");
        return;
      }
      attempts++;
      this.client.waitForReady(deadline, (err) => {
        if (err) {
          logger.error("License client not ready:", err);
          return;
        }
        logger.info("License client ready");
        clearInterval(interval);
      });
    }, 1000);
  }


  public AffectLicense(
    data: AffectTypeRequest
  ): Promise<ResultRequestAffectation__Output | undefined> {
    return new Promise((resolve, reject) => {
      this.client.affectType(data, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  public DeleteAffictation(
    data: DeleteAffictationRequest): Promise<ResultRequestAffectation__Output | undefined> {
    return new Promise((resolve, reject) => {
      this.client.deleteAffictation(data, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}





const licenseClient = new GrpcClient();
licenseClient.start();

export default licenseClient;
