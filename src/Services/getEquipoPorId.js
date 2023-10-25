import { urlBD } from '../connectDB';
export function getEquipoPorId (id) {
      return fetch(`${urlBD}/api/equipo/getOne/` + id)
      
    .then(data => data.json())
}
 

