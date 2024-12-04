import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { SelectOptions } from "../types/shared";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const useSharedService = () => {
  const { axiosInstance } = useAxios();

  const getEquipmentTypes = async (): Promise<SelectOptions[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/equipment/constants/types`,
    };
    const [response, err] = await handlePromise<AxiosResponse<Request>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); 
    }

    const respond :SelectOptions[] = Object.keys(response.data).map(key =>({value:key,text:response.data[key]}))

    return respond;
  };


  const getMaterialTypes = async (): Promise<SelectOptions[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/material/constants/types`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Request>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); 
    }

    const respond :SelectOptions[] = Object.keys(response.data).map(key =>({value:key,text:response.data[key]}))

    return respond;
  };

  const getUnits = async (): Promise<SelectOptions[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/reactive/constants/units`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Request>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); 
    }

    const respond :SelectOptions[] = Object.keys(response.data).map(key =>({value:key,text:response.data[key]}))

    return respond;
  };

  
  const getReactivequalities = async (): Promise<SelectOptions[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/reactive/constants/qualities`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Request>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); 
    }

    const respond :SelectOptions[] = Object.keys(response.data).map(key =>({value:key,text:response.data[key]}))

    return respond;
  };



  const getReactiveTypes = async (): Promise<SelectOptions[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/reactive/constants/types`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Request>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); 
    }

    const respond :SelectOptions[] = Object.keys(response.data).map(key =>({value:key,text:response.data[key]}))

    return respond;
  };


  const getReactiveSolvents = async (): Promise<SelectOptions[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/reactive/constants/solvents`,
    };

    const [response, err] = await handlePromise<AxiosResponse<Request>, unknown>(axiosInstance(config));

    if (err) { Promise.reject(err); }

    if (!response?.data) {
      return Promise.reject("Response is empty"); 
    }

    const respond :SelectOptions[] = Object.keys(response.data).map(key =>({value:key,text:response.data[key]}))

    return respond;
  };

   const getLabs = () =>  {
    return getType(`/request/constants/labs`)
  }
   const getstatus = () =>  {
    return getType(`/request/constants/statuses`)
  }
   const getType = async (urlType: string): Promise<SelectOptions[]> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: urlType,
    };
    const [response, err] = await handlePromise<AxiosResponse<Request>, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response?.data) {
      return Promise.reject("Response is empty"); 
    }

    const respond :SelectOptions[] = Object.keys(response.data).map(key =>({value:key,text:response.data[key]}))

    return respond;
  };

  return {
   getEquipmentTypes,
   getMaterialTypes,
   getUnits,
   getReactiveTypes,
   getReactiveSolvents,
   getLabs,
   getstatus
  };
};

export default useSharedService;
