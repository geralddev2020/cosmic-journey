import { apiClient } from "../lib/apiClient";
import { APODRequest } from "../schema/apod.schema";

export const fetchAPOD = async (request: APODRequest) => {
  const response = await apiClient.get("/", {
    params: request,
  });
  return response.data;
};
