"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const licence_router_1 = __importDefault(require("./router/licence.router"));
const grpc_1 = __importDefault(require("./grpc/grpc"));
const type_env_1 = __importDefault(require("./type_env"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/license", licence_router_1.default);
(0, grpc_1.default)();
app.listen(type_env_1.default.HTTP_PORT, () => {
    console.log('Server is running on port 2000');
});
