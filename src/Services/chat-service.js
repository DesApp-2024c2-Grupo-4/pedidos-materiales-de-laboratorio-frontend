import axios from 'axios';
import { urlBD } from '../connectDB';


export async function getMensajes(id) {
    const apiResponse = await axios.get(
        `${urlBD}/api/mail/mails/${id}`
    );
    return apiResponse;
}

export async function enviarMensaje(mensaje) {
    try {
    const requestJson = JSON.stringify(mensaje);
    const response = await fetch(`${urlBD}/api/mail/send`, {
        method: "POST",
        body: requestJson,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.json();
    } catch (e) {
      console.log(e);
    }
   
}

export async function updateMensaje(mensajes) {
    const apiResponse = await axios.put(`${urlBD}/api/mail/update`, JSON.stringify(mensajes), {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return apiResponse;
}

export async function deleteMensaje(id_mensaje) {
    const apiResponse = await axios.delete(
        `${urlBD}/api/mail/delete/${id_mensaje}`
    );
    return apiResponse;
}
