import React, { FormEvent, ReactElement, useState } from "react";
import handlePromise from "../../utils/promise";
import useAuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import './styles.scss';
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton'; 

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
    navigate("/home");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const logoUniStyle = {
    textAlign: 'center',
  };

  const imageStyle = {
    zIndex: 10,
    position: 'relative',
  };

  const formEndStyle = {
    backgroundColor: 'white',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 8,
    border: 'radius 20px', // revisar no me esta funcionando
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh'
  };

  const bannerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2b76ff',
    width: '100vw'
  };

  const textFieldStyle = {
    width : '90vw',
    marginTop: '40px', 
  }


  const buttonStyle = {
    borderRadius: '8px',
    textTransform: 'none',
    backgroundColor : '#2b76ff',
    padding: '12px',
    color: 'white',
    boxShadow: 'none', // revisar 
    width : '90vw',
    marginTop: '20px', 

  };

  return (
    <div className="container" style={containerStyle}>
      <div className="banner" style={bannerStyle}>
        <img src="/image/logo-universidad.png" alt="Login image" style={logoUniStyle} />
        <img src="/image/loginImage.png" alt="Login Image" style={imageStyle} />
      </div>
        <form onSubmit={onLogin} style={formEndStyle}>
          <TextField style={textFieldStyle} 
            variant='filled' 
            placeholder="Email" 
            type="text" 
            name="email" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField  style={textFieldStyle}
            variant="filled" 
            type={showPassword ? "text" : "password"} // Cambiar según el estado de showPassword
            placeholder="Contraseña" 
            name="password" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    onMouseDown={(e) => e.preventDefault()} // Prevenir el comportamiento predeterminado
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />} {/* Mostrar ícono según el estado */}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" style={buttonStyle}  >Iniciar Sesión</Button>
          {error && <small>{error}</small>}
        </form>
    </div>
  );
}
