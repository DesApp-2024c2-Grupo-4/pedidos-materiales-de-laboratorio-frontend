import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Theme1 from '../Theme/Theme1';
import { getListaMaterialesFiltrada } from "../../Services/getService";
import pipeta from '../Image/pipeta.png';
import Buscador from './Buscador';
import AltaMaterial from '../ABM/AltaMaterial';
import Button from '@mui/material/Button';
import ModMaterial from '../ABM/ModMaterial';
import Listar from './utils/Listar';

export default function Materiales() {
  //const [texto, setEncabezado] = useState("Laboratorio");
  const [listaMateriales, setListaMateriales] = useState([]);
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
    getListaMaterialesFiltrada(busqueda)
      .then((materiales) => setListaMateriales(materiales))
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
              <img width={30} alt="" heigth={30} src={pipeta} />
            </Grid>
            <Grid item xs={3} container justifyContent="start">
              <Typography sx={{ fontSize: 30 }} color="text.secondary">
                Materiales
              </Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="center">
              <Buscador onBuscar={handleBuscar} placeholder={"Buscar por descripción"}></Buscador>
            </Grid>
            <Grid item xs={4} container justifyContent="flex-end">
              <NuevoMaterial
                open={Boolean(open)}
                setOpen={setOpen}
                handleClose={handleClose}
                scroll={scroll}
                handleClickOpen={handleClickOpen}

              ></NuevoMaterial>
            </Grid>
          </Grid>
          <Grid container direction="row"
            justifyContent="start"
            alignItems="center"
            display={verEdicion}>
            <ModMaterial
              setVerEdicion={setVerEdicion}
              elegido={elegido}
              setElegido={setElegido}

            />
          </Grid>






          <Listar lista={listaMateriales}
            elegido={elegido}
            type='Clase'
            setElegido={setElegido}
            setVerEdicion={setVerEdicion}   
            setResetPage={setResetPage} resetPage={resetPage}>
          </Listar>
        </Grid>
      </Container>
    </>
  )
}

const NuevoMaterial = (
  { open = { open },
    setOpen = { setOpen },
    scroll = { scroll },
    handleClose = { handleClose },
    handleClickOpen = { handleClickOpen }
  }
) => {
  // const handleNuevoMaterial = (event) => {
  //   console.log("Nuevo Material"); // quitar
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
        NUEVO MATERIAL
      </Button>
      <AltaMaterial

        open={Boolean(open)}
        setOpen={setOpen}
        handleClose={handleClose}
        scroll={scroll}
        handleClickOpen={handleClickOpen}

      />

    </div>
  )
}

