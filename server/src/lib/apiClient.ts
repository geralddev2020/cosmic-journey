import axios from "axios";

import { env } from "../config/environment";
import { NASA_OPEN_API } from "../constants/externalApis";

export const apiClient = axios.create({
  baseURL: `${NASA_OPEN_API.APOD}`,
  params: {
    api_key: env.NASA_API_KEY,
  },
});
