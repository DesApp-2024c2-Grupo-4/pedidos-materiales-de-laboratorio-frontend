import axios from 'axios';
import { urlBD } from '../connectDB';

export default async function updateUsuario(id, data) {
    const body = JSON.stringify(data);
    try {
      const response = await axios.patch(`${urlBD}/api/usuario/update/${id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  