import { PrismaClient } from "@prisma/client"
import { LicenseType } from "../type";

const prisma = new PrismaClient();


const createLicenseService = async (data: LicenseType) => {
	const license = await prisma.license.create({
		data,
	});
	return license;
}

const getLicenseService = async (id: number) => {
	const license = await prisma.license.findUnique({
		where: {
			id: id,
		},
	});
	return license;
}

const getallLicenseService = async () => {
	const license = await prisma.license.findMany();
	return license;
}

const updatedLicenseService = async (id: number, data: LicenseType) => {
	const license = await prisma.license.update({
		where: {
			id: +id,
		},
		data,
	});
	return license;
}


export {
	updatedLicenseService,
	createLicenseService,
	getLicenseService,
	getallLicenseService,
};