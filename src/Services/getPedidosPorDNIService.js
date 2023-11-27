import axios from 'axios';


export async function getPedidosPorDni(dni) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/pedido/getAllByDni/${dni}`)
        return response.data
      } catch (error) {
        console.log(error)
        throw error; 
      }
}