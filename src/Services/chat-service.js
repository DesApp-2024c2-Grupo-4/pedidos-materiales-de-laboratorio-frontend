import axios from 'axios';
import { urlBD } from '../connectDB';


export async function getMensajes(id) {
    const apiResponse = await axios.get(
        `${urlBD}/mensajes/${id}`
    );
    return apiResponse;
}

export async function enviarMensaje(mensaje) {
    const apiResponse = await axios.post(
        `${urlBD}/mensajes/`,
        mensaje,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return apiResponse;
}

export async function updateMensaje(mensaje) {
    const apiResponse = await axios.put(`${urlBD}/mensajes/`, mensaje, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return apiResponse;
}

export async function deleteMensaje(id_mensaje) {
    const apiResponse = await axios.delete(
        `${urlBD}/mensajes/${id_mensaje}`
    );
    return apiResponse;
}
