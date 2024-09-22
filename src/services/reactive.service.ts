import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { Reactive } from "../types/reactive";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const useReactiveService = () => {
  const { axiosInstance } = useAxios();

  const getReactive = async (id: string): Promise<Reactive> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/reactive/${id}`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Reactive>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const getReactives = async (): Promise<Reactive[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/reactive`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Reactive[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const addReactive = async (reactive: Reactive): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/reactive`,
      data: reactive,
    };

    const [, err] = await handlePromise<AxiosResponse<Reactive[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  const updateReactive = async (id: string, reactive: Reactive): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/reactive/${id}`,
      data: { reactive },
    };

    const [, err] = await handlePromise<AxiosResponse<Reactive[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  const removeReactive = async (id: string): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/reactive/${id}`,
    };

    const [, err] = await handlePromise<AxiosResponse<Reactive[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  return {
    getReactive: getReactive,
    getReactives,
    addReactive,
    updateReactive,
    removeReactive,
  };
};

export default useReactiveService;
