import axios from "axios";


export async function postReactivo(data) {
  const body = JSON.stringify(data);
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/reactivo/post`, body, {
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
export default postReactivo;
