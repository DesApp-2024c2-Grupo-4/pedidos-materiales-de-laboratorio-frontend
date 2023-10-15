import React, { useEffect, useState } from "react";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";

import AccountCircle from "@mui/icons-material/AccountCircle";
import usuario from "../Image/laboratorio_personal.jpeg";
import Typography from "@mui/material/Typography";
// import Paper from '@mui/material/Paper';
// import moment from 'moment'
import Grid from "@mui/material/Grid";

import { Autocomplete, TextField, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import Theme1 from "../Theme/Theme1";

import postUsuario from "../../Services/postUsuario";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import PopUp from "./PopUp";

function AltaUsuario({
  open = { open },
  setOpen = { setOpen },
  scroll = { scroll },
  handleClose = { handleClose },
}) {
  const [openMensaje, setOpenMensaje] = useState(false);
  const [mensajeSalida, setMensajeSalida] = useState("");
  const [error2, setError2] = useState("none");
  const [perfil, setPerfil] = useState("");
  const [ver, setVer] = useState("none");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const guardarPerfil = (perfil) => {
    setPerfil(perfil);
    if (perfil === "lab") {
      setVer("block");
    } else {
      setVer("none");
    }
  };
  const emailValidation = (email) => {
    // expresion regular para validar email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const cargaUsuario = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("usuario"));
    console.log(data.get("contrasenia"));
    console.log(data.get("editor"));

    if (!emailValidation(email)) {
      setError({
        error: true,
        message: "El email no es valido",
      });
      return;
    }
    console.log(email);
    setError({
      error: false,
      message: "",
    });

    if (
      data.get("usuario") !== "" &&
      data.get("contrasenia") !== "" &&
      data.get("nombre") !== "" &&
      data.get("apellido") !== "" &&
      data.get("dni") !== "" &&
      data.get("matricula") !== "" &&
      perfil !== ""
    ) {
      setError("none");

      const dato = {
        usuario: data.get("usuario"),
        contrasenia: data.get("contrasenia"),
        nombre: data.get("nombre"), //.toUpperCase(),
        apellido: data.get("apellido"), //.toUpperCase(),
        dni: parseInt(data.get("dni")),
        matricula: parseInt(data.get("matricula")),
        rol: perfil,
        editor: false,
        email: email,
        // "dni":parseInt(data.get('dni'))
      };

      setVer("none");
      postUsuario(dato);
      setError("none");
      setOpen(false);
      setEmail("");
      setOpenMensaje(true);
      setMensajeSalida(dato);
      console.log(dato);
    } else {
      setError("block");
    }
  };
  useEffect(() => {
    return () => {};
  }, [perfil]);

  return (
    <>
      <Dialog
        open={Boolean(open)}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        sx={{ padding: 2 }}
      >
        <DialogContent
          dividers={scroll === "paper"}
          sx={{
            /*'--Grid-borderWidth': '1px', borderTop: 'var(--Grid-borderWidth) solid',
                        borderLeft: 'var(--Grid-borderWidth) solid',
                        borderRight: 'var(--Grid-borderWidth) solid',
                        borderBottom: 'var(--Grid-borderWidth) solid',
                        borderColor: 'divider',*/ padding: 2,
            borderRadius: 4,
            margin: 3,
          }}
        >
          <Grid
            container
            direction="row"
            component="form"
            onSubmit={cargaUsuario}
            sx={{ marginTop: 1 }}
            columns={{ xs: 12 }}
          >
            <Grid
              container
              noValidate
              direction="row"
              justifyContent="start"
              alignItems="start"
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12 }}
            >
              <Grid item xs={1} container justifyContent="center">
                <img width={30} alt="" heigth={30} src={usuario} />
              </Grid>
              <Grid item xs={4} container justifyContent="start">
                <Typography sx={{ fontSize: 30 }} color="text.secondary">
                  Usuario
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                display={error2}
                container
                justifyContent="start"
              >
                <Typography sx={{ fontSize: 20 }} color="error">
                  FALTAN CARGAR DATOS
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              noValidate
              direction="row"
              justifyContent="start"
              alignItems="start"
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12 }}
            >
              <Grid item xs={6} alignItems="center" justifyContent="start">
                <TextField
                  helperText={"debe contener 6 caracteres"}
                  sx={{ marginTop: 1, marginBottom: 1, marginLeft: 0 }}
                  fullWidth
                  required
                  id="usuario"
                  label="Usuario"
                  name="usuario"
                  inputProps={{ minLength: 6, maxLength: 15 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // autoComplete="descripcion"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} alignItems="center" justifyContent="start">
                <TextField
                  helperText={"debe contener 6 caracteres"}
                  sx={{ marginTop: 1, marginBottom: 1, marginLeft: 0 }}
                  fullWidth
                  required
                  id="contrasenia"
                  label="Contraseña"
                  name="contrasenia"
                  type="password"
                  inputProps={{ minLength: 6, maxLength: 50 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // autoComplete="descripcion"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Grid
              container
              noValidate
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12 }}
            >
              <Grid item xs={6} alignItems="center" justifyContent="start">
                <TextField
                  sx={{ marginTop: 1, marginBottom: 1, marginLeft: 0 }}
                  fullWidth
                  required
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  inputProps={{ minLength: 2, maxLength: 30 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // autoComplete="descripcion"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} alignItems="center" justifyContent="start">
                <TextField
                  required
                  sx={{ marginTop: 1, marginBottom: 1, marginLeft: 0 }}
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  inputProps={{ minLength: 2, maxLength: 30 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoFocus
                />
              </Grid>
            </Grid>

            <Grid
              container
              noValidate
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12 }}
            >
              <Grid item xs={4} container justifyContent="center">
                <TextField
                  sx={{ marginTop: 1 }}
                  fullWidth
                  id="matricula"
                  variant="outlined"
                  name="matricula"
                  label="Matrícula"
                  type="number"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      max: 99999999,
                      min: 1000000,
                    },
                  }}
                />
              </Grid>

              <Grid
                item
                xs={4}
                container
                justifyContent="center"
                sx={{ marginLeft: 4 }}
              >
                <TextField
                  sx={{ marginTop: 1 }}
                  fullWidth
                  id="dni"
                  variant="outlined"
                  name="dni"
                  label="DNI"
                  type="number"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      max: 99999999,
                      min: 1000000,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              noValidate
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12 }}
            >
              <Grid item xs={6} container justifyContent="center">
                <TextField
                  sx={{ marginTop: 1 }}
                  label="Email"
                  variant="outlined"
                  id="email"
                  type="email"
                  fullWidth
                  required
                  error={error.error}
                  helperText={error.message}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  inputProps={{ minLength: 5, maxLength: 30 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              noValidate
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 12 }}
            >
              <Grid
                item
                xs={6}
                container
                justifyContent="center"
                marginTop={1}
                // marginLeft={1}
              >
                <FormControl fullWidth>
                  <InputLabel id="perfil"> Perfil </InputLabel>
                  <Select
                    InputLabelProps={{
                      shrink: true,
                    }}
                    labelId="perfil"
                    id="perfil"
                    label="perfil"
                    name="perfil"
                    defaultValue={perfil || ""}
                    onChange={(e) => guardarPerfil(e.target.value)}
                    required
                  >
                    <MenuItem sx={{ fontSize: 12 }} value={"docente"}>
                      DOCENTE
                    </MenuItem>
                    <MenuItem sx={{ fontSize: 12 }} value={"lab"}>
                      LABORATORIO
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/*<Grid item xs={6}  display={ver} container justifyContent="center" marginTop={1} 
                            // marginLeft={1}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="editor"> Editor </InputLabel>
                                    <Select
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        labelId="editor"
                                        id="editor"
                                        label="editor"
                                        name="editor"
                                        defaultValue={false}
                                        // onChange={(e) => guardarPerfil(e.target.value)}

                                    >

                                        <MenuItem sx={{ fontSize: 12 }} value={false}>NO </MenuItem>
                                        <MenuItem sx={{ fontSize: 12 }} value={true}>SI</MenuItem>
                                        

                                    </Select>
                                </FormControl>
                                    
                            </Grid>
                            */}
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="space-around"
              columns={{ xs: 12 }}
            >
              <Grid
                item
                xs={4}
                height={50}
                bgcolor={"error"}
                borderRadius={2}
                sx={{ mt: 3, mb: 2 }}
              >
                <Button
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  color="error"
                  startIcon={<ReplyAllIcon />}
                  onClick={() => {
                    setOpen(false);
                  }}
                  style={{ borderRadius: 8 }}
                  styled={{ textTransform: "none" }}
                  sx={{ height: 50 }}
                >
                  {" "}
                  CANCELAR
                </Button>
              </Grid>

              <Grid
                item
                xs={4}
                height={50}
                bgcolor={"primary.main"}
                borderRadius={2}
                sx={{ mt: 3, mb: 2 }}
              >
                <Button
                  fullWidth
                  style={{ height: 50, borderRadius: 8 }}
                  margin="normal"
                  variant="contained"
                  endIcon={<SendIcon />}
                  color="primary"
                  borderRadius={4}
                  type="submit"
                >
                  ALTA
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <PopUp
        open={openMensaje}
        setOpen={setOpenMensaje}
        handleClose={() => setOpenMensaje(false)}
        scroll={scroll}
        titulo={"Nuevo usuario agregado"}
        children={<UsuarioDadoAlta usuario={mensajeSalida} />}
      ></PopUp>
    </>
  );
}

export default AltaUsuario;

const UsuarioDadoAlta = ({ usuario }) => {
  return (
    <div>
      <p>
        <strong> Usuario: </strong> {usuario.usuario}
      </p>
      <p>
        <strong> Nombre: </strong> {usuario.nombre}
      </p>
      <p>
        <strong> Apellido: </strong> {usuario.apellido}
      </p>
      <p>
        <strong> DNI: </strong> {usuario.dni}
      </p>
      <p>
        <strong> Matrícula: </strong> {usuario.matricula}
      </p>
      <p>
        <strong> Email: </strong> {usuario.email}
      </p>
      <p>
        <strong> Perfil: </strong>{" "}
        {(usuario.rol = "lab" ? "LABORATORIO" : "DOCENTE")}
      </p>
      {/*<p>
            <strong> Editor: </strong> {usuario.editor ? "SI" : "NO"}
            </p>*/}
    </div>
  );
};
