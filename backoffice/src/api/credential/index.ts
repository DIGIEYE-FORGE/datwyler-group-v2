import axios from "axios";

// const axios = axios.create({
//   baseURL: import.meta.env.VITE_axios_URL,
// });

interface Params {
  page?: number;
  perPage?: number;
  include?: any;
  where?: any;
}
export const getCredntial = async (params: Params) => {
  const { page = 1, perPage = 999999, include, where } = params;
  const response = await axios.get("/credential", {
    params: {
      take: perPage,
      skip: (page - 1) * perPage,
      include: include ? JSON.stringify(include) : undefined,
      where: where ? JSON.stringify(where) : undefined,
    },
  });
  return response.data;
};


export const postCredntial = async (data: any) => {
  const response = await axios.post("/credential", data);
  return response.data;
}
