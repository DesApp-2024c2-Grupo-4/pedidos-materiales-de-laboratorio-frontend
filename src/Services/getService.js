import axios from 'axios';
import { urlBD } from '../connectDB';
//EQUIPOS

export function getListaEquipos() {
    return fetch(`${urlBD}/api/equipo/getAll`)
        .then(data => data.json())
}
export async function getListaEquiposFiltrada(buscar) {
    var params={};
    if (buscar.length>0){params.buscar=buscar}
    try {
        const response = await axios({
            method: 'get',params,
            url: `${urlBD}/api/equipo/`,
            responseType: 'json'
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

//MATERIALES
export function getListaMateriales() {
    return fetch(`${urlBD}/api/material/getAll`)
        .then(data => data.json())
}
export async function getListaMaterialesFiltrada(buscar) {
    var params={};
    if (buscar.length>0){params.buscar=buscar}
    try {
        const response = await axios({
            method: 'get',params,
            url: `${urlBD}/api/material/`,
            responseType: 'json'
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// REACTIVOS

export function getListaReactivos() {
    return fetch(`${urlBD}/api/reactivo/getAll`)
        .then(data => data.json())
}
export async function getListaReactivosFiltrada(buscar) {
    var params={};
    if (buscar.length>0){params.buscar=buscar}
    try {
        const response = await axios({
            method: 'get',params,
            url: `${urlBD}/api/reactivo/`,
            responseType: 'json'
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};