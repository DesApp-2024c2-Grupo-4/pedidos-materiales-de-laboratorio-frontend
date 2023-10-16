import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Theme1 from '../Theme/Theme1';
import { getListaReactivosFiltrada } from "../../Services/getService";
import quimica from '../Image/quimica.png'
import Buscador from './Buscador';

import Button from '@mui/material/Button';
import AltaReactivo from '../ABM/AltaReactivo';
import ModReactivo from '../ABM/ModReactivo';
import Listar from './utils/Listar';


export default function Reactivos() {

  const [listaReactivos, setListaReactivos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resetPage, setResetPage] = useState(false);

  const [verEdicion, setVerEdicion] = useState("none")
  const [open, setOpen] = React.useState("");

  const [scroll, setScroll] = React.useState('paper');
  const [elegido, setElegido] = useState({});

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);

  };

  const handleClose = () => {
    setOpen(false);

  };



  useEffect(() => {
    getListaReactivosFiltrada(busqueda)
      .then((reactivos) => setListaReactivos(reactivos))
      .catch((error) => console.error(error));
  }, [busqueda, open, verEdicion]);

  const handleBuscar = (term) => {
    setBusqueda(term);
    setResetPage(true);
  };

  return (
    <>

      <Box sx={{ flexGrow: 1, m: 2 }}>

        <Header texto={'Laboratorio'} isUserAdmin={'lab'}>
        </Header>

      </Box>
      <Container component="main" color="primary" sx={{ marginTop: 5 }}>
        <Grid container
          sx={{
            '--Grid-borderWidth': '1px', borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider', paddingX: 2, borderRadius: 4, paddingY: 1, marginBottom: 4, marginX: 10,
          }}
          spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }}>
          <Grid container direction="row"
            justifyContent="start"
            alignItems="center">
            <Grid item xs={1} container justifyContent="center"  >
              <img width={30} alt="" heigth={30} src={quimica} />
            </Grid>
            <Grid item xs={3} container justifyContent="start">
              <Typography sx={{ fontSize: 30 }} color="text.secondary">
                Reactivos
              </Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="center">
              <Buscador onBuscar={handleBuscar} placeholder={"Por descripción o CAS"}></Buscador>
            </Grid>
            <Grid item xs={4} container justifyContent="flex-end">
              <Nuevo
                open={Boolean(open)}
                setOpen={setOpen}
                handleClose={handleClose}
                scroll={scroll}
                handleClickOpen={handleClickOpen}

              />
            </Grid>
          </Grid>
          <Grid container direction="row"
            justifyContent="start"
            alignItems="center"
            display={verEdicion}>
            <ModReactivo
              setVerEdicion={setVerEdicion}
              elegido={elegido}
              setElegido={setElegido}

            />
          </Grid>
          <Listar 
            lista={listaReactivos}
            type="CAS"
            setElegido={setElegido}
            setVerEdicion={setVerEdicion}
            setResetPage={setResetPage} resetPage={resetPage}

          ></Listar>
        </Grid>
      </Container>
    </>
  )
}

const Nuevo = (
  { open = { open },
    setOpen = { setOpen },
    scroll = { scroll },
    handleClose = { handleClose },
    handleClickOpen = { handleClickOpen }
  }


) => {
  // const handleNuevo = (event) => {
  //   console.log("Nuevo Reactivo"); // quitar
  // };
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        fullWidth
        style={{ borderRadius: 8 }}
        margin="normal"
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickOpen('body')}
      >
        NUEVO REACTIVO
      </Button>
      <AltaReactivo

        open={Boolean(open)}
        setOpen={setOpen}
        handleClose={handleClose}
        scroll={scroll}
        handleClickOpen={handleClickOpen}

      />
    </div>
  )
}