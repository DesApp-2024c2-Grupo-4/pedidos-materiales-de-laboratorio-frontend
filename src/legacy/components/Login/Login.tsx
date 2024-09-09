import * as React from "react";
import { useForm } from "react-hook-form";
import { Grid, Box, Button, TextField } from "@mui/material";
import { formValidate } from "../../../../utils/formValidator";
import "./login.css";
import { useNavigate } from "react-router-dom";
import FormError from "../../../Mensajes/FormError";
import { useState } from "react";
import useAuthService from "../../../../services/auth.service";
import handlePromise from "../../../../utils/promise";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthService();
  const [error, setError] = useState({ error: false, message: "" });
  const { required, minLength, validateTrim } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: "",
      password: "",
    },
  });
  console.log("skkdkddk");

  const onSubmit = async ({ user, password }) => {
    const [, err] = await handlePromise(login(user, password));

    if (err) {
      console.error(err);
    }
  };

  return (
    <Box className="container">
      <Grid container>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <Box className="container-login">
            <img src="" alt="logo-universidad" />
          </Box>
          <Box className="containter-form-login">
            <Box>
              <p className="title-login">Ingreso</p>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className="container-input">
                <TextField
                  variant="filled"
                  error={errors.user ? true : false}
                  sx={{
                    borderBottom: !errors.user ? "solid" : "none",
                    input: { color: "white" },
                  }}
                  className="input-login"
                  type="text"
                  label="Usuario"
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  {...register("user", {
                    required,
                  })}
                />
                <FormError error={errors.user} />
              </Box>
              <Box>
                <TextField
                  variant="filled"
                  error={errors.password ? true : false}
                  sx={{
                    borderBottom: !errors.password ? "solid" : "none",
                    input: { color: "white" },
                  }}
                  className="input-login"
                  type="password"
                  label="Contraseña"
                  autoComplete="on"
                  InputLabelProps={{
                    style: {
                      // textOverflow: 'ellipsis',
                      // whiteSpace: 'nowrap',
                      // overflow: 'hidden',
                      // width: '100%',
                      color: "white",
                    },
                  }}
                  {...register("password", {
                    minLength,
                    validate: validateTrim,
                  })}
                />
                <FormError error={errors.password} />
              </Box>
              <Button className="button-login" type="submit">
                Login
              </Button>
              <FormError error={error} />
            </form>
          </Box>
        </Grid>
        <Grid item xs={0} md={4}></Grid>
      </Grid>
    </Box>
  );
}
