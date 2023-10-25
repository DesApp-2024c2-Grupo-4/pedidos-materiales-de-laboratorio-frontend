import { urlBD } from '../connectDB';

export async function postPedido(data) {

  const requestJson = JSON.stringify(data);
  try {
    const response = await fetch(`${urlBD}/api/pedido/post`, {
      method: "POST",
      body: requestJson,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const responseText = await response.text();
    console.log(responseText);
  } catch (ex) {
    console.log(ex);
  }

};
export default postPedido;



