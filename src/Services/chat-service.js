import axios from "axios";
import { urlBD } from "../connectDB";

export async function getMensajes(id) {
  const apiResponse = await axios.get(`${urlBD}/api/mail/mails/${id}`);
  return apiResponse;
}

export async function enviarMensaje(mensaje) {
  try {
    const body = JSON.stringify(mensaje);
    const response = await axios.post(`${urlBD}/api/mail/send`, body, {
      headers: {
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
    `${urlBD}/api/mail/update`,
    JSON.stringify(mensajes),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return apiResponse;
}

export async function deleteMensaje(id_mensaje) {
  const apiResponse = await axios.delete(
    `${urlBD}/api/mail/delete/${id_mensaje}`
  );
  return apiResponse;
}
