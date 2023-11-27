import axios from 'axios';
import { urlBD } from '../connectDB';
  
export async function postUsuario(data) {
  const body = JSON.stringify(data);
  try {
    const response = await axios.post(`${urlBD}/api/auth/register`, body, {
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
export default postUsuario;
