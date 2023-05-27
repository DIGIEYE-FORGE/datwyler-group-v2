"use strict";
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
exports.getAlllicenseController = exports.getlicenseController = exports.createlicenseController = exports.updatedlicenseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const license_service_1 = require("../services/license.service");
const createlicenseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const license = yield (0, license_service_1.createLicenseService)(req.body);
        return res.status(http_status_1.default.CREATED).json(license);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});
exports.createlicenseController = createlicenseController;
const getlicenseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const license = yield (0, license_service_1.getLicenseService)(+id);
        return res.status(http_status_1.default.OK).json(license);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getlicenseController = getlicenseController;
const getAlllicenseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenantId = req.query.tenantId;
        const license = yield (0, license_service_1.getallLicenseService)(tenantId ? +tenantId : undefined);
        return res.status(http_status_1.default.OK).json(license);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getAlllicenseController = getAlllicenseController;
const updatedlicenseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const license = yield (0, license_service_1.updatedLicenseService)(+id, req.body);
        return res.status(http_status_1.default.OK).json(license);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});
exports.updatedlicenseController = updatedlicenseController;
