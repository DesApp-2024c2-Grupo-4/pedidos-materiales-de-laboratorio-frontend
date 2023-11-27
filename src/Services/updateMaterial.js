import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token')).token

export default async function updateMaterial(id, data) {
    const body = JSON.stringify(data);
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/material/update/${id}`, body, {
        headers: {        
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
