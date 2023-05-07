import axios from "axios";

// const axios = axios.create({
// 	baseURL: import.meta.env.VITE_API_URL,
// });

interface Params {
	take?: number;
	skip?: number;
	include?: any;
	where?: any;

}
export const getGroups = async (params: Params) => {
	console.log("i am here in groups");
	const { take, skip, include, where } = params;
	const response = await axios.get("/group", {
		params: {
			take,
			skip,
			include: include ? JSON.stringify(params.include) : undefined,
			where: where ? JSON.stringify(params.where) : undefined,

		}
	});
	return response.data;
};

export const createGroup = async (data: any) => {
	const response = await axios.post("/group", data);
	return response.data;
}


export const deleteGroup = async (id: string) => {
	const response = await axios.delete(`/group/${id}`);
	return response.data;
}

export const updateGroup = async (id: string, data: any) => {
	const response = await axios.patch(`/group/${id}`, data);
	return response.data;
}
