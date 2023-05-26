import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/license";
import { PrismaClient } from "@prisma/client";
import { affectType, DeleteAffiType, delteAffictationType, protoType } from "../type";
import { LicenseServiceHandlers } from "../proto/licensePackage/LicenseService";
import { Any } from "@grpc/grpc-js/build/src/generated/google/protobuf/Any";
const PROTO_PATH = path.join(__dirname, "..","..", "license.proto");
import env from "../type_env";

const packageDefinition = protoLoader.loadSync(
	path.resolve(__dirname, PROTO_PATH),
);

const prisma = new PrismaClient();
const grpcObject = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;


const licensePackage = grpcObject.licensePackage;


export default function main() {
	const server = new grpc.Server();
	server.bindAsync(
		`0.0.0.0:2001`,
		grpc.ServerCredentials.createInsecure(),
		(err, port) => {
			if (err) {
				throw err;
			}
			console.log(`Server running on port ${port}`);
			server.start();
		}
	);
	getServers(server);
}

function getServers(server: grpc.Server) {
	server.addService(licensePackage.LicenseService.service, {
		AuthPermission: async (req:any, res:any) => {
			try{
			const {userId} = req.request;
			const license = await prisma.license.findFirst({
				where:{
					expiredAt:{
						gte: new Date()
					},
					users:{
						has: userId
					}
				}
			});
			if (license)
				res(null, {permission: true});
			else
				res(null, {permission: false});
			}
			catch(err){
				res({
					code: grpc.status.INTERNAL,
					message: JSON.stringify(err),
				  });
			}
		},
		GetLicensePermission: async (req:any, res:any) => {
		},
		AffectType: async (req:any, res:any) => {
			console.log(req.request);
			return res(null, {result: true});
			
			// try{
			// 	const {type,tenantId,typeId} = req.request;
			// 	if (type == "USERS"){
			// 		const license = await prisma.license.findFirst({
			// 			where:{
			// 				tenantId: tenantId,
			// 				numberOfUsers:{
			// 					gte: 1
			// 				},
			// 				expiredAt:{
			// 					gte: new Date()
			// 				}
			// 			}
			// 		})
			// 		if (license){
			// 			await prisma.license.update({
			// 				where:{
			// 					id: license.id
			// 				},
			// 				data:{
			// 					numberOfUsers: license.numberOfUsers - 1,
			// 					users:{
			// 						push: typeId
			// 					}
			// 				}
			// 			});
			// 			res(null, {result: true});
			// 		}
			// 		else res(null, {result: false});


			// 	}
			// 	else if (type == "DATACENTER"){
			// 	// 	const license = await prisma.license.findFirst({
			// 	// 		where:{
			// 	// 			tenantId: tenantId,
			// 	// 			numberOfDataCenters:{
			// 	// 				gte: 1
			// 	// 			},
			// 	// 			expiredAt:{
			// 	// 				gte: new Date()
			// 	// 			}
			// 	// 		}
			// 	// 	})
			// 	// 	if (license){
			// 	// 		await prisma.license.update({
			// 	// 			where:{
			// 	// 				id: license.id
			// 	// 			},
			// 	// 			data:{
			// 	// 				numberOfDataCenters: license.numberOfDataCenters - 1,
			// 	// 				dataCenters:{
			// 	// 					push: typeId
			// 	// 				}
			// 	// 			}
			// 	// 		});
			// 	// 		res(null, {result: true});
			// 	// 	}
			// 	// 	else res(null, {result: false});
			// 	res(null, {result: true});
			// 	}
			// }
			// catch(err){
			// 	res({
			// 		code: grpc.status.INTERNAL,
			// 		message: JSON.stringify(err),
			// 	  });
			// }
		},
		DeleteAffictation: async (req:any, res:any) => {
			try{
				const {type,tenantId,typeId} = req.request;
				if (type == "USERS"){
					const licenses = await prisma.license.findMany({
						where:{
							tenantId: tenantId,
							users:{
								has: typeId
							},
							expiredAt:{
								gte: new Date()
							}
						}
					})
					if (licenses.length > 0)
					{
						for (let i = 0; i < licenses.length; i++){
							await prisma.license.update({
								where:{
									id: licenses[i].id
								},
								data:{
									numberOfUsers: licenses[i].numberOfUsers + 1,
									users:licenses[i].users.filter((item) => item != typeId)
								}
							});
						}
					}
					res(null, {result: true});
				}
				else if (type == "DATACENTER"){
					const licenses = await prisma.license.findMany({
						where:{
							tenantId: tenantId,
							dataCenters:{
								has: typeId
							},
							expiredAt:{
								gte: new Date()
							}
						}
					})
					if (licenses.length > 0)
					{
						for (let i = 0; i < licenses.length; i++){
							await prisma.license.update({
								where:{
									id: licenses[i].id
								},
								data:{
									numberOfDataCenters: licenses[i].numberOfDataCenters + 1,
									dataCenters:licenses[i].dataCenters.filter((item) => item != typeId)
								}
							});
						}
					}
					res(null, {result: true});
				}
			}
			catch(err){
				res({
					code: grpc.status.INTERNAL,
					message: JSON.stringify(err),
				  });
			}
		}

	} as LicenseServiceHandlers);
	return server;
}

// main();

