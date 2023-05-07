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

interface Decoder {
  name?: string;
  description?: string;
  id?: string;
  fnc?: string;
  updateAt?: string;
  [key: string]: any;
}
export const getDecoder = async (params: Params) => {
  const { page = 1, perPage = 999999, include, where } = params;
  const response = await axios.get("/decoder", {
    params: {
      take: perPage,
      skip: (page - 1) * perPage,
      include: include ? JSON.stringify(include) : undefined,
      where: where ? JSON.stringify(where) : undefined,
    },
  });
  return response.data;
};

export const postDecoder = async (data: Decoder) => {
  const response = await axios.post("/decoder", data);
  return response.data;
};

export const putDecoder = async (id: string, data: Decoder) => {
  const response = await axios.patch(`/decoder/${id}`, data);
  return response.data;
};

export const deleteDecoder = async (id: string) => {
  const response = await axios.delete(`/decoder/${id}`);
  return response.data;
}

