import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { createEquipment, Equipment } from "../types/equipment";
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
      return Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const getEquipments = async (): Promise<Equipment[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/equipment?isAvailable=true`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Equipment[]>, unknown>(axiosInstance(config));

    if (err) {
      return Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const addEquipment = async (equipment: createEquipment): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/equipment`,
      data: equipment,
    };

    const [, err] = await handlePromise<AxiosResponse<Equipment[]>, unknown>(axiosInstance(config));

    if (err) {
      return Promise.reject(err);
    }
  };

  const updateEquipment = async (_id: string, equipment: createEquipment): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/equipment/${_id}`,
      data: equipment,
    };
    const [, err] = await handlePromise<AxiosResponse<Equipment[]>, unknown>(axiosInstance(config));

    if (err) {
      return Promise.reject(err);
    }
  };

  const removeEquipment = async (id: string): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/equipment/${id}`,
    };

    const [, err] = await handlePromise<AxiosResponse<Equipment[]>, unknown>(axiosInstance(config));

    if (err) {
      return Promise.reject(err);
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
