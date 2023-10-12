import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Theme1 from '../Theme/Theme1';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header'
import { getUsuario } from '../../Services/getUsuarioService';
import CartelAlerta from '../Mensajes/CartelAlerta';
import { userContext } from '../../Context/LabProvider';
import { useContext } from 'react';
import { useEffect } from 'react';
function Copyright(props) {
  return (
    <Typography variant="body2" color="secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        App.Laboratorio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//const theme = createTheme();

export default function Login() {

  const texto = "UNAHUR-DESARROLLO DE APLICACIONES-CARGA DE PEDIDOS DE LABORATORIO"
  const mensajeAlerta = "Datos incorrectos, verifique usuario y password"

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState("")

  const {user, setUser} = useContext(userContext)

  // ************************************
  const handleClose = () => {
    setAnchorEl(null);

    // setMensajeAlerta("Faltan Cargar Datos")
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const re_direccion = (usuario, editor) => {

    if (usuario.rol === 'docente') {
      navigate("/Docente/Pedidos");
    }
    else if (usuario.rol === 'admin') {
      navigate("/Laboratorio/Pedidos");
    } else {
      navigate("/login");
    }

  }

  const handleSubmit = async(event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const datos = await getUsuario(data.get('user'), data.get('password'));
      const info = event.currentTarget;
      Promise.resolve(datos).then(value => {
        if ((value).length === 0) {

          setAnchorEl(info)
        }
        else {
          localStorage.setItem('usuario', JSON.stringify(value[0]))
          setUser(value[0] || JSON.parse(localStorage.getItem('usuario')))
          console.log(user.rol)
          re_direccion(value[0], value[0].editor);
        }
  
      })
    } catch (error) {
        console.log(error)
    }

  };

  return (
    <ThemeProvider theme={Theme1}>
      <Box sx={{ flexGrow: 1}}>
        <Typography variant="body1" align='center' color='primary.main' />
          <Header texto={"UNAHUR-DESARROLLO DE APLICACIONES-CARGA DE PEDIDOS DE LABORATORIO"} isNotLogin={false} ></Header>
        {/* </Typography> */}
      </Box>

      <Container component="main" maxWidth="xs" backgroundcolor="verdeC" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            INGRESO
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField

              style={{
                // width: "80%",
                fontSize: '3.0rem', fontFamily: "cursive", color: "red",
              }}


              margin="normal"
              color='primary'
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoComplete="user"
              autoFocus
            />


            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent={"center"}>
              <CartelAlerta

                mensajeAlerta={mensajeAlerta}
                handleClose={handleClose}
                id={id}
                open={open}
                anchorEl={anchorEl}

              />

              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="secondary"
                  styled={{ textTransform: 'none' }}


                >
                  Ingresar
                </Button>
              </Grid></Grid>

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>

  );
}