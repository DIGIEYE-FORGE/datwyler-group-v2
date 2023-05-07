import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_BACK_API,
});

interface Params {
	take?: number;
	skip?: number;
	include?: any;
	where?: any;

}
export const getTags = async (params: Params) => {
	const { take, skip, include, where } = params;
	const response = await api.get("/Tage", {
		params: {
			take,
			skip,
			include: include ? JSON.stringify(params.include) : undefined,
			where: where ? JSON.stringify(params.where) : undefined,

		}
	});
	return response.data;
};


export const getTag = async (id: string) => {
	const response = await api.get(`/Tage/${id}`);
	return response.data;
}

export const createTag = async (data: any) => {
	const response = await api.post("/Tage", data);
	return response.data;
}