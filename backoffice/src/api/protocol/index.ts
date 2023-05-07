import axios from "axios";

interface Params {
	take?: number;
	skip?: number;
	include?: any;
	where?: any;

}
export const getProtocols = async (params: Params) => {
	const { take, skip, include, where } = params;
	const response = await axios.get("/protocol", {
		params: {
			take,
			skip,
			include: include ? JSON.stringify(params.include) : undefined,
			where: where ? JSON.stringify(params.where) : undefined,

		}
	});
	return response.data;
};