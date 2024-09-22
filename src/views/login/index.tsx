import React, { FormEvent, ReactElement, useState } from "react";
import "./styles.scss";
import handlePromise from "../../utils/promise";
import useAuthService from "../../services/auth.service";
import { Button, TextField } from "@mui/material";
import { loginImage } from "../../../public/image/loginImage";
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

  return (
    <div className="container">
      <div className="banner">
        <div className="logo-uni"></div>
        <div className="image"></div>
      </div>
      <div className="form">
        <form onSubmit={onLogin}>
          <TextField variant="filled" type="text" label="Email" name="email" />
          <TextField variant="filled" type="password" label="Contraseña" name="password" />
          <Button type="submit">Submit</Button>
          {error && <small>{error}</small>}
        </form>
      </div>
    </div>
  );
}
