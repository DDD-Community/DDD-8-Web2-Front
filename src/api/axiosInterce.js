import axios from "axios";
import { getAccessToken } from "~utils/secure-store";

const httpClient = axios.create({
    baseURL: 'https://ratrip.store/v1'
});

httpClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    console.log(accessToken);
    if (!accessToken) {
      throw new Error("No access token");
    }

    return {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  },
  (error) => error
);

export { httpClient };
