import * as React from "react";
import { useForm } from "react-hook-form";
import { Grid, Box, Button, TextField } from "@mui/material";
import { getUsuario } from "../../Services/getUsuarioService";
import { formValidate } from "../../utils/formValidator";
import logo_universidad from "../Image/logo-universidad.png";
import "./login.css";
import { useNavigate } from 'react-router-dom'; 
import { userContext } from "../../Context/LabProvider";
import FormError from "../Mensajes/FormError";

export default function LoginOp() {
  const {user, setUser} = React.useContext(userContext)
  const navigate = useNavigate()
  const { required, minLength, validateTrim } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //BORRAR
    defaultValues: {
      user: "Admin01",
      password: "123123",
    //   user: "",
    //   password: "",
    },
  });

  const onSubmit = async ({ user, password }) => {
    try {
        const value = await getUsuario(user, password);
        if(value[0]) {
            localStorage.setItem('usuario', JSON.stringify(value[0]))
            setUser(value[0] || JSON.parse(localStorage.getItem('usuario')))
            const rol = value[0].rol
            if(rol == "docente") navigate("/Docente/Pedidos");
            else if (rol == "admin") navigate("/Laboratorio/Pedidos")
            else navigate("/login")
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    /* <ThemeProvider theme={Theme1}>
    <form onSubmit={handleSubmit(onSubmit)}>
        <input
        type="text"
        placeholder='Usuario'
        label='Usuario'
        {...register("user", { 
            required
        })}
        />
        { errors && errors.user}
        <input
        type="password"
        placeholder='Contraseña'
        label='Contraseña'
        {...register("email", { 
            minLength,
            pattern: validateTrim
        })}
        />
        { errors && errors.password}
        <button type="submit" >Logearse</button>
    </form>
    </ThemeProvider>*/
    <Box className="container">
      <Grid container>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <Box className="container-login">
            <img src={logo_universidad} alt="logo-universidad" />
          </Box>
          <Box className="containter-form-login">
            <Box>
              <p className="title-login">Ingreso</p>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className="container-input">
                <input
                  className="input-login"
                  type="text"
                  placeholder="Usuario"
                  label="Usuario"
                  {...register("user", {
                    required,
                  })}
                />
                <FormError error={errors.user}/>
              </Box>
              <Box>
                <input
                  className="input-login"
                  type="password"
                  placeholder="Contraseña"
                  label="Contraseña"
                  {...register("password", {
                    //minLength,
                    //pattern: validateTrim,
                  })}
                />
                <FormError error={errors.password}/>
              </Box>
              <Button className="button-login" type="submit">
                Login
              </Button>
            </form>
          </Box>
        </Grid>
        <Grid item xs={0} md={4}></Grid>
      </Grid>
    </Box>
  );
}
