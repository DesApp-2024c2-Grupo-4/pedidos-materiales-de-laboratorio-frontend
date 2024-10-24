import React, { FormEvent, ReactElement, useState } from "react";
import handlePromise from "../../utils/promise";
import useAuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

export default function Login(): ReactElement {
  const { login } = useAuthService();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    const [, err] = await handlePromise<void, string>(login(email, password));
    if (err) return setError(err);
    navigate("/requests");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
 
  

  const emailInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <EmailIcon />
      </InputAdornment>
    ),
  };

  const passwordInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <LockIcon />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleTogglePasswordVisibility} onMouseDown={(e) => e.preventDefault()}>
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <div className="container containerStyle" >
      <div className="banner bannerStyle">
        <img src="/img/logo-universidad.png" alt="UNAHUR" className="logoUniStyle" />
        <img src="/img/scientist.png" alt="Cientifico de laboratorio" className="imageStyle" />
      </div>
      <form onSubmit={onLogin} className="formEndStyle">
        <TextField
          className="textFieldStyle"
          variant="standard"
          placeholder="Email"
          type="text"
          name="email"
          InputProps={emailInputProps}
          autoComplete="off"
        />
        <TextField
          className="textFieldStyle"
          variant="standard"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          name="password"
          InputProps={passwordInputProps}
        />
        <Button type="submit" className="buttonStyle">
          Iniciar Sesión
        </Button>
        {error && <small>{error}</small>}
      </form>
    </div>
  );
}
