"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const licence_router_1 = __importDefault(require("./router/licence.router"));
const grpc_1 = __importDefault(require("./grpc/grpc"));
const type_env_1 = __importDefault(require("./type_env"));
const cors_1 = __importDefault(require("cors"));
const pack_router_1 = __importDefault(require("./router/pack.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use("/license", licence_router_1.default);
app.use("/pack", pack_router_1.default);
//enable course
(0, grpc_1.default)();
app.listen(type_env_1.default.HTTP_PORT, () => {
    console.log('Server is running on port 2000');
});
