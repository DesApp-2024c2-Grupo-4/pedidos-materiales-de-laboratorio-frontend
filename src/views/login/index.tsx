import React, { FormEvent, ReactElement } from "react";
import "./styles.scss";
import handlePromise from "../../utils/promise";
import useAuthService from "../../services/auth.service";
import { Button, TextField } from "@mui/material";

export default function Login(): ReactElement {
  const { login } = useAuthService();

  const onLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    console.log({ email, password });
    const [, err] = await handlePromise(login(email, password));
  };

  return (
    <>
      <form action="" onSubmit={onLogin}>
        <TextField variant="filled" type="text" label="Email" name="email" />
        <TextField variant="filled" type="password" label="Contraseña" name="password" />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
