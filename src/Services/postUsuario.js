import axios from 'axios';

  
export async function postUsuario(data) {
  const body = JSON.stringify(data);
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, body, {
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
