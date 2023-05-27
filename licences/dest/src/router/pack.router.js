"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pack_controller_1 = require("../controller/pack.controller");
const routerPack = express_1.default.Router();
routerPack.get('/', pack_controller_1.getPacksController);
routerPack.get('/:id', pack_controller_1.getPackController);
routerPack.post('/', pack_controller_1.createPackServiceController);
routerPack.patch('/:id', pack_controller_1.updatePackController);
routerPack.delete('/:id', pack_controller_1.deletePackController);
exports.default = routerPack;
