import axios from 'axios';
import { token } from "./getToken";


export async function getListaPedidos() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/pedido/getAll`,{
        headers: {        
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      return response.data
    } catch (error) {
      console.log(error)
      throw error; 
    }
}
export async function getCantidadPedidos() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/pedido/getAll`,{
        headers: {        
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const cantidad = Object.keys(response.data).length;
      return cantidad;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }




export async function axiosGetPedido( tipo_pedido, fecha_inicio, fecha_fin, edificio)  {
    var params={}    
    try {
        if (tipo_pedido && tipo_pedido !== "TODOS") {
            params.tipo_pedido = tipo_pedido;
        }
        if (edificio && edificio !== "TODOS") {
            params.edificio = edificio;
        }
        if (fecha_inicio && fecha_fin) {
            params.fecha_inicio = fecha_inicio;
            params.fecha_fin = fecha_fin;
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/pedido/`, {
            params,
            headers: {        
              Authorization: `Bearer ${token()}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
