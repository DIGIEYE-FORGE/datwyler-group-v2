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
exports.deletePackController = exports.updatePackController = exports.getPacksController = exports.getPackController = exports.createPackServiceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pack_service_1 = require("../services/pack.service");
const createPackServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pack = yield (0, pack_service_1.createPackService)(req.body);
        return res.status(http_status_1.default.CREATED).json(pack);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});
exports.createPackServiceController = createPackServiceController;
const getPackController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pack = yield (0, pack_service_1.getPackService)(+id);
        return res.status(http_status_1.default.OK).json(pack);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getPackController = getPackController;
const getPacksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tenantId = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.tenantId) || undefined;
        let packs;
        if (tenantId) {
            packs = yield (0, pack_service_1.getPacksService)(+tenantId);
        }
        else
            packs = yield (0, pack_service_1.getPacksService)();
        return res.status(http_status_1.default.OK).json(packs);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});
exports.getPacksController = getPacksController;
const updatePackController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pack = yield (0, pack_service_1.updatePackService)(+id, req.body);
        return res.status(http_status_1.default.OK).json(pack);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});
exports.updatePackController = updatePackController;
const deletePackController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pack = yield (0, pack_service_1.deletePackService)(+id);
        return res.status(http_status_1.default.OK).json(pack);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});
exports.deletePackController = deletePackController;
