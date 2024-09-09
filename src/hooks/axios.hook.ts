import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useAuth } from "../context/auth.context";

const useAxios = (): { axiosInstance: AxiosInstance; updateAuthToken: (token: string | null) => void } => {
  const { authToken, login } = useAuth();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // Replace with API base URL
  });

  // Update the token in the interceptor
  const initAuthToken = (token: string | null) => {
    if (!token) {
      delete axiosInstance.defaults.headers.common["Authorization"];
      return;
    }

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const updateAuthToken = (token: string | null) => {
    initAuthToken(token);
    if (token) login(token);
  };

  // Initialize the interceptor with the current token
  initAuthToken(authToken);

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
