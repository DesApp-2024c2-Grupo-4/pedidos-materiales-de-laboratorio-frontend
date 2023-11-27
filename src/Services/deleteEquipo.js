import axios from 'axios';

export default async function deleteEquipo(id) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/equipo/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Error en la solicitud DELETE: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}