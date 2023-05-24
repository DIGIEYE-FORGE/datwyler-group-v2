import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/license";
import { PrismaClient } from "@prisma/client";
import { affectType, DeleteAffiType, delteAffictationType, protoType } from "../type";
import { LicenseServiceHandlers } from "../proto/licensePackage/LicenseService";
import { Any } from "@grpc/grpc-js/build/src/generated/google/protobuf/Any";
const PROTO_PATH = path.join(__dirname, "..", "license.proto");
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
		`0.0.0.0:${env.GRPC_PORT}`,
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
	const updateData = (item: {
		users: number[];
		admins: number[];
		dataCenters: number[];
	}, data: DeleteAffiType) => {
		let res = {};
		if (data.licenseRequest.type === 0) {
			res = { users: item?.users.filter((id) => id != data.deletedId) }
		}
		else if (data.licenseRequest.type === 1) {
			res = { admins: item?.admins.filter((id) => id != data.deletedId) }
		}
		else if (data.licenseRequest.type === 2) {
			res = { dataCenters: item?.dataCenters.filter((id) => id != data.deletedId) }
		}
		return res;
	}

	server.addService(licensePackage.LicenseService.service, {
		GetLicensePermission: (req, res) => {
			const data = protoType.parse(req.request);
			let permission = {};
			if (Object.keys(data).length != 2) {
				return res({
					code: grpc.status.INVALID_ARGUMENT,
					details: "Invalid argument",
				}, null);
			}
			else {
				prisma.license.findMany({
					where: {
						tenantId: data.tenantId,
					}
				}).then((result) => {
					result.forEach((item) => {
						if (data.type === 0) {
							if (item.numberUser - item.users.length > 0) {
								permission = { permission: true, licenseId: item.id }
								return;
							}
						}
						if (data.type === 1) {
							if (item.numberAdmin - item.admins.length > 0) {
								permission = { permission: true, licenseId: item.id }
								return;
							}
						}
						if (data.type === 2) {
							if (item.numberDataCenter - item.dataCenters.length > 0) {
								permission = { permission: true, licenseId: item.id }
								return;
							}
						}
					}
					)
					if (Object.keys(permission).length != 0) {
						return res(null, permission);
					}
					return res(null, { permission: false, licenseId: -1 });
				}).catch((err) => {
					return res({
						code: grpc.status.INTERNAL,
						details: err,
					}, null);
				});
			}
		},
		AffectUser: (req, res) => {
			const data = affectType.parse(req.request);
			prisma.license.findFirst({
				where: {
					id: data.licenseId,
				},
			}).then((result) => {
				if (result) {
					if (data.licenseRequest?.type === 0) {
						prisma.license.update({
							where: {
								id: data.licenseId,
							},
							data: {
								users: data.injectedId ? [...new Set([...result.users, data.injectedId])] : result.users,
							},
						}).then((result) => {
							return res(null, { result: true });
						}).catch((err) => {
							return res({
								code: grpc.status.INTERNAL,
								details: err,
							}, null);
						});
					}
					if (data.licenseRequest?.type === 1) {
						prisma.license.update({
							where: {
								id: data.licenseId,
							},
							data: {
								admins: data.injectedId ? [...new Set([...result.admins, data.injectedId])] : result.admins,
							},
						}).then((result) => {
							return res(null, { result: true });
						}).catch((err) => {
							return res({
								code: grpc.status.INTERNAL,
								details: err,
							}, null);
						});
					}
					if (data.licenseRequest?.type === 2) {
						prisma.license.update({
							where: {
								id: data.licenseId,
							},
							data: {
								dataCenters: data.injectedId ? [...new Set([...result.dataCenters, data.injectedId])] : result.dataCenters,
							},
						}).then((result) => {
							return res(null, { result: true });
						}).catch((err) => {
							return res({
								code: grpc.status.INTERNAL,
								details: err,
							}, null);
						});
					}
				}
				return res(null, { result: false });
			}).catch((err) => {
				return res({
					code: grpc.status.INTERNAL,
					details: err,
				}, null);
			}
			);
		},

		DeleteAffictation: async (req, res) => {
			try {
				const data = delteAffictationType.parse(req.request);
				let type = {};
				if (data.licenseRequest.type === 0)
					type = { users: { has: data.deletedId } }
				else if (data.licenseRequest.type === 1)
					type = { admins: { has: data.deletedId } }
				else if (data.licenseRequest.type === 2)
					type = { dataCenters: { has: data.deletedId } }
				const result = await prisma.license.findMany({
					where: {
						AND: [
							{
								tenantId: data.licenseRequest.tenantId,
							},
							type
						]
					}
				});
				if (result.length > 0) {
					for (let i = 0; i < result.length; i++) {
						await prisma.license.update({
							where: {
								id: result[i].id,
							},
							data: updateData(result[i], data),
						}
						)
					}
				}
				res(null, { message: "done" });
			}
			catch (err) {
				console.log(
					JSON.stringify(
						err,
						null,
						2
					)
				);
				return res({
					code: grpc.status.INTERNAL,
					// details: err,
				}, null);
			}
		},
	} as LicenseServiceHandlers);
	return server;
}

// main();

