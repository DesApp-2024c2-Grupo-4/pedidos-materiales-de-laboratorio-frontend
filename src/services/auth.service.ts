import useAxios from "./axios.config";
import handlePromise from "../utils/promise";
import { AxiosRequestConfig } from "axios";

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

    const [response, err] = await handlePromise<AccessTokenResponse, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response) {
      return Promise.reject("Login response is empty"); /* Fixme: throw a better error */
    }

    updateAuthToken(response.accessToken);
  };

  return {
    login,
  };
};

export default useAuthService;
