import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import md5 from "md5";

type AccessTokenResponse = {
  accessToken: string;
};

const useAuthService = () => {
  const { axiosInstance, updateAuthToken } = useAxios();

  function mailvalidation(mail) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(mail);
}

  const login = async (mail: string, password:string): Promise<void> => {
    
    console.log(mailvalidation(mail))
    if(!mailvalidation(mail))
    {
      const msg = "bad user";
      return Promise.reject(msg);
    }

    if(!password) 
    {
      const msg = "password empty";
      return Promise.reject(msg);
    }

    const hashedPass :string = md5(password)
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/login`,
      data: {
        email: mail,
        pass: hashedPass
      },
    };

    const [response, err] = await handlePromise<AxiosResponse<AccessTokenResponse>, AxiosError<any>>(
      axiosInstance(config),
    );

    if (err) {
      const msg = err.response?.data?.message || "there was a problem sending the request";
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
