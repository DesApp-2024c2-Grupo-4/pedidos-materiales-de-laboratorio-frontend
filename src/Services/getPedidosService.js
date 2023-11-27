import axios from 'axios';



export async function getListaPedidos() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/pedido/getAll`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error; 
    }
}
export async function getCantidadPedidos() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/pedido/getAll`);
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
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
