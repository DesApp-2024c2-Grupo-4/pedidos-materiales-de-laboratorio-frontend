import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { Equipment } from "../types/equipment";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const useEquipmentService = () => {
  const { axiosInstance } = useAxios();

  const getEquipment = async (id: string): Promise<Equipment> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/equipment/${id}`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Equipment>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const getEquipments = async (): Promise<Equipment[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/equipment`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Equipment[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const addEquipment = async (equipment: Equipment): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/equipment`,
      data: equipment,
    };

    const [, err] = await handlePromise<AxiosResponse<Equipment[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  const updateEquipment = async (id: string, equipment: Equipment): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/equipment/${id}`,
      data: { equipment },
    };

    const [, err] = await handlePromise<AxiosResponse<Equipment[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  const removeEquipment = async (id: string): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/equipment/${id}`,
    };

    const [, err] = await handlePromise<AxiosResponse<Equipment[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  return {
    getEquipment: getEquipment,
    getEquipments,
    addEquipment,
    updateEquipment,
    removeEquipment,
  };
};

export default useEquipmentService;
