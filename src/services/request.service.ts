import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { Request } from "../types/request";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const useRequestService = () => {
  const { axiosInstance } = useAxios();

  const getRequest = async (id: string): Promise<Request> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/request/${id}`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Request>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const getRequests = async (): Promise<Request[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/request`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Request[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const addRequest = async (request: Request): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/request`,
      data: request,
    };

    const [, err] = await handlePromise<AxiosResponse<Request[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  const updateRequest = async (id: string, request: Request): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/request/${id}`,
      data: { request },
    };

    const [, err] = await handlePromise<AxiosResponse<Request[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  return {
    getRequest: getRequest,
    getRequests,
    addRequest,
    updateRequest,
  };
};

export default useRequestService;
