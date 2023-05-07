import axios from "axios";

// const api = axios.create({
// 	baseURL: import.meta.env.VITE_BACK_API,
// });

interface Params {
	take?: number;
	skip?: number;
	include?: any;
	where?: any;

}
export const getAttributes = async (params: Params) => {
	const { take, skip, include, where } = params;
	const response = await axios.get("/attribute", {
		params: {
			take,
			skip,
			include: include ? JSON.stringify(params.include) : undefined,
			where: where ? JSON.stringify(params.where) : undefined,

		}
	});
	return response.data;
};


export const getAttributesId = async (id: string) => {
	const response = await axios.get(`/attribute/${id}`);
	return response.data;
}

export const createAttributes = async (data: any) => {
	const response = await axios.post("/attribute", data);
	return response.data;
}


export const createMultipleAttributes = async (data: any) => {
	try {
		for (let i = 0; i < data.res.length; i++) {
			await axios.post("/attribute", {
				name: data.res[i][0],
				value: data.res[i][1],
				deviceId: data.deviceId,
			});
		}
		return "success";
	}
	catch (e) {
		return "error";
	}
}
