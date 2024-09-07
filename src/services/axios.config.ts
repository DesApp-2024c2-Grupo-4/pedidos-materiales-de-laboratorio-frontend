import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useAuth } from "../context/auth.context";

const useAxios = (): { axiosInstance: AxiosInstance; updateAuthToken: (token: string | null) => void } => {
  const { authToken } = useAuth();

  const axiosInstance = axios.create({
    baseURL: "https://localhost:5000", // Replace with API base URL
  });

  // Update the token in the interceptor
  const updateAuthToken = (token: string | null) => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  };

  // Initialize the interceptor with the current token
  updateAuthToken(authToken);

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return { axiosInstance, updateAuthToken };
};

export default useAxios;
