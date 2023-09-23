import axios from 'axios';
import { urlBD } from '../connectDB';

export const getUsuario = async(usuario, password) => {
    try {
        const data = await fetch(`${urlBD}/api/usuario/getOneByUsuarioContrasenia`,{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({usuario, password})
            })
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
            url: `${urlBD}/api/usuarios/`,
            responseType: 'json'
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};