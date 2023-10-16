import { urlBD } from '../connectDB';
export async function postUsuario(data) {

    const requestJson = JSON.stringify(data);
    try {
      const response = await fetch(`${urlBD}/api/auth/register`, {
        method: "POST",
        body: requestJson,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const responseText = await response.text();
      console.log(responseText);
    } catch (e) {
      console.log(e);
    }
  
  };
  export default postUsuario;