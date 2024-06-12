import axios from 'axios';
import { getPedidosPorDni } from './getPedidosPorDNIService';
import { getListaPedidos } from './getPedidosService';
import { token } from "./getToken";

export async function postPedido(data) {
  const body = JSON.stringify(data);
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/pedido/post`, body, {
      headers: {        
        Authorization: `Bearer ${token()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });    
    //await getPedidosPorDni(data.docente.dni, "TODOS", "", "", "TODOS", true, 1);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export default postPedido;




