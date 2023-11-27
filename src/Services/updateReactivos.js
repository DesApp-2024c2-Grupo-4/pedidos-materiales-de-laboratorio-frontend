import axios from 'axios';


export default async function updateReactivo(id, data) {
    const body = JSON.stringify(data);
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/reactivo/update/${id}`, body, {
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
  