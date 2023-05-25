"use strict";
// import path from "path";
// import * as grpc from "@grpc/grpc-js";
// import * as protoLoader from "@grpc/proto-loader";
// import { ProtoGrpcType } from "./proto/license";
// import dontenv from "dotenv";
// dontenv.config();
// console.clear();
// const PROTO_PATH = path.join(__dirname, "license.proto");
// const packageDefinition = protoLoader.loadSync(
// 	path.resolve(__dirname, PROTO_PATH),
// );
// const grpcObject = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
// const licensePackage = grpcObject.licensePackage;
// const deadline = new Date();
// const client = new grpcObject.licensePackage.LicenseService(
// 	`host:2001`,
// 	grpc.credentials.createInsecure()
// );
// deadline.setSeconds(deadline.getSeconds() + 5);
// client.waitForReady(deadline, (err) => {
// 	if (err) {
// 		console.log("client not ready: ", err);
// 		return;
// 	}
// 	onClientReady();
// });
// function onClientReady() {
// 	client.GetLicensePermission(
// 		{
// 			tenantId: 1,
// 			// numbreUsers: 20,
// 		},
// 		(err, res) => {
// 			if (err) {
// 				console.log("error code", err.code);
// 				console.log("error message", err.message);
// 				return;
// 			}
// 		}
// 	);
// }
