import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { Conversation } from "../types/conversation";
import { AxiosRequestConfig } from "axios";

const useConversationService = () => {
  const { axiosInstance } = useAxios();

  const getConversation = async (id: string): Promise<Conversation> => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/conversation/${id}`,
    };

    const [response, err] = await handlePromise<Conversation, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }

    if (!response) {
      return Promise.reject("Response is empty"); /* Fixme: throw a better error */
    }

    return response;
  };

  const addMessage = async (conversationId: string, message: string): Promise<void> => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/conversation/${conversationId}`,
      data: {
        message,
      },
    };

    const [, err] = await handlePromise<Conversation, unknown>(axiosInstance(config));

    if (err) {
      Promise.reject(err);
    }
  };

  return {
    getConversation,
    addMessage,
  };
};

export default useConversationService;
