import axios from 'axios';
import { urlBD } from '../connectDB';

export async function getPedidosPorDni(dni) {
    try {
        const response = await axios.get(`${urlBD}/api/pedido/getAllByDni/${dni}`)
        return response.data
      } catch (error) {
        console.log(error)
        throw error; 
      }
}