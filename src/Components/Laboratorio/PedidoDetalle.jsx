import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Grid from "@mui/material/Grid";
import pedidoicon from "../Image/pedido-icon.png";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import { Badge, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ChatOnline from "../chat-online/chat-online";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { getMensajes } from "../../Services/chat-service";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import "jspdf-autotable";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "8px",
      height: "240px",
    },
  },
}));

function PedidoDetalle({ open, setOpen, scroll, handleClose, pedido }) {
  const {
    numero_tp,
    fecha_solicitud,
    fecha_utilizacion,
    numero_laboratorio,
    tipo_pedido,
    docente,
    alumnos,
    cantidad_grupos,
    edificio,
    lista_equipos,
    lista_materiales,
    lista_reactivos,
    descripcion,
  } = pedido;
  const fechaActual = moment(fecha_solicitud).format("DD/MM/YYYY");
  const fechaActual2 = moment(fecha_utilizacion).utc().format("DD/MM/YYYY");
  const hora = moment(fecha_utilizacion).utc().format("HH:mm");
  const descriptionElementRef = React.useRef(null);
  const [openButton, setOpenButton] = React.useState(false);
  const handleOpen = () => setOpenButton(true);
  const handleCloseButton = () => setOpenButton(false);
  const [cant, setCant] = useState(0);
  const [read, setRead] = useState(false);

  useEffect(() => {
    getMensajes(pedido._id).then((res) => {
      if (res.data != null) {
        const ultimoElemento =
          res.data.list_mensajes[res.data.list_mensajes.length - 1];
        //setRead(res.data.list_mensajes)
        if (ultimoElemento.nombre === "LAB") {
          const mensajesNoLeidos = res?.data?.list_mensajes.reduce(
            (count, mensaje) => {
              return count + (mensaje.read ? 0 : 1);
            },
            0
          );
          setCant((prevCant) =>
            prevCant !== mensajesNoLeidos ? mensajesNoLeidos : prevCant
          );
        }
        setRead(ultimoElemento.read);
      }
    });
  }, [read, cant, pedido._id, open]);

  const handleDownload = (e, pedido) => {
    e.stopPropagation();
    e.preventDefault();
    var doc = new jsPDF();

    const docWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(10);
    // Textos a la izquierda
    doc.text(`Pedido #${pedido.numero_tp}`, 10, 10);
    doc.text(`Docente: ${pedido.docente.nombre} ${pedido.docente.apellido}`, 10, 15);
    doc.text(`Número de laboratorio: ${pedido.numero_laboratorio != null ? pedido.numero_laboratorio : "sin asignar"}`, 10, 25);
    doc.text(`Edificio: ${pedido.edificio != "" ? pedido.edificio : "sin asignar"}`, 10, 30);
    doc.text(`Materia: ${pedido.materia}`, 10, 35);
    // Textos a la derecha
    doc.text(`Fecha de solicitud: ${pedido.fecha_solicitud.split("T")[0]}`, docWidth - 100, 25);
    doc.text(`Fecha de utilización: ${pedido.fecha_utilizacion.split("T")[0]} a la hora ${pedido.fecha_utilizacion.split("T")[1].split(".")[0].split(",")[0]}`, docWidth - 100, 30);
    doc.text(`Cantidad de alumnos: ${pedido.alumnos}`, docWidth - 100, 35);
    // Textos abajo
    doc.text(`Descripción: ${pedido.descripcion != "" ? pedido.descripcion : "sin asignar"}`, 10, 45);
    doc.text(`Observación: ${pedido.observaciones != "" ? pedido.observaciones : "sin asignar"}`, 10, 50);

    let number_content = 60;
    if (pedido.lista_materiales.length > 0) {
      doc.text(`Lista de equipos:`, 10, number_content);
      number_content += 5
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
      number_content += 5
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
      number_content += 5
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

  const tipo = {
    PENDIENTE: "pedido-estado-yellow",
    RECHAZADO: "pedido-estado-red",
    ACEPTADO: "pedido-estado-green",
    INACTIVO: "pedido-estado-gray",
  };
  return (
    <div>
      <Dialog
        open={Boolean(open)}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <div className="pedido-flex">
          <div className="pedido-grupo">
            <img className="pedido-icon-detalle" src={pedidoicon} alt="" />
            <DialogTitle className="pedido-numero" id="scroll-dialog-title">
              Pedido #{descripcion}
            </DialogTitle>
          </div>
          <div className="pedido-grupo">
            <label htmlFor="fecha_utilizacion" id="label_fecha_utilizacion">
              {" "}
              Fecha de práctica: <br></br> {fechaActual2} {hora}
            </label>
          </div>
          <div className="pedido-grupo pedido-grupo-iconos">
            <Tooltip title="Mensajes">
              <Badge badgeContent={cant} color="secondary">
                <MailIcon onClick={handleOpen} sx={{ color: "whitesmoke" }} />
              </Badge>
              <Modal
                open={openButton}
                onClose={handleCloseButton}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box>
                  <ChatOnline
                    setRead={setRead}
                    pedido={pedido}
                    onClose={handleCloseButton}
                  ></ChatOnline>
                </Box>
              </Modal>
            </Tooltip>
            <div
              className={`pedido-estado pedido-estado-detalle pedido-estado-fix ${tipo[tipo_pedido]}`}
            ></div>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={(e) => handleDownload(e, pedido)}>
                <DownloadIcon style={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </div>
        </div>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className="pedido-info">
              <fieldset className="pedido-info-fieldset">
                <label htmlFor="laboratorio" id="label_laboratorio">
                  {" "}
                  <strong>Laboratorio:</strong>{" "}
                  {numero_laboratorio !== 0
                    ? numero_laboratorio
                    : "Sin Asignar"}
                </label>
                <label id="label_alumno">
                  {" "}
                  <strong>Alumnos:</strong> {alumnos}
                </label>
                <label htmlFor="estado" id="label_estado">
                  {" "}
                  <strong>Estado:</strong> {tipo_pedido}
                </label>
                <label htmlFor="edificio" id="label_edificio">
                  {" "}
                  <strong>Edificio:</strong> {edificio}
                </label>
                <label id="label_grupo">
                  {" "}
                  <strong>Grupos:</strong> {cantidad_grupos}
                </label>
                <label id="label_docente">
                  {" "}
                  <strong>Docente:</strong>{" "}
                  {`${docente.nombre}  ${docente.apellido}`}
                </label>
              </fieldset>
            </div>
            <div id="card-info-detalle" className="card-info-prof">
              {/* LISTA EQUIPOS */}
              <TableContainer component={Paper}>
                {lista_equipos.length > 0 && (
                  <>
                    <h4 className="pedido-categoria-detalle">Equipos</h4>

                    <Box>
                      <Table
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableHead>
                          <TableRow sx={{ borderBottom: "2px solid white" }}>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Descripción
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Tipo
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Cantidad
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lista_equipos.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.equipo?.descripcion}
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.equipo?.clase}
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row?.cantidad}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </>
                )}
                {/* LISTA MATERIALES */}
                {lista_materiales.length > 0 && (
                  <>
                    <h4 className="pedido-categoria-detalle">Materiales</h4>

                    <Box>
                      <Table
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableHead>
                          <TableRow sx={{ borderBottom: "2px solid white" }}>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Descripción
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Cas
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lista_materiales.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.material?.descripcion}
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row?.cantidad}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </>
                )}
                {/* LISTA REACTIVOS */}
                {lista_reactivos.length > 0 && (
                  <>
                    <h4 className="pedido-categoria-detalle">Reactivos</h4>
                    <Box>
                      <Table
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableHead>
                          <TableRow sx={{ borderBottom: "2px solid white" }}>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Descripción
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Cas
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Calidad
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Cant Total
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              U. de Medida
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Tipo Conc.
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Medida Conc.
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", py: "0 !important" }}
                            >
                              Disolvente
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lista_reactivos.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.reactivo.descripcion}
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.reactivo.cas}
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.calidad}
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.cantidad}
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.un_medida}
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.concentracion_tipo}
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.concentracion_medida}
                              </TableCell>
                              <TableCell
                                sx={{ color: "white", py: "5px !important" }}
                              >
                                {row.disolvente === "otro" ? (
                                  <>{row.otro_disolvente_descripcion}</>
                                ) : (
                                  <>{row.disolvente}</>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </>
                )}
              </TableContainer>
            </div>

            <Button
              fullWidth
              margin="normal"
              variant="outlined"
              bgcolor={"secondary"}
              color={"primary"}
              onClick={() => {
                handleClose(false);
              }}
              className="boton-cerrar-pedido boton-cerrar-pedido-prof"
            >
              Cerrar
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PedidoDetalle;
