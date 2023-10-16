import axios from 'axios';
import { urlBD } from '../connectDB';

export const getUsuario = async(usuario, password) => {
    try {
        const data = await fetch(`${urlBD}/api/auth/login`,{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({usuario, password})
            })
            if(data.statusText === "Unauthorized") {throw new Error;}
        return data.json()
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