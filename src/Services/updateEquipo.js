import axios from 'axios';
import { urlBD } from '../connectDB';

export default async function updateEquipo(id, data) {
    const body = JSON.stringify(data);
    try {
      const response = await axios.patch(`${urlBD}/api/equipo/update/${id}`, body, {
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
  