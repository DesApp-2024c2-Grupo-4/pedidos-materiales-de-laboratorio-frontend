import PedidoV1 from "./PedidoV1";
import { getPedidosPorDni } from "../../Services/getPedidosPorDNIService";
import Header from "../Header/Header";
import React, { useEffect, useMemo, useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NoEncontrados from "../Mensajes/NoEncontrados";
import NuevoPedido from "./NuevoPedido";
import { userContext } from "../../Context/LabProvider";
import BasicModal from "../Laboratorio/utils/BasicModal";
import { CircularProgress, Fab } from "@mui/material";
import Filtros from "../Laboratorio/Filtros";
import InfiniteScroll from "react-infinite-scroll-component";
import { correctionDate, dateFormat } from "../Laboratorio/utils/formatDate";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Pedidos() {
  // controlar si es adminitrador
  const [esAdmin, setEsAdmin] = useState("");
  const { user, userInfo, update } = React.useContext(userContext);

  const [page, setPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);
  const [pageLength, setPageLength] = useState(0);

  const [nuevoPedido, setNuevoPedido] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const [listaPedidos, setListaPedidos] = useState([]);

  const now = correctionDate(new Date());
  const [dni, setDni] = React.useState("");
  const [tipo_pedido, setTipoPedido] = React.useState("TODOS");
  const [fecha_utilizacion, set_fecha_utilizacion] = React.useState("");
  const [fecha_inicio, set_fecha_inicio] = React.useState("");
  const [fecha_fin, set_fecha_fin] = React.useState(now);
  const [edificio, set_edificio] = React.useState("TODOS");
  const [checked, setChecked] = React.useState(true);

  const [open, setOpen] = React.useState("");
  const [scroll, setScroll] = React.useState("paper");
  const [alert, setAlert] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const cargarEstado = (event) => {
    event.preventDefault();
    console.log(event.target.value);

    guardarEstadoPedido(event.target.value);
  };
  const guardarEstadoPedido = (event) => {
    setTipoPedido(event);
  };

  async function cargarNuevosPedidos(page, list) {
    // if(tipo_pedido==="TODOS"){ guardarEstadoPedido("")}
    // if(edificio==="TODOS"){set_edificio("")}
    if (new Date(fecha_inicio) > new Date(dateFormat(fecha_fin))) {
      return setAlert(true);
    }
    setAlert(false);
    if (dni) {
      await getPedidosPorDni(
        dni,
        tipo_pedido,
        fecha_inicio,
        fecha_fin,
        edificio,
        checked,
        page
      ).then((item) => {
        let newArray = [...list, ...item.data];
        setListaPedidos(newArray);
        setTotalLength(item.totalCount);
        setPageLength(item.totalPages);
      });
    }
  }
  useEffect(() => {
    let mounted = true;
    setEsAdmin(user.rol === "lab");
    userInfo(user._id).then((res) => {
      setDni(res.dni);
    });
    return () => (mounted = false);
  }, [update]);

  useEffect(() => {
    if (dni) {
      setPage(1);
      setListaPedidos([]);
      cargarNuevosPedidos(1, []);
      setIsClose(false);
    }
  }, [dni, tipo_pedido, fecha_fin, fecha_inicio, edificio, checked, isClose]);
  const recharger = () => {
    setIsClose(true);
  };
  const nextPage = () => {
    if (page < pageLength) {
      setPage(page + 1);
      cargarNuevosPedidos(page + 1, listaPedidos);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Header></Header>
      </Box>

      {!nuevoPedido ? (
        <Box sx={{ flexGrow: 0, m: 2 }}>
          <Fab color="primary" aria-label="add" className="boton-nuevo">
            <BasicModal
              recharger={recharger}
              onClick={() => setNuevoPedido(true)}
            ></BasicModal>
          </Fab>
        </Box>
      ) : (
        <NuevoPedido></NuevoPedido>
      )}
      {/* opcion pantalla */}
      <Filtros
        cargarEstado={cargarEstado}
        setTipoPedido={setTipoPedido}
        checked={checked}
        setChecked={setChecked}
        fecha_fin={fecha_fin}
        set_fecha_fin={set_fecha_fin}
        set_fecha_inicio={set_fecha_inicio}
        fecha_inicio={fecha_inicio}
        edificio={edificio}
        set_edificio={set_edificio}
        tipo_pedido={tipo_pedido}
        open={Boolean(open)}
        setOpen={setOpen}
        handleClose={handleClose}
        scroll={scroll}
        alert={alert}
        setAlert={setAlert}
      />
      {listaPedidos.length < 1 && !nuevoPedido ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress /> {/* Establece el ancho automáticamente */}
        </div>
      ) : listaPedidos.length >= 1 && !nuevoPedido ? (
        <InfiniteScroll
          dataLength={totalLength}
          next={() => nextPage()}
          hasMore={pageLength > page}
          style={{ overflow: "hidden" }} // Evita el desplazamiento lateral
          loader={
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress /> {/* Establece el ancho automáticamente */}
            </div>
          }
        >
          <Box sx={{ flexGrow: 1, md: 2 }}>
            <Grid
              container
              direction="row"
              sx={{
                display: "flex",
                justifyContent: "center",
                px: 8,
                m: 4,
              }}
              alignItems="space-between"
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 3, sm: 6, md: 12 }}
            >
              {listaPedidos.map((pedido) => (
                <Grid item xs={3} sm={3} md={3} key={pedido._id}>
                  <PedidoV1 key={pedido._id} pedido={pedido} esAdmin={true} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </InfiniteScroll>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Pedidos;
