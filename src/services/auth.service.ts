import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type AccessTokenResponse = {
  accessToken: string;
};

const useAuthService = () => {
  const { axiosInstance, updateAuthToken } = useAxios();

  const login = async (email: string, password): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/login`,
      data: {
        email,
        password,
      },
    };

    const [response, err] = await handlePromise<AxiosResponse<AccessTokenResponse>, AxiosError<any>>(
      axiosInstance(config),
    );

    if (err) {
      const msg = err.response?.data?.message || "Unknown error";
      return Promise.reject(msg);
    }

    if (!response) {
      return Promise.reject("Login response is empty"); /* Fixme: throw a better error */
    }

    updateAuthToken(response.data.accessToken);
  };

  return {
    login,
  };
};

export default useAuthService;
