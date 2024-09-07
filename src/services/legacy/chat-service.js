import axios from "axios";
import { token } from "./getToken";



export async function getMensajes(id) {
  const apiResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/mail/mails/${id}`,{
    headers: {        
      Authorization: `Bearer ${token()}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return apiResponse;
}

export async function enviarMensaje(mensaje) {
  try {
    const body = JSON.stringify(mensaje);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/mail/send`, body, {
      headers: {        
        Authorization: `Bearer ${token()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMensaje(mensajes) {
  const apiResponse = await axios.put(
    `${process.env.REACT_APP_API_URL}/api/mail/update`,
    JSON.stringify(mensajes),
    {
      headers: {        
        Authorization: `Bearer ${token()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return apiResponse;
}

export async function deleteMensaje(id_mensaje) {
  const apiResponse = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/mail/delete/${id_mensaje}`,{
      headers: {        
        Authorization: `Bearer ${token()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return apiResponse;
}
