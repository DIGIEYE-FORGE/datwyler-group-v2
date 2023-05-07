import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_BACK_API,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("accessToken")}`
	}

});
interface Params {
	take?: number;
	skip?: number;
	include?: any;
	where?: any;

}



export const createVmqAuthAcl = async (data: any) => {
	const response = await api.post("/vmqauthacl", data);
	return response.data;
}
