"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const license_controller_1 = require("../controller/license.controller");
const routerLicense = express_1.default.Router();
routerLicense.get('/', license_controller_1.getAlllicenseController);
routerLicense.get('/:id', license_controller_1.getlicenseController);
routerLicense.post('/', license_controller_1.createlicenseController);
routerLicense.patch('/:id', license_controller_1.updatedlicenseController);
exports.default = routerLicense;
