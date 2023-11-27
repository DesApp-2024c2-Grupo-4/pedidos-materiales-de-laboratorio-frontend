import axios from "axios";
import { urlBD } from "../connectDB";
//EQUIPOS

export async function getListaEquipos() {
  try {
    const response = await axios.get(`${urlBD}/api/equipo/getAll`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getListaEquiposFiltrada(buscar) {
  var params = {};
  if (buscar.length > 0) {
    params.buscar = buscar;
  }
  try {
    const response = await axios.get(`${urlBD}/api/equipo/`, {
      params,
      responseType: "json",
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
//MATERIALES
export async function getListaMateriales() {
  try {
    const response = await axios.get(`${urlBD}/api/material/getAll`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getListaMaterialesFiltrada(buscar) {
  var params = {};
  if (buscar.length > 0) {
    params.buscar = buscar;
  }
  try {
    const response = await axios.get(`${urlBD}/api/material/`, {
      params,
      responseType: "json",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// REACTIVOS
export async function getListaReactivos() {
  try {
    const response = await axios.get(`${urlBD}/api/reactivo/getAll`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getListaReactivosFiltrada(buscar) {
  var params = {};
  if (buscar.length > 0) {
    params.buscar = buscar;
  }
  try {
    const response = await axios.get(`${urlBD}/api/reactivo/`, {
      params,
      responseType: "json",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
