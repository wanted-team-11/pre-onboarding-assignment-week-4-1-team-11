import { AxiosInstance, AxiosRequestConfig } from "axios";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const localToken = localStorage.getItem("token");
  if (localToken) {
    config.headers = {
      Authorization: `Bearer ${localToken}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
  }
  return config;
};

export default function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest);

  return axiosInstance;
}
