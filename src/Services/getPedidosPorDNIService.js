import { urlBD } from '../connectDB';
export function getPedidosPorDni(dni) {
    return fetch(`${urlBD}/api/pedido/getAllByDni/` + dni)
        .then(data => data.json())
}