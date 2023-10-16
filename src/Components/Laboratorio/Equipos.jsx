import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Theme1 from "../Theme/Theme1";
import { getListaEquiposFiltrada } from "../../Services/getService";
import laboratorio from "../Image/biologia.png";
import Buscador from "./Buscador";
import AltaEquipo from "../ABM/AltaEquipo";
import Button from "@mui/material/Button";
import ModEquipo from "../ABM/ModEquipo";
import Listar from "./utils/Listar";

export default function Equipos() {
  //const [texto, setEncabezado] = useState("Laboratorio");
  const [listaEquipos, setListaEquipos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resetPage, setResetPage] = useState(false);

  const [verEdicion, setVerEdicion] = useState("none");
  const [open, setOpen] = React.useState("");

  const [scroll, setScroll] = React.useState("paper");
  const [elegido, setElegido] = useState({});

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getListaEquiposFiltrada(busqueda)
      .then((equipos) => setListaEquipos(equipos))
      .catch((error) => console.error(error));
  }, [busqueda, open, verEdicion]);

  const handleBuscar = (term) => {
    setBusqueda(term);
    setResetPage(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Header texto={"Laboratorio"} isUserAdmin={'lab'}></Header>
      </Box>
      <Container component="main" color="primary" sx={{ marginTop: 5 }}>
        <Grid
          container
          sx={{
            "--Grid-borderWidth": "1px",
            borderTop: "var(--Grid-borderWidth) solid",
            borderLeft: "var(--Grid-borderWidth) solid",
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
            paddingX: 2,
            borderRadius: 4,
            paddingY: 1,
            marginBottom: 4,
            marginX: 10,
          }}
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 12 }}
        >
          <Grid
            container
            direction="row"
            justifyContent="start"
            alignItems="center"
          >
            <Grid item xs={1} container justifyContent="center">
              <img width={30} alt="" heigth={30} src={laboratorio} />
            </Grid>
            <Grid item xs={3} container justifyContent="start">
              <Typography sx={{ fontSize: 30 }} color="text.secondary">
                Equipos
              </Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="center">
              <Buscador
                onBuscar={handleBuscar}
                placeholder={"Buscar por descripción"}
              ></Buscador>
            </Grid>
            <Grid item xs={4} container justifyContent="flex-end">
              <NuevoEquipo
                open={Boolean(open)}
                setOpen={setOpen}
                handleClose={handleClose}
                scroll={scroll}
                handleClickOpen={handleClickOpen}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="start"
            alignItems="center"
            display={verEdicion}
          >
            <ModEquipo
              setVerEdicion={setVerEdicion}
              elegido={elegido}
              setElegido={setElegido}
            />
          </Grid>
          <Listar
            lista={listaEquipos}
            type="Clase"
            setElegido={setElegido}
            setVerEdicion={setVerEdicion}
            setResetPage={setResetPage}
            resetPage={resetPage}
          ></Listar>
        </Grid>
      </Container>
    </>
  );
}

const NuevoEquipo = ({
  open = { open },
  setOpen = { setOpen },
  scroll = { scroll },
  handleClose = { handleClose },
  handleClickOpen = { handleClickOpen },
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        fullWidth
        style={{ borderRadius: 8 }}
        margin="normal"
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickOpen("body")}
      >
        NUEVO EQUIPO
      </Button>

      <AltaEquipo
        open={Boolean(open)}
        setOpen={setOpen}
        handleClose={handleClose}
        scroll={scroll}
        handleClickOpen={handleClickOpen}
      />
    </div>
  );
};
