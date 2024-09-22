import React, { FormEvent, ReactElement, useState } from "react";
import "./styles.scss";
import handlePromise from "../../utils/promise";
import useAuthService from "../../services/auth.service";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login(): ReactElement {
  const { login } = useAuthService();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    const [, err] = await handlePromise<void, string>(login(email, password));
    if (err) return setError(err);
    navigate("/home");
  };


const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
};

const bannerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#2b76ff',
};

const logoUniStyle = {
  textAlign: 'center',
};

const buttonStyle = {
  textTransform: 'none',
};


  return (
    <div className="container" style={containerStyle}>
      <div className="banner" style={bannerStyle}>
        <div className="logo-uni" style={logoUniStyle}>
          <img src="/image/logo-universidad.png" alt="Login image"/>
        </div>
        <div className="image">
          <img src="/image/loginImage.png" alt="Login Image" />
        </div>
      </div>
      <div className="form">
        <form onSubmit={onLogin}>
          <TextField variant="filled" type="text" label="Email" name="email" />
          <TextField variant="filled" type="password" label="Contraseña" name="password" />
          <Button type="submit" style={buttonStyle}>Iniciar Sesión </Button>
          {error && <small>{error}</small>}
        </form>
      </div>
    </div>
  );
}
