import axios from "axios";
import { urlBD } from "../connectDB";

export const getUsuario = async (usuario, password) => {
  const data = JSON.stringify({ usuario, password });
  try {
    const response = await axios.post(`${urlBD}/api/auth/login`, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new Error("Credenciales inválidas");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error en la solicitud de inicio de sesión");
  }
};

export const getAdmin = async (id) => {
  try {
    const response = await axios.get(`${urlBD}/api/usuario/getAdmin/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function getListaUsuariosFiltrada(buscar) {
  var params = {};
  if (buscar.length > 0) {
    params.buscar = buscar;
  }
  try {
    const response = await axios.get(`${urlBD}/api/usuario/`, {
        params,
        responseType: "json",
      });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
