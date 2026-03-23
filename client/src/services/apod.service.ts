import { axiosClient } from "@/lib/axios/axiosClient";

import type { APODRequest } from "@/schema/apod.schema";

export const getApod = async (request: APODRequest) => {
  const { data } = await axiosClient.get("/apod", {
    params: request,
  });
  return data;
};
