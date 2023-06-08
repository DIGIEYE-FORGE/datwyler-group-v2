import HttpServer from "./http-server";
import GrpcServer from "./grpc-server";

async function main() {
  const httpServer = new HttpServer();
  const grpcServer = new GrpcServer();
  httpServer.start();
  grpcServer.start();
}

main();

