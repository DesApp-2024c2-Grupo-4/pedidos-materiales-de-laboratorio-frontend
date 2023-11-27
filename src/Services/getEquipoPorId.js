import axios from 'axios';

export async function getEquipoPorId (id) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/equipo/getOne/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
    throw error; 
  }
}
 

