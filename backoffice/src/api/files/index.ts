import axios from "axios";
import { toast } from "react-toastify";



interface Params {
	page?: number;
	perPage?: number;
	include?: any;
	where?: any;
}

export const getFiles = async (params: Params) => {
	const { page = 1, perPage = 999999, include, where } = params;
	const response = await axios.get("/firmware", {
		params: {
			take: perPage,
			skip: (page - 1) * perPage,
			include: include ? JSON.stringify(include) : undefined,
			where: where ? JSON.stringify(where) : undefined,
		},
	});
	return response.data;
};
export const postFiles = async (data: any) => {
	const response = await axios.post("/firmware", data);
	return response.data;

};
export const getFile = async (id: string) => {
	const response = await axios.get(`/firmware/${id}`);
	return response.data;
};




export const deleteFile = async (id: string) => {
	const response = await axios.delete(`/firmware/${id}`);
	return response.data;
}


export const downloadFile = async (url: string) => {
	const response = await axios.get("/firmware/download", {
		params: {
			url
		},
		responseType: "blob",
	}).then((response) => {
		const blob = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = blob;
		link.setAttribute("download", url);
		document.body.appendChild(link);
		link.click();
	}).catch((error) => {
		toast.error(error.message);
	}
	)
}



export const updateFile = async (id: string, data: any) => {
	const response = await axios.patch(`/firmware/${id}`, data);
	return response.data;
}