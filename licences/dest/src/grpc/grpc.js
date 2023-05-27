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
const PROTO_PATH = path_1.default.join(__dirname, "..", "..", "license.proto");
const packageDefinition = protoLoader.loadSync(path_1.default.resolve(__dirname, PROTO_PATH));
const prisma = new client_1.PrismaClient();
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const licensePackage = grpcObject.licensePackage;
function main() {
    const server = new grpc.Server();
    server.bindAsync(`0.0.0.0:2001`, grpc.ServerCredentials.createInsecure(), (err, port) => {
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
    server.addService(licensePackage.LicenseService.service, {
        AuthPermission: (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.request;
                const license = yield prisma.license.findFirst({
                    where: {
                        expiredAt: {
                            gte: new Date()
                        },
                        users: {
                            has: userId
                        }
                    }
                });
                if (license)
                    res(null, { permission: true });
                else
                    res(null, { permission: false });
            }
            catch (err) {
                res({
                    code: grpc.status.INTERNAL,
                    message: JSON.stringify(err),
                });
            }
        }),
        GetLicensePermission: (req, res) => __awaiter(this, void 0, void 0, function* () {
        }),
        AffectType: (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, tenantId, typeId } = req.request;
                if (type == 1) {
                    const license = yield prisma.license.findFirst({
                        where: {
                            tenantId: tenantId,
                            numberOfDataCenters: {
                                gte: 1
                            },
                            expiredAt: {
                                gte: new Date()
                            }
                        }
                    });
                    if (license) {
                        const upt = yield prisma.license.update({
                            where: {
                                id: license.id
                            },
                            data: {
                                numberOfDataCenters: license.numberOfDataCenters - 1,
                                dataCenters: {
                                    push: typeId
                                }
                            }
                        });
                        if (upt)
                            return res(null, { result: true });
                    }
                    return res(null, { result: false });
                }
                if (type == 0) {
                    const license = yield prisma.license.findFirst({
                        where: {
                            tenantId: tenantId,
                            numberOfUsers: {
                                gte: 1
                            },
                            expiredAt: {
                                gte: new Date()
                            }
                        }
                    });
                    if (license) {
                        const upt = yield prisma.license.update({
                            where: {
                                id: license.id
                            },
                            data: {
                                numberOfUsers: license.numberOfUsers - 1,
                                users: {
                                    push: typeId
                                }
                            }
                        });
                        if (upt)
                            return res(null, { result: true });
                    }
                    return res(null, { result: false });
                }
            }
            catch (err) {
                res({
                    code: grpc.status.INTERNAL,
                    message: JSON.stringify(err),
                });
            }
        }),
        DeleteAffictation: (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, typeId } = req.request;
                if (type == 0) {
                    const licenses = yield prisma.license.findMany({
                        where: {
                            users: {
                                has: typeId
                            },
                            expiredAt: {
                                gte: new Date()
                            }
                        }
                    });
                    if (licenses.length > 0) {
                        for (let i = 0; i < licenses.length; i++) {
                            yield prisma.license.update({
                                where: {
                                    id: licenses[i].id
                                },
                                data: {
                                    numberOfUsers: licenses[i].numberOfUsers + 1,
                                    users: licenses[i].users.filter((item) => item != typeId)
                                }
                            });
                        }
                    }
                    return res(null, { result: true });
                }
                else if (type == 1) {
                    const licenses = yield prisma.license.findMany({
                        where: {
                            dataCenters: {
                                has: typeId
                            },
                            expiredAt: {
                                gte: new Date()
                            }
                        }
                    });
                    console.log("license:", licenses);
                    if (licenses.length > 0) {
                        for (let i = 0; i < licenses.length; i++) {
                            yield prisma.license.update({
                                where: {
                                    id: licenses[i].id
                                },
                                data: {
                                    numberOfDataCenters: licenses[i].numberOfDataCenters + 1,
                                    dataCenters: licenses[i].dataCenters.filter((item) => item != typeId)
                                }
                            });
                        }
                    }
                    return res(null, { result: true });
                }
            }
            catch (err) {
                res({
                    code: grpc.status.INTERNAL,
                    message: JSON.stringify(err),
                });
            }
        })
    });
    return server;
}
