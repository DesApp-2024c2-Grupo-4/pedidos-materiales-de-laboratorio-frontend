import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { Material } from "../types/material";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const useMaterialService = () => {
  const { axiosInstance } = useAxios();

  const getMaterial = async (id: string): Promise<Material> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/material/${id}`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Material>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const getMaterials = async (): Promise<Material[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/material`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Material[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response.data;
  };

  const addMaterial = async (material: Material): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/material`,
      data: material,
    };

    const [, err] = await handlePromise<AxiosResponse<Material[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  const updateMaterial = async (id: string, material: Material): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/material/${id}`,
      data: { material },
    };

    const [, err] = await handlePromise<AxiosResponse<Material[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  const removeMaterial = async (id: string): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/material/${id}`,
    };

    const [, err] = await handlePromise<AxiosResponse<Material[]>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  return {
    getMaterial,
    getMaterials,
    addMaterial,
    updateMaterial,
    removeMaterial,
  };
};

export default useMaterialService;
