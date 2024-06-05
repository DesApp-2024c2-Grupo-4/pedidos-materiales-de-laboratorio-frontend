import React from "react";
import pedidoicon from "../Image/pedido-icon.png";
import { Icon, makeStyles } from "@material-ui/core";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Theme1 from "../Theme/Theme1";
import { ThemeProvider } from "@mui/material/styles";
import jsPDF from "jspdf";
// import { getUsuario } from '../../Services/getUsuarioService';
import moment from "moment";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  CardHeader,
  IconButton,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PedidoDetalle from "../Laboratorio/PedidoDetalle";
import PedidoDetalleLabo from "../Laboratorio/PedidoDetalleLabo";
import { Tooltip, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import "jspdf-autotable";
import { handleDownload } from "./Steps/handles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: "8px",
    minHeight: "240px",
  },
}));

function PedidoV1({ pedido, esAdmin }) {
  // const { root } = useStyles();

  const {
    descripcion,
    tipo_pedido,
    numero_tp,
    fecha_utilizacion,
    fecha_solicitud,
    alumnos,
    edificio,
    numero_laboratorio,
    docente,
    cantidad_grupos,
    lista_equipos,
  } = pedido;
  const fecha_utilizar = moment(fecha_utilizacion)
    .utc()
    .format("DD/MM/YYYY HH:mm");

  const [open, setOpen] = React.useState("");
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /*  control de estado pendiente con fecha cercana de utilizacion */
  // const [estaPendiente,setEstaPendiente]=React.useState(false);
  var manana = new Date();
  manana = manana.setTime(manana.getTime() + 2 * 24 * 60 * 60 * 1000);

  const formatManiana = moment(manana).format("YYYY-MM-DD").toString();

  // if((fecha_utilizacion<=formatManiana)&& (tipo_pedido==="PENDIENTE")){
  //   setEstaPendiente('red')
  // };

  const tipo = {
    PENDIENTE: "pedido-estado-yellow",
    RECHAZADO: "pedido-estado-red",
    ACEPTADO: "pedido-estado-green",
    INACTIVO: "pedido-estado-gray",
  };
  return (
    <>
      <Box
        sx={{ m: 10 }}
        styles={{
          margin: "8px",
          height: "240px",
        }}
        padding="2px"
      >
        <Card className="card">
          <CardActionArea onClick={handleClickOpen("body")}>
            <CardHeader
              style={{ textAlign: "left" }}
              avatar={<img className="pedido-icon" src={pedidoicon} alt="" />}
              title={`Pedido #${numero_tp}`}
              // subheader={`Fecha : ${fecha_solicitud}`}
              subheader={`Fecha de Práctica: ${fecha_utilizar}`}
              action={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{ mt: "-5px !important" }}
                    className={
                      pedido.vigente ? tipo[tipo_pedido] : tipo["INACTIVO"]
                    }
                  ></Box>
                  <Tooltip title="Descargas">
                    <IconButton onClick={(e) => handleDownload(e, pedido)}>
                      <DownloadIcon style={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            />
            <CardMedia
              style={{ paddingTop: "3%" }}
              image="./media/background.png"
              title="Background image"
            />
            <CardContent style={{ textAlign: "left" }}>
              <p className="pedido-item">
                <strong className="pedido-categoria">Laboratorio: </strong>{" "}
                {numero_laboratorio !== 0 ? numero_laboratorio : "Sin asignar"}
              </p>
              <p className="pedido-item">
                <strong className="pedido-categoria">Edificio: </strong>{" "}
                {edificio}
              </p>
              <p className="pedido-item">
                <strong className="pedido-categoria">Alumnos: </strong>{" "}
                {alumnos}
              </p>
              <p className="pedido-item">
                <strong className="pedido-categoria">Docente: </strong>{" "}
                {`${docente.nombre} ${docente.apellido}`}
              </p>
              {fecha_utilizacion < formatManiana &&
              tipo_pedido === "PENDIENTE" ? (
                <Typography sx={{ color: "white" }}>
                  <p className="pedido-item">
                    <strong className="pedido-categoria">Estado: </strong>
                    {pedido.vigente ? tipo_pedido : "INACTIVO"}
                  </p>
                </Typography>
              ) : (
                <Typography>
                  <p className="pedido-item">
                    <strong className="pedido-categoria">Estado: </strong>
                    {tipo_pedido}
                  </p>
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      {!(esAdmin === "lab") ? (
        <PedidoDetalle
          key={pedido._id.toString()}
          open={Boolean(open)}
          setOpen={setOpen}
          handleClose={handleClose}
          scroll={scroll}
          pedido={pedido}
        ></PedidoDetalle>
      ) : (
        <PedidoDetalleLabo
          key={pedido._id.toString()}
          open={Boolean(open)}
          setOpen={setOpen}
          handleClose={handleClose}
          scroll={scroll}
          pedido={pedido}
        ></PedidoDetalleLabo>
      )}
    </>
  );
}

export default PedidoV1;
