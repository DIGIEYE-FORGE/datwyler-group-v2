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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const arrauLicense = [
    {
        description: "Licence1",
        tenantId: 1,
        startDate: new Date(),
        expiredAt: new Date(new Date().setDate(new Date().getDate() + 5)),
        numberUser: 10,
        numberAdmin: 2,
        numberDataCenter: 1,
    },
    {
        description: "Licence2",
        tenantId: 1,
        startDate: new Date(),
        expiredAt: new Date(new Date().setDate(new Date().getDate() + 8)),
        numberUser: 10,
        numberAdmin: 7,
        numberDataCenter: 10,
    },
    {
        description: "Licence3",
        tenantId: 1,
        startDate: new Date(),
        expiredAt: new Date(new Date().setDate(new Date().getDate() + 1)),
        numberUser: 100,
        numberAdmin: 10,
        numberDataCenter: 10,
    },
];
const seedLicense = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.license.create({
        data: Object.assign({}, data)
    });
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const license of arrauLicense) {
        yield seedLicense(license);
    }
});
main();
