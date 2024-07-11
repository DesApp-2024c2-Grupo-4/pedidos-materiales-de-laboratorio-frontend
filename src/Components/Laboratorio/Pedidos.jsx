import {
  Card,
  CardActionArea,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import PedidoV1 from "../Docente/PedidoV1";
import { getListaPedidos } from "../../Services/getPedidosService";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Header from "../Header/Header";
import Grid from "@mui/material/Grid";
import NoEncontrados from "../Mensajes/NoEncontrados";
import Filtros from "./Filtros";
import { axiosGetPedido } from "../../Services/getPedidosService";
import FilterListIcon from "@mui/icons-material/FilterList";
import { userContext } from "../../Context/LabProvider";
import { correctionDate, dateFormat } from "./utils/formatDate";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(() => ({
  marginTop: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
}));

function Pedidos() {
  // const { marginTop } = useStyles();
  const [listaPedidos, setListaPedidos] = useState([]);
  const [texto, setEncabezado] = useState("Laboratorio");
  const [esAdmin, setEsAdmin] = useState("");
  const { update, user } = useContext(userContext);
  const [edicionActiva, setEdicionActiva] = useState(false);
  const [page, setPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);
  const [pageLength, setPageLength] = useState(0);
  const [reset, setReset] = useState(false);

  /********************************************** */
  const now = correctionDate(new Date());
  const [tipo_pedido, setTipoPedido] = React.useState("TODOS");
  const [fecha_utilizacion, set_fecha_utilizacion] = React.useState("");
  const [fecha_inicio, set_fecha_inicio] = React.useState("");
  const [fecha_fin, set_fecha_fin] = React.useState(now);
  const [edificio, set_edificio] = React.useState("TODOS");
  const [checked, setChecked] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  // *******************************
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
    try {
      setLoading(true);
      await axiosGetPedido(
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
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setPage(1);
    setListaPedidos([]);
    cargarNuevosPedidos(1, []);
  }, [tipo_pedido, fecha_fin, fecha_inicio, edificio, checked, update]);

  const nextPage = () => {
    if (page < pageLength) {
      setPage(page + 1);
      cargarNuevosPedidos(page + 1, listaPedidos);
    }
  };

  useEffect(() => {
    setEsAdmin(user.rol);
  }, [open, update]);

  return (
    <Box>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Header texto={texto} isUserAdmin={esAdmin}></Header>
      </Box>

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

      {listaPedidos && listaPedidos.length < 1 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress /> 
        </div>
      ) : (
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
          <Box className="main-wrap" sx={{ flexGrow: 1, md: 2 }}>
            <Grid
              container
              direction="row"
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 0,
                m: 0,
              }}
              alignItems="space-between"
              spacing={{ xs: 2, md: 3 }}
              columns={{ sm: 6, lg: 12 }}
            >
              {listaPedidos?.map((pedido) => (
                <Grid item xs={3} key={pedido._id}>
                  <PedidoV1
                    key={pedido._id}
                    pedido={pedido}
                    esAdmin={"lab"}
                    edicionActiva={edicionActiva}
                    setEdicionActiva={setEdicionActiva}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </InfiniteScroll>
      )}
    </Box>
  );
}

export default Pedidos;
