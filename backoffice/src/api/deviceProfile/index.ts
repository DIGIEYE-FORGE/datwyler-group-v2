import axios from "axios";


interface Params {
  page?: number;
  perPage?: number;
  include?: any;
  where?: any;
}

export const getDeviceProfiles = async (params: Params) => {
  console.log("i am in device profile");

  const { page = 1, perPage = 999999, include, where } = params;
  const response = await axios.get("/deviceProfile", {
    params: {
      take: perPage,
      skip: (page - 1) * perPage,
      include: include ? JSON.stringify(include) : undefined,
      where: where ? JSON.stringify(where) : undefined,
    },
  });
  return response.data;
};

export const postdeviceProfile = async (data: any) => {
  const response = await axios.post("/deviceProfile", data);
  return response.data;
};



export const deleteDeviceProfile = async (id: string) => {
  const response = await axios.delete(`/deviceProfile/${id}`);
  return response.data;
}

export const putDeviceProfile = async (id: string, data: any) => {
  const response = await axios.patch(`/deviceProfile/${id}`, data);
  return response.data;
}
