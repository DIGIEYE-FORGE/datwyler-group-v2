import axios from "axios";



interface Params {
	page?: number;
	perPage?: number;
	include?: any;
	where?: any;
}

export const getDevices = async (params: Params) => {
	const { page = 1, perPage = 999999, include, where } = params;
	const response = await axios.get("/device", {
		params: {
			take: perPage,
			skip: (page - 1) * perPage,
			include: include ? JSON.stringify(include) : undefined,
			where: where ? JSON.stringify(where) : undefined,
		},
	});
	return response.data;
};

export const getDevice = async (id: string) => {
	const response = await axios.get(`/device/${id}`);
	return response.data;
};

export const createDevice = async (data: any) => {
	const response = await axios.post("/device", data);
	return response.data;
};


export const deleteDevice = async (id: number) => {
	const response = await axios.delete(`/device/${id}`);
	return response.data;
}

export const updateDevice = async (id: number, data: any) => {
	const response = await axios.patch(`/device/${id}`, data);
	return response.data;
}