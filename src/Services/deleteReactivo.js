import axios from 'axios';
import { urlBD } from '../connectDB';
export default async function deleteReactivo(id) {
    try {
        const response = await axios.delete(`${urlBD}/api/reactivo/delete/${id}`, {
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