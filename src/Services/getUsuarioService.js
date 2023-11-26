import axios from 'axios';
import { urlBD } from '../connectDB';

export const getUsuario = async (usuario, password) => {
    try {
        const data = await axios({
            method: 'POST',
            url: `${urlBD}/api/auth/login`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({ usuario, password })
        });

        if (data.statusText === "Unauthorized") {
            throw new Error;
        }

        return data.data;  // Utiliza data.data para obtener el cuerpo de la respuesta
    } catch (error) {
        console.log(error);
    }
}

export const getAdmin = async(id) => {
    try {
        const response = await axios.get(`${urlBD}/api/usuario/getAdmin/${id}`,{
                    headers: {
                        Accept: 'application/json',
                    },
            })
        return response.data
    } catch (error) {
        console.log(error)
    }   
        
}


export async function getListaUsuariosFiltrada(buscar) {
    var params={};
    if (buscar.length>0){params.buscar=buscar}
    try {
        const response = await axios({
            method: 'get',
            params,
            url: `${urlBD}/api/usuario/`,
            responseType: 'json'
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};