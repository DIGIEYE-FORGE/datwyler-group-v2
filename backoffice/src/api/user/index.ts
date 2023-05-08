import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_AUTH_AUTH,
});

const multiTenancyApi = axios.create({
	baseURL: import.meta.env.VITE_MULTI_TENANCY_API,
});



// api.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {
// 		if (error.response.status === 401) {
// 			const auth = axios.create({
// 				baseURL: import.meta.env.VITE_AUTH_AUTH,
// 			});
// 			auth
// 				.post("refresh", {
// 					refreshToken: localStorage.getItem("refreshToken"),
// 				})
// 				.then((response) => {
// 					localStorage.setItem("accessToken", response.data.accessToken);
// 					localStorage.setItem("refreshToken", response.data.refreshToken);
// 				}).catch((error) => {
// 					localStorage.removeItem("accessToken");
// 					localStorage.removeItem("refreshToken");
// 					window.location.href = "/login";
// 				});
// 		}
// 		return Promise.reject(error);
// 	}
// );

interface Params {
	take?: number;
	skip?: number;
	include?: any;
	where?: any;

}
export const getTags = async (params: Params) => {
	const { take, skip, include, where } = params;
	const response = await api.get("user", {
		params: {
			take,
			skip,
			include: include ? JSON.stringify(params.include) : undefined,
			where: where ? JSON.stringify(params.where) : undefined,

		},
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`
		}
	});
	return response.data;
};

export const getMe = async () => {
	const response = await api.get(`me`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`
		}
	});
	return response.data;
}

export const getUsers = async (params: any) => {
	const { page = 1, perPage = 999999, include, where } = params;
	const take = perPage;
	const skip = (page - 1) * perPage;
	const response = await api.get("users", {
		params: {
			take,
			skip,
			include: include ? JSON.stringify(include) : undefined,
			where: where ? JSON.stringify(where) : undefined,
		},
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`
		}
	});
	return response.data;
}

export const auth = async (data: any) => {
	const response = await api.post(`login`, data);
	return response.data;
}

type User = {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmpassword?: string
	role: string
}

export const addUserToTenant = async ({
	tenantId,
	userId,
	role = "USER"
}: {
	tenantId: number;
	userId: number;
	role: "ADMIN" | "USER"
}
) => {
	const response = await multiTenancyApi.patch(`tenant/${tenantId}/add-user`, {
		id: userId,
		role
	}, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`
		}

	});
	return response.data;
}

export const removeUserFromTenant = async ({
	tenantId,
	userId,
}: {
	tenantId: number;
	userId: number;
}
) => {
	const response = await multiTenancyApi.patch(`tenant/${tenantId}/remove-user`, {
		userId,
	}, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`
		}

	});
	return response.data;
}





export const signUp = async (data: any, tenantId: number =1, role: "USER" | "ADMIN" = "USER") => {

	const response = await api.post("register", data, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`
		}
	});
	if (tenantId) {

		await addUserToTenant({
			tenantId,
			userId: response.data.id,
			role
		})
	}
	return response.data;
}