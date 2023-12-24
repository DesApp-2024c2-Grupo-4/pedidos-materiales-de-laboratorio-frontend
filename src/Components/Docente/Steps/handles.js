import { v4 as uuidv4 } from 'uuid';
const stockItem = (fecha_inicio, fecha_fin, lista, id) => {
  const find = lista.find((e) => e._id == id);
  if (find && find.stock != -1) {
    // Calcular el stock disponible teniendo en cuenta las reservas
    const reservas = find.enUso || [];
    // Filtrar las reservas que se superponen con la fecha de interés
    const reservasEnFecha = reservas.filter((reserva) => {
      return (
        (fecha_inicio >= new Date(reserva.fecha_inicio) &&
          fecha_inicio <= new Date(reserva.fecha_fin)) ||
        (fecha_fin >= new Date(reserva.fecha_inicio) && fecha_fin <= new Date(reserva.fecha_fin)) ||
        (fecha_inicio <= new Date(reserva.fecha_inicio) && fecha_fin >= new Date(reserva.fecha_fin))
      );
    });
    // Sumar la cantidad de todas las reservas que se superponen
    const cantidadEnFecha = reservasEnFecha.reduce(
      (total, reserva) => total + reserva.cantidad,
      0
    );
    const stockTotal = find.stock - cantidadEnFecha;
    const stockDisponible = stockTotal - (find.enReparacion || 0);
    return stockDisponible;
  }else if(find && find.stock == -1){
    return -1
  }
};
const handleItem = (
  fecha_inicio,
  fecha_fin,
  listaHook,
  lista,
  table,
  id,
  cantidad,
  setSaveHistoric,
  type
) => {
  let array = [...listaHook];
  let listaGeneral = [...lista];
  let listaMap = [...table];
  let index = array.findIndex((e) => e.equipo == id);
  let indexGeneral = lista.findIndex((e) => e._id == id);
  let indexMap = listaMap.findIndex((e) => e._id == id);
  let find = lista.find((e) => e._id == id);
  // Verificar superposición con las reservas existentes
  let overlappingReservation =
    find.enUso.length > 0 &&
    find.enUso.filter((reserva) => {
      return (
        (fecha_inicio >= new Date(reserva.fecha_inicio) &&
          fecha_inicio <= new Date(reserva.fecha_fin)) ||
        (fecha_fin >= new Date(reserva.fecha_inicio) && fecha_fin <= new Date(reserva.fecha_fin)) ||
        (fecha_inicio <= new Date(reserva.fecha_inicio) && fecha_fin >= new Date(reserva.fecha_fin))
      );
    });
    if (overlappingReservation.length > 0) {
      // Actualizar la cantidad disponible en la franja horaria superpuesta
      let newCantidad = overlappingReservation.reduce((prev, curr) =>{
        return curr.cantidad + prev
      },0)
      newCantidad += cantidad || 0
      // Ajustar las franjas horarias comprometidas
      let fecha_inicio_new = overlappingReservation.reduce((prev, curr) =>{
        return prev < new Date(curr.fecha_inicio) ? prev : new Date(curr.fecha_inicio);
      },fecha_inicio) 

      let fecha_fin_new = overlappingReservation.reduce((prev, curr) =>{
        return prev < new Date(curr.fecha_fin) ? new Date(curr.fecha_fin) : prev;
      },fecha_fin)

      let reservation = {
        id: uuidv4(),
        fecha_inicio: fecha_inicio_new,
        fecha_fin: fecha_fin_new,
        cantidad: newCantidad,
      }
      setSaveHistoric((old) => ({
        ...old,
        [find._id]: {newReservation: reservation , oldArray: overlappingReservation},
      }));
      find.enUso.push(reservation)
      find.enUso = find.enUso.filter(e => !overlappingReservation.some(i => i.id == e.id) && e)
    } else {
      // No hay superposición, agregar una nueva reserva
      let reservation = {
        id: uuidv4(),
        fecha_inicio,
        fecha_fin,
        cantidad: cantidad || 0,
      }
      find.enUso.push(reservation);
      setSaveHistoric((old) => ({
        ...old,
        [find._id]: {newReservation: reservation , oldArray: []},
      }));
    }

    listaGeneral[indexGeneral] = find;
    find.id = id;
    find.cantidad = cantidad || find.cantidad;

    let obj = { [type]: id, cantidad: cantidad || 0 };
    index >= 0 ? (array[index] = obj) : array.push(obj);
    indexMap >= 0 ? (listaMap[indexMap] = find) : listaMap.push(find);
  return { listaMap, array, listaGeneral };
};
const deleteSelected = (
  listaHook,
  lista,
  table,
  selectedRows,
  saveHistoric,
  type,
) => {
  let array = [...listaHook];
  let listaGeneral = [...lista];
  let listaMap = [...table];
  array = array.filter((e) => !selectedRows.find(i => i._id == e[type]));
  listaGeneral = listaGeneral.map((e) => {
    if (selectedRows.find(i => i._id == e._id)) {
      let find = saveHistoric[e._id]
      if(find.oldArray.length == 0){
        e.enUso = e.enUso.filter(e => find.newReservation.id != e.id)
      }else{
        e.enUso = e.enUso.filter(e => find.newReservation.id != e.id)
        e.enUso = [...e.enUso,...find.oldArray]
      }
    }
    return e;
  });
  listaMap = listaMap.filter((e) => !selectedRows.find(i => i._id == e._id));
  return { listaMap, array, listaGeneral };
};
export { deleteSelected, handleItem, stockItem };

