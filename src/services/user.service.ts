import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { User } from "../types/user";
import { AxiosRequestConfig, AxiosResponse } from "axios";

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

  const updateUser = async (id: string, user: User): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/user/${id}`,
      data: { user },
    };

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

  return {
    getUser: getUser,
    getUsers,
    addUser,
    updateUser,
    removeUser,
  };
};

export default useUserService;
