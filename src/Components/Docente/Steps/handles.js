const stockItem = (fecha_inicio, fecha_fin, lista, id) => {
  const find = lista.find((e) => e._id == id);
  if (find) {
    // Calcular el stock disponible teniendo en cuenta las reservas
    const reservas = find.enUso || [];
    // Filtrar las reservas que se superponen con la fecha de interés
    const reservasEnFecha = reservas.filter((reserva) => {
      return (
        (fecha_inicio >= reserva.fecha_inicio &&
          fecha_inicio <= reserva.fecha_fin) ||
        (fecha_fin >= reserva.fecha_inicio && fecha_fin <= reserva.fecha_fin) ||
        (fecha_inicio <= reserva.fecha_inicio && fecha_fin >= reserva.fecha_fin)
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
  setSaveHistoric
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
    find.enUso.lenght > 0 &&
    find.enUso.find((reserva) => {
      return (
        (fecha_inicio >= reserva.fecha_inicio &&
          fecha_inicio <= reserva.fecha_fin) ||
        (fecha_fin >= reserva.fecha_inicio && fecha_fin <= reserva.fecha_fin) ||
        (fecha_inicio <= reserva.fecha_inicio && fecha_fin >= reserva.fecha_fin)
      );
    });
  let indexFind = find.enUso.findIndex((reserva) => {
    return (
      (fecha_inicio >= reserva.fecha_inicio &&
        fecha_inicio <= reserva.fecha_fin) ||
      (fecha_fin >= reserva.fecha_inicio && fecha_fin <= reserva.fecha_fin) ||
      (fecha_inicio <= reserva.fecha_inicio && fecha_fin >= reserva.fecha_fin)
    );
  });

  if (overlappingReservation) {
    setSaveHistoric((old) => ({
      ...old,
      [find._id]: { index: indexFind, reservation: overlappingReservation },
    }));
    // Actualizar la cantidad disponible en la franja horaria superpuesta
    overlappingReservation.cantidad += cantidad || 0;

    // Ajustar las franjas horarias comprometidas
    overlappingReservation.fecha_inicio = Math.min(
      overlappingReservation.fecha_inicio,
      fecha_inicio
    );
    overlappingReservation.fecha_fin = Math.max(
      overlappingReservation.fecha_fin,
      fecha_fin
    );
  } else {
    // No hay superposición, agregar una nueva reserva
    find.enUso.push({
      fecha_inicio,
      fecha_fin,
      cantidad: cantidad || 0,
    });
  }

  listaGeneral[indexGeneral] = overlappingReservation
    ? overlappingReservation
    : find;
  find.id = id;
  find.cantidad = cantidad || find.cantidad;

  let obj = { equipo: id, cant_equipo: cantidad || 0 };
  index >= 0 ? (array[index] = obj) : array.push(obj);
  indexMap >= 0 ? (listaMap[indexMap] = find) : listaMap.push(find);
  return { listaMap, array, listaGeneral };
};
const deleteSelected = (
  listaHook,
  lista,
  table,
  selectedRows,
  saveHistoric
) => {
  let array = [...listaHook];
  let listaGeneral = [...lista];
  let listaMap = [...table];
  array = array.filter((e) => !selectedRows.hasOwnProperty(e.equipo));
  console.log(saveHistoric)
  listaGeneral = listaGeneral.map((e) => {
    if (selectedRows.hasOwnProperty(e._id)) {
      let find = saveHistoric[e._id];
      e.enUso[find.index] = find.reservation;
    }
    return e;
  });
  listaMap = listaMap.filter((e) => !selectedRows.hasOwnProperty(e._id));
  return { listaMap, array, listaGeneral };
};
export { deleteSelected, handleItem, stockItem };
