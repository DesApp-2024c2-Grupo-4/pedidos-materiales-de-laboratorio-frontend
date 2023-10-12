import axios from 'axios';
import { urlBD } from '../connectDB';

export function getListaPedidos() {
    return fetch(`${urlBD}/api/pedido/getAll`)
        .then(data => data.json())
}

export async function getCantidadPedidos() {
    const response = await fetch(`${urlBD}/api/pedido/getAll`);
    const data = await response.json();
    const cantidad = Object.keys(data).length;

    return cantidad 
    
}




export async function axiosGetPedido(fecha_utilizacion, tipo_pedido, fecha_inicio, fecha_fin, edificio)  {
    console.log(fecha_inicio);
    var params={}
    
    if((tipo_pedido.length>0)&&(tipo_pedido!=="TODOS")){params.tipo_pedido= tipo_pedido}
    if((edificio.length>0)&&(edificio!=="TODOS")){params.edificio= edificio}
    if((fecha_inicio.length>0) &&( fecha_fin.length>0)){
        params.fecha_fin=fecha_fin;params.fecha_inicio=fecha_inicio    }
    try {
       
        const response = await axios({
            method: 'get',params,
            
            url: `${urlBD}/api/pedido/`,
            responseType: 'json'
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


