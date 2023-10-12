import axios from 'axios';

//EQUIPOS

export function getListaEquipos() {
    return fetch('http://localhost:3000/api/equipo/getAll')
        .then(data => data.json())
}
export async function getListaEquiposFiltrada(buscar) {
    var params={};
    if (buscar.length>0){params.buscar=buscar}
    try {
        const response = await axios({
            method: 'get',params,
            url: `http://localhost:3000/api/equipo/`,
            responseType: 'json'
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

//MATERIALES
export function getListaMateriales() {
    return fetch('http://localhost:3000/api/material/getAll')
        .then(data => data.json())
}
export async function getListaMaterialesFiltrada(buscar) {
    var params={};
    if (buscar.length>0){params.buscar=buscar}
    try {
        const response = await axios({
            method: 'get',params,
            url: `http://localhost:3000/api/material/`,
            responseType: 'json'
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// REACTIVOS

export function getListaReactivos() {
    return fetch('http://localhost:3000/api/reactivo/getAll')
        .then(data => data.json())
}
export async function getListaReactivosFiltrada(buscar) {
    var params={};
    if (buscar.length>0){params.buscar=buscar}
    try {
        const response = await axios({
            method: 'get',params,
            url: `http://localhost:3000/api/reactivo/`,
            responseType: 'json'
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};