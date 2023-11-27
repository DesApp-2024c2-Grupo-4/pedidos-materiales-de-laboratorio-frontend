import axios from "axios";
import { urlBD } from "../connectDB";

export async function postMaterial(data) {
  const body = JSON.stringify(data);
  try {
    const response = await axios.post(`${urlBD}/api/material/post`, body, {
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
export default postMaterial;
