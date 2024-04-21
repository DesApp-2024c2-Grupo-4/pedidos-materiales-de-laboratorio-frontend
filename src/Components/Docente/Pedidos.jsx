import PedidoV1 from "./PedidoV1";
import { getPedidosPorDni } from "../../Services/getPedidosPorDNIService";
import Header from '../Header/Header'
import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NoEncontrados from "../Mensajes/NoEncontrados" 
import NuevoPedido from "./NuevoPedido";
import { userContext } from "../../Context/LabProvider";
import BasicModal from "../Laboratorio/utils/BasicModal";
import { Fab } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Pedidos() {


  // controlar si es adminitrador
  const [esAdmin, setEsAdmin] = useState(true)
  const {user, userInfo, update} = React.useContext(userContext)
  

  const [nuevoPedido, setNuevoPedido] = useState(false);
  const [texto, setEncabezado] = useState("DOCENTE");

  const [listaPedidos, setListaPedidos] = useState([]);

  useEffect(() => {
    let mounted = true;
    setEsAdmin(user.rol === 'lab')
    userInfo(user._id).then((res) => {
      getPedidosPorDni(res.dni)
        .then(items => {
          if (mounted) {
            setListaPedidos(items.reverse())
          }
        })
    })
    return () => mounted = false;
  }, [update])
  

  return (
    <>

      <Box sx={{ flexGrow: 1, m: 2 }}>

        <Header texto={texto} ></Header>

      </Box>

      {!(nuevoPedido) ? (

        <Box sx={{ flexGrow: 0, m: 2 }}>
          <Fab color="primary" aria-label="add" className='boton-nuevo' >
            <BasicModal onClick={() => setNuevoPedido(true)} ></BasicModal>     
          </Fab>
        </Box>
      ) : (<NuevoPedido></NuevoPedido>)}
      {/* opcion pantalla */}
        

      {(listaPedidos.length < 1 && !(nuevoPedido)) ?
        (<Box sx={{ flexGrow: 1, md: 2 }}><NoEncontrados /></Box>)
        : ((listaPedidos.length >= 1) && !(nuevoPedido)) ? (
          <Box sx={{ flexGrow: 1, md: 2 }}>
            <Grid container direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                px: 8,
                m: 4,
              }}
              alignItems="space-between"
              spacing={{ xs: 2, md: 2 }} columns={{ xs: 3, sm: 6, md: 12 }} >
              {listaPedidos.map((pedido) => (
                <Grid item xs={3} sm={3} md={3}  key={pedido._id}>
                  <PedidoV1 key={pedido._id} pedido={pedido} esAdmin={esAdmin} />
                </Grid>
              ))}
            </Grid>
          </Box>) : (<div></div>)}





    </>
   
  );
}

export default Pedidos;