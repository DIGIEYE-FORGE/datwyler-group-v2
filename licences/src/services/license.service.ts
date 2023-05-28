import { PrismaClient } from "@prisma/client"
import { LicenseType, UpdateType } from "../type";
import { number } from "zod";

const prisma = new PrismaClient();


const createLicenseService = async (data: LicenseType) => {
	try{
	if (data.parentId) {
		const parent = await prisma.license.findFirst({
			where: {
				tenantId: data.parentId,
				numberOfDataCenters:{
					gte: data.numberOfDataCenters
				},
				numberOfUsers:{
					gte: data.numberOfUsers
				},
				expiredAt:{
					gte:data.expiredAt
				}
			}
		});
		if (parent) {
			const license = await prisma.license.create({
				data: {
					...data,
					parentId: parent.id
				}
			});
			if (license)
			{
				const updateLicense = await prisma.license.update({
					where: {
						id: parent.id
					},
					data: {
						numberOfDataCenters: parent.numberOfDataCenters - data.numberOfDataCenters,
						numberOfUsers: parent.numberOfUsers - data.numberOfUsers,
					}
				});
				if (updateLicense)
					return license;
				else
					await prisma.license.delete({
						where: {
							id: license.id
						}
					});

			}
		}	
		else
			throw new Error("access denied for create license");
	}
	else
	{
		const license = await prisma.license.create({data});
		return license;
	}
	}
	catch(err)
	{
		throw new Error(err as string || "data is not valid for create license");
	}
}


const getLicenseService = async (id: number) => {
	try{
	const license = await prisma.license.findFirst({
		where: {
			id: id,
		},
	});
	return license;
	}
	catch(err)
	{
		throw new Error(err as string || "license not found");
	}
}


const getallLicenseService = async (tenantId?:number) => {
	try{
	const count = await prisma.license.count({
		where: {
			tenantId: tenantId || undefined
		}
	});
	const license = await prisma.license.findMany({
		where: {
			tenantId: tenantId || undefined
		}
	});
	return {
		totalResult: count,
		results: license
	};
	
	}
	catch(err)
	{
		throw new Error(err as string || "license not found");
	}
}


const updatedLicenseService = async (tenantId: number, data: UpdateType) => {
	try{

	const license = await prisma.license.findUnique({
		where: {
			id: tenantId
		}
	});
	if (license){
		let nbUsers, nbDataCenters;
		nbUsers= data.numberOfUsers! - license.numberOfUsers;
		nbDataCenters = data.numberOfDataCenters! - license.numberOfDataCenters;
		if (license?.parentId){
			const parent = await prisma.license.findFirst({
				where: {
					id: license.parentId,
					numberOfDataCenters:{
						gte: nbDataCenters
					},
					numberOfUsers:{
						gte: nbUsers
					},
					expiredAt:{
						gte:data.expiredAt
					}
				}
			});
			if (parent){
				const updateLicense = await prisma.license.update({
					where: {
						id: license.id
					},
					data:{
						...data,
					}
				});
				if (updateLicense){
					const updateParent = await prisma.license.update({
						where: {
							id: parent.id
						},
						data: {
							numberOfDataCenters: parent.numberOfDataCenters - nbDataCenters,
							numberOfUsers: parent.numberOfUsers - nbUsers,
						}
					});
					if (updateParent)
						return updateLicense;
					else
					{
						await prisma.license.delete({
							where: {
								id: updateLicense.id
							}
						});
					}
				}
			}
			else
			{
				throw new Error("access denied for update license");
			}
		}
		else
		{
			const license = await prisma.license.update({
				where: {
					id: tenantId,
				},
				data,
			});
			return license;
		}
	}
	else 
		throw new Error("license not found");
}
catch(err)
{
	throw new Error(err as string || "data is not valid for update license");
}
}


export {
	updatedLicenseService,
	createLicenseService,
	getLicenseService,
	getallLicenseService,
};