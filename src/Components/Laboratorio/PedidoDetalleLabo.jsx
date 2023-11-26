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

import AsignarLaboratorio from "./AsignarLaboratorio";
import { Badge, Tooltip } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ChatOnline from "../chat-online/chat-online";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { getMensajes } from "../../Services/chat-service";
function PedidoDetalle({
  open,
  setOpen,
  scroll,
  handleClose,
  pedido ,
}) {
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
      if(res.data != null){
        const ultimoElemento = res.data.list_mensajes[res.data.list_mensajes.length - 1];
        if (ultimoElemento.nombre !== "LAB") {
          const mensajesNoLeidos = res?.data?.list_mensajes.reduce((count, mensaje) => {
            return count + (mensaje.read ? 0 : 1);
          }, 0);
          setCant((prevCant) => (prevCant !== mensajesNoLeidos ? mensajesNoLeidos : prevCant));
        }
        setRead(ultimoElemento.read)
      }
    });
  },[read, cant, pedido._id, open])
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
              className={`pedido-estado pedido-estado-detalle pedido-estado-fix ${
                tipo_pedido === "PENDIENTE"
                  ? "pedido-estado-yellow"
                  : tipo_pedido === "RECHAZADO"
                  ? "pedido-estado-red"
                  : "pedido-estado-green"
              }`}
            ></div>
            <MoreVertIcon style={{ color: "#fff" }} />
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
            <div id="card-info-detalle">
              {/* LISTA EQUIPOS */}
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <h4 className="pedido-categoria-detalle">Equipos</h4>
                  <Grid
                    container
                    direction="row"
                    justifyContent="start"
                    className="requerimientos-header"
                    alignItems="center"
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 12 }}
                  >
                    <Grid item xs={6} container justifyContent="flex-start">
                      Descripción
                    </Grid>
                    <Grid item xs={2} container justifyContent="flex-start">
                      Tipo
                    </Grid>
                    <Grid item xs={3} container justifyContent="flex-end">
                      Cantidad
                    </Grid>
                  </Grid>

                  {lista_equipos.length > 0 ? (
                    <div>
                      {lista_equipos.map((row, index) => (
                        //key={row._id}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                        <Grid
                          key={index}
                          container
                          direction="row"
                          alignItems="center"
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12 }}
                        >
                          <Grid item xs={6} container justifyContent="start">
                            {row.equipo.descripcion}
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            container
                            justifyContent="flex-start"
                          >
                            {row.equipo.clase}
                          </Grid>
                          <Grid item xs={3} container justifyContent="end">
                            {row.cantidad}
                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Table>

                {/* LISTA MATERIALES */}
                <h4 className="pedido-categoria-detalle">Materiales</h4>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <Grid
                    container
                    direction="row"
                    justifyContent="Start"
                    className="requerimientos-header"
                    alignItems="center"
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 12 }}
                  >
                    <Grid item xs={6} container justifyContent="flex-start">
                      Descripción
                    </Grid>
                    <Grid item xs={5} container justifyContent="flex-end">
                      Cantidad
                    </Grid>
                  </Grid>
                  <TableBody>
                    {lista_materiales.length > 0 ? (
                      <div>
                        {lista_materiales.map((row, index) => (
                          <Grid
                            key={index}
                            container
                            direction="row"
                            alignItems="center"
                            spacing={{ xs: 2, md: 2 }}
                            columns={{ xs: 12 }}
                          >
                            <Grid item xs={6} container justifyContent="start">
                              {row.material.descripcion}
                            </Grid>
                            <Grid
                              item
                              xs={5}
                              container
                              justifyContent="flex-end"
                            >
                              {row.cantidad}
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </TableBody>
                </Table>

                {/* LISTA REACTIVOS */}

                <h4 className="pedido-categoria-detalle">Reactivos</h4>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    className="requerimientos-header"
                    alignItems="center"
                    marginBottom={1}
                    spacing={{ xs: 1, md: 1 }}
                    columns={{ xs: 12 }}
                  >
                    <Grid item xs={2} container justifyContent="center">
                      Descripción
                    </Grid>
                    <Grid item xs={2} container justifyContent="center">
                      Cas
                    </Grid>
                    <Grid item xs={1} container justifyContent="center">
                      Calidad
                    </Grid>
                    <Grid item xs={2} container justifyContent="center">
                      Cant Total
                    </Grid>
                    <Grid item xs={1} container justifyContent="center">
                      U. de Medida
                    </Grid>
                    <Grid item xs={1} container justifyContent="center">
                      Tipo Conc.
                    </Grid>
                    <Grid item xs={1} container justifyContent="center">
                      Medida Conc.
                    </Grid>
                    <Grid item xs={2} container justifyContent="center">
                      Disolvente
                    </Grid>
                    {/* <Grid item xs={1} container justifyContent="center" >
                                        Cant Total
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center" >
                                        U. Med
                                    </Grid> */}
                  </Grid>
                  {lista_reactivos.length > 0 ? (
                    <div>
                      {lista_reactivos.map((row, index) => (
                        <Grid
                          key={index}
                          container
                          direction="row"
                          justifyContent="start"
                          alignItems="center"
                          spacing={{ xs: 1, md: 1 }}
                          columns={{ xs: 12 }}
                        >
                          <Grid item xs={2} container justifyContent="center">
                            {row.reactivo.descripcion}
                          </Grid>
                          <Grid item xs={2} container justifyContent="center">
                            {row.reactivo.cas}
                          </Grid>
                          <Grid item xs={1} container justifyContent="center">
                            {row.calidad}
                          </Grid>
                          <Grid item xs={2} container justifyContent="center">
                            {row.cantidad}
                          </Grid>
                          <Grid item xs={1} container justifyContent="center">
                            {row.un_medida}
                          </Grid>
                          <Grid item xs={1} container justifyContent="center">
                            {row.concentracion_tipo}
                          </Grid>
                          <Grid
                            item
                            xs={1}
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            {row.concentracion_medida}
                          </Grid>
                          <Grid item xs={2} container justifyContent="center">
                            {row.disolvente === "otro" ? (
                              <div>{row.otro_disolvente_descripcion}</div>
                            ) : (
                              <div>{row.disolvente} </div>
                            )}
                            {/* {row.disolvente} */}
                          </Grid>
                          {/* <Grid item xs={1} container justifyContent="center" >
                                                    {row.cantidad}
                                                </Grid> */}
                          {/* <Grid item xs={1} container justifyContent="center" alignItems="center">
                                                    {row.concentracion_medida}
                                                </Grid> */}
                        </Grid>
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Table>
              </TableContainer>
            </div>

            <Grid container direction="row" sx={{ marginTop: 4 }}>
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
