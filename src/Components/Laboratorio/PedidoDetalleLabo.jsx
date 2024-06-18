import React, { useEffect, useState } from "react";
import pedidoicon from "../Image/pedido-icon.png";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TableContainer from "@mui/material/TableContainer";
import moment from "moment";
import Grid from "@mui/material/Grid";
import jsPDF from "jspdf";
import AsignarLaboratorio from "./AsignarLaboratorio";
import { Badge, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ChatOnline from "../chat-online/chat-online";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { getMensajes } from "../../Services/chat-service";
import Paper from "@mui/material/Paper";
import { IconButton } from "@material-ui/core";
import DownloadIcon from "@mui/icons-material/Download";
import "jspdf-autotable";
import { handleDownload } from "../Docente/Steps/handles";

function PedidoDetalle({ open, setOpen, scroll, handleClose, pedido }) {
  const {
    numero_tp,
    fecha_solicitud,
    fecha_utilizacion,
    numero_laboratorio,
    docente,
    edificio,
    alumnos,
    cantidad_grupos,
    lista_equipos,
    lista_materiales,
    lista_reactivos,
    descripcion,
    tipo_pedido,
    materia,
  } = pedido;
  const fechaActual = moment(fecha_solicitud).format("DD/MM/YYYY");
  const fechaActual2 = moment(fecha_utilizacion).utc().format("DD/MM/YYYY");
  const descriptionElementRef = React.useRef(null);
  const hora = moment(fecha_utilizacion).utc().format("HH:mm");
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
        if (ultimoElemento.nombre !== "LAB") {
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
              Pedido #{numero_tp}
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
            </Tooltip>
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
            <div
              className={`pedido-estado pedido-estado-detalle pedido-estado-fix ${tipo[tipo_pedido]}`}
            ></div>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Descarga">
                <IconButton onClick={(e) => handleDownload(e, pedido)}>
                  <DownloadIcon style={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
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
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                {lista_equipos.length > 0 && (
                  <>
                    <h4 className="pedido-categoria-detalle">Equipos</h4>

                    <Box>
                      <Table
                        stickyHeader
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

            <Grid sx={{ marginTop: 4 }}>
              <AsignarLaboratorio
                pedido={pedido}
                numero_tp={numero_tp}
                fecha_solicitud={fecha_solicitud}
                fecha_utilizacion={fecha_utilizacion}
                numero_laboratorio={numero_laboratorio}
                docente={docente}
                edificio={edificio}
                cantidad_grupos={cantidad_grupos}
                lista_equipos={lista_equipos}
                lista_materiales={lista_materiales}
                lista_reactivos={lista_reactivos}
                descripcion={descripcion}
                tipo_pedido={tipo_pedido}
                materia={materia}
                handleClose={handleClose}
                open={open}
              ></AsignarLaboratorio>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PedidoDetalle;
