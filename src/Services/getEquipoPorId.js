import axios from 'axios';
import { urlBD } from '../connectDB';
export async function getEquipoPorId (id) {
  try {
    const response = await axios.get(`${urlBD}/api/equipo/getOne/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error; 
  }
}
 

