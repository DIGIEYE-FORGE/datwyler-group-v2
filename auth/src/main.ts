import app from "./http-server";
import env from "./common/env";
import logger from "./common/logger";
import GrpcServer from "./grpc-server";
import dontenv from "dotenv";
dontenv.config();
console.clear();

function main() {
  const grpcServer = new GrpcServer();
  grpcServer.start();
  app.listen(env.HTTP_PORT, () => {
    logger.info(`http server running on port ${env.HTTP_PORT}`);
  });
}

main();
