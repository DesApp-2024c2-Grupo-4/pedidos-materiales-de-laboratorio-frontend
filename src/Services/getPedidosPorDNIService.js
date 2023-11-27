import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token')).token

export async function getPedidosPorDni(dni) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/pedido/getAllByDni/${dni}`,{
          headers: {        
            Authorization: `Bearer ${token}`,
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