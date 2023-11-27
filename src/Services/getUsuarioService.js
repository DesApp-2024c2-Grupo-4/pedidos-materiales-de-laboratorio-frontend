import axios from "axios";


export const getUsuario = async (usuario, password) => {
  const data = JSON.stringify({ usuario, password });
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, data, {
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
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuario/getAdmin/${id}`, {
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
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuario/`, {
        params,
        responseType: "json",
      });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
