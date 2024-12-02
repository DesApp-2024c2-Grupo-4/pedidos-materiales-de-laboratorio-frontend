import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { User } from "../types/user";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const useUserService = () => {
  const { axiosInstance } = useAxios();

  const getUser = async (id: string): Promise<User> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/user/${id}`,
    };
    const [response, err] = await handlePromise<AxiosResponse<User>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const getUsers = async (): Promise<User[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/user`,
    };

    const [response, err] = await handlePromise<AxiosResponse<User[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const addUser = async (user: User): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/user`,
      data: user,
    };

    const [, err] = await handlePromise<AxiosResponse<User[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };
  const updateUserAdmin = async (id, params): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/user/${id}`,
      data: params,
    };

    const [, err] = await handlePromise<AxiosResponse<User[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  const updateUser = async (user: User): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/user`,
      data: user,
    };
    console.log(user);

    const [, err] = await handlePromise<AxiosResponse<User[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  const removeUser = async (id: string): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/user/${id}`,
    };

    const [, err] = await handlePromise<AxiosResponse<User[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  const createToken = async (): Promise<any> => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/register/token`,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    };

    const [response, err] = await handlePromise<AxiosResponse<any>, AxiosError<any>>(axiosInstance(config));

    if (err) {
      const msg = err.response?.data?.message || "there was a problem sending the request";
      return Promise.reject(msg);
    }

    if (!response) {
      return Promise.reject("Login response is empty"); /* Fixme: throw a better error */
    }
    return response.data;
  };

  return {
    createToken,
    getUser: getUser,
    getUsers,
    addUser,
    updateUser,
    updateUserAdmin,
    removeUser,
  };
};

export default useUserService;
