import axios from 'axios';
import { token } from "./getToken";

export async function getEquipoPorId (id) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/equipo/getOne/${id}`,{
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
 

