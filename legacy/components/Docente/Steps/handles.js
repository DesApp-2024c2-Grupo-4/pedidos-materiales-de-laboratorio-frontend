import { v4 as uuidv4 } from "uuid";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
        (fecha_fin >= new Date(reserva.fecha_inicio) &&
          fecha_fin <= new Date(reserva.fecha_fin)) ||
        (fecha_inicio <= new Date(reserva.fecha_inicio) &&
          fecha_fin >= new Date(reserva.fecha_fin))
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
  } else if (find && find.stock == -1) {
    return -1;
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
        (fecha_fin >= new Date(reserva.fecha_inicio) &&
          fecha_fin <= new Date(reserva.fecha_fin)) ||
        (fecha_inicio <= new Date(reserva.fecha_inicio) &&
          fecha_fin >= new Date(reserva.fecha_fin))
      );
    });
  if (overlappingReservation.length > 0) {
    // Actualizar la cantidad disponible en la franja horaria superpuesta
    let newCantidad = overlappingReservation.reduce((prev, curr) => {
      return curr.cantidad + prev;
    }, 0);
    newCantidad += cantidad || 0;
    // Ajustar las franjas horarias comprometidas
    let fecha_inicio_new = overlappingReservation.reduce((prev, curr) => {
      return prev < new Date(curr.fecha_inicio)
        ? prev
        : new Date(curr.fecha_inicio);
    }, fecha_inicio);

    let fecha_fin_new = overlappingReservation.reduce((prev, curr) => {
      return prev < new Date(curr.fecha_fin) ? new Date(curr.fecha_fin) : prev;
    }, fecha_fin);

    let reservation = {
      id: uuidv4(),
      fecha_inicio: fecha_inicio_new,
      fecha_fin: fecha_fin_new,
      cantidad: newCantidad,
    };
    setSaveHistoric((old) => ({
      ...old,
      [find._id]: {
        newReservation: reservation,
        oldArray: overlappingReservation,
      },
    }));
    find.enUso.push(reservation);
    find.enUso = find.enUso.filter(
      (e) => !overlappingReservation.some((i) => i.id == e.id) && e
    );
  } else {
    // No hay superposición, agregar una nueva reserva
    let reservation = {
      id: uuidv4(),
      fecha_inicio,
      fecha_fin,
      cantidad: cantidad || 0,
    };
    find.enUso.push(reservation);
    setSaveHistoric((old) => ({
      ...old,
      [find._id]: { newReservation: reservation, oldArray: [] },
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
  type
) => {
  let array = [...listaHook];
  let listaGeneral = [...lista];
  let listaMap = [...table];
  array = array.filter((e) => !selectedRows.find((i) => i._id == e[type]));
  listaGeneral = listaGeneral.map((e) => {
    if (selectedRows.find((i) => i._id == e._id)) {
      let find = saveHistoric[e._id];
      if (find.oldArray.length == 0) {
        e.enUso = e.enUso.filter((e) => find.newReservation.id != e.id);
      } else {
        e.enUso = e.enUso.filter((e) => find.newReservation.id != e.id);
        e.enUso = [...e.enUso, ...find.oldArray];
      }
    }
    return e;
  });
  listaMap = listaMap.filter((e) => !selectedRows.find((i) => i._id == e._id));
  return { listaMap, array, listaGeneral };
};
export { deleteSelected, handleItem, stockItem };

export const handleDownload = (e, pedido) => {
  e.stopPropagation();
  e.preventDefault();
  var doc = new jsPDF();

  const docWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(10);
  // Textos a la izquierda
  doc.text(`Pedido #${pedido.numero_tp}`, 10, 10);
  doc.text(
    `Docente: ${pedido.docente.nombre} ${pedido.docente.apellido}`,
    10,
    15
  );
  doc.text(
    `Número de laboratorio: ${
      pedido.numero_laboratorio != null
        ? pedido.numero_laboratorio
        : "sin asignar"
    }`,
    10,
    25
  );
  doc.text(
    `Edificio: ${pedido.edificio != "" ? pedido.edificio : "sin asignar"}`,
    10,
    30
  );
  doc.text(`Materia: ${pedido.materia}`, 10, 35);
  // Textos a la derecha
  let solicitud = pedido.fecha_solicitud.split("T")[0].split("-");
  solicitud = `${solicitud[2]}-${solicitud[1]}-${solicitud[0]}`;
  let utilización = pedido.fecha_utilizacion.split("T")[0].split("-");
  utilización = `${utilización[2]}-${utilización[1]}-${utilización[0]}`;
  let time = pedido.fecha_utilizacion
    .split("T")[1]
    .split(".")[0]
    .substring(0, 5);

  doc.text(`Fecha de solicitud: ${solicitud}`, docWidth - 100, 25);
  doc.text(
    `Fecha de utilización: ${utilización} a la hora ${time}`,
    docWidth - 100,
    30
  );
  doc.text(`Cantidad de alumnos: ${pedido.alumnos}`, docWidth - 100, 35);
  // Textos abajo
  doc.text(
    `Descripción: ${
      pedido.descripcion != "" ? pedido.descripcion : "sin asignar"
    }`,
    10,
    45
  );
  doc.text(
    `Observación: ${
      pedido.observaciones != "" ? pedido.observaciones : "sin asignar"
    }`,
    10,
    50
  );

  let number_content = 60;
  if (pedido.lista_materiales.length > 0) {
    doc.text(`Lista de equipos:`, 10, number_content);
    number_content += 5;
    doc.autoTable({
      startY: number_content,
      theme: "striped", // Aplica estilo de línea de cebra
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
      head: [["Clase", "Descripción", "Cantidad"]],
      body: pedido.lista_equipos.map((row) => [
        row.equipo.clase,
        row.equipo.descripcion,
        row.cantidad,
      ]),
    });
    number_content = doc.previousAutoTable.finalY + 5;
  }

  if (pedido.lista_materiales.length > 0) {
    number_content = number_content + 10;
    doc.text(`Lista de materiales:`, 10, number_content);
    number_content += 5;
    doc.autoTable({
      startY: number_content,
      theme: "striped", // Aplica estilo de línea de cebra
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
      head: [["Clase", "Descripción", "Cantidad"]],
      body: pedido.lista_materiales.map((row) => [
        row.material.clase,
        row.material.descripcion,
        row.cantidad,
      ]),
    });
    number_content = doc.previousAutoTable.finalY + 5;
  }

  if (pedido.lista_reactivos.length > 0) {
    number_content = number_content + 10;
    doc.text(`Lista de reactivos:`, 10, number_content);
    number_content += 5;
    doc.autoTable({
      startY: number_content,
      theme: "striped", // Aplica estilo de línea de cebra
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
      head: [
        [
          "Descripción",
          "CAS",
          "Calidad",
          "Cant Total",
          "U. de Medida",
          "Tipo. Conc.",
          "Medida Conc.",
          "Disolvente",
          "Otro. Disol.",
        ],
      ],
      body: pedido.lista_reactivos.map((row) => [
        row.reactivo.descripcion,
        row.reactivo.cas,
        row.calidad,
        row.cantidad,
        row.un_medida,
        row.concentracion_tipo,
        row.concentracion_medida,
        row.disolvente,
        row.otro_disolvente_descripcion,
      ]),
    });
  }

  doc.save(`pedido_${pedido.numero_tp}.pdf`);
};
