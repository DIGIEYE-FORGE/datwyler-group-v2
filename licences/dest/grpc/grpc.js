"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const client_1 = require("@prisma/client");
const type_1 = require("../type");
const PROTO_PATH = path_1.default.join(__dirname, "..", "license.proto");
const type_env_1 = __importDefault(require("../type_env"));
const packageDefinition = protoLoader.loadSync(path_1.default.resolve(__dirname, PROTO_PATH));
const prisma = new client_1.PrismaClient();
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const licensePackage = grpcObject.licensePackage;
function main() {
    const server = new grpc.Server();
    server.bindAsync(`0.0.0.0:${type_env_1.default.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            throw err;
        }
        console.log(`Server running on port ${port}`);
        server.start();
    });
    getServers(server);
}
exports.default = main;
function getServers(server) {
    const updateData = (item, data) => {
        let res = {};
        if (data.licenseRequest.type === 0) {
            res = { users: item === null || item === void 0 ? void 0 : item.users.filter((id) => id != data.deletedId) };
        }
        else if (data.licenseRequest.type === 1) {
            res = { admins: item === null || item === void 0 ? void 0 : item.admins.filter((id) => id != data.deletedId) };
        }
        else if (data.licenseRequest.type === 2) {
            res = { dataCenters: item === null || item === void 0 ? void 0 : item.dataCenters.filter((id) => id != data.deletedId) };
        }
        return res;
    };
    server.addService(licensePackage.LicenseService.service, {
        GetLicensePermission: (req, res) => {
            const data = type_1.protoType.parse(req.request);
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
                                permission = { permission: true, licenseId: item.id };
                                return;
                            }
                        }
                        if (data.type === 1) {
                            if (item.numberAdmin - item.admins.length > 0) {
                                permission = { permission: true, licenseId: item.id };
                                return;
                            }
                        }
                        if (data.type === 2) {
                            if (item.numberDataCenter - item.dataCenters.length > 0) {
                                permission = { permission: true, licenseId: item.id };
                                return;
                            }
                        }
                    });
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
            const data = type_1.affectType.parse(req.request);
            prisma.license.findFirst({
                where: {
                    id: data.licenseId,
                },
            }).then((result) => {
                var _a, _b, _c;
                if (result) {
                    if (((_a = data.licenseRequest) === null || _a === void 0 ? void 0 : _a.type) === 0) {
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
                    if (((_b = data.licenseRequest) === null || _b === void 0 ? void 0 : _b.type) === 1) {
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
                    if (((_c = data.licenseRequest) === null || _c === void 0 ? void 0 : _c.type) === 2) {
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
            });
        },
        DeleteAffictation: (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = type_1.delteAffictationType.parse(req.request);
                let type = {};
                if (data.licenseRequest.type === 0)
                    type = { users: { has: data.deletedId } };
                else if (data.licenseRequest.type === 1)
                    type = { admins: { has: data.deletedId } };
                else if (data.licenseRequest.type === 2)
                    type = { dataCenters: { has: data.deletedId } };
                const result = yield prisma.license.findMany({
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
                        yield prisma.license.update({
                            where: {
                                id: result[i].id,
                            },
                            data: updateData(result[i], data),
                        });
                    }
                }
                res(null, { message: "done" });
            }
            catch (err) {
                console.log(JSON.stringify(err, null, 2));
                return res({
                    code: grpc.status.INTERNAL,
                    // details: err,
                }, null);
            }
        }),
    });
    return server;
}
// main();
