import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {ThemeProvider, createTheme } from '@mui/material/styles';
import Theme1 from '../Theme/Theme1';
import logo from '../Image/logo_unahur.png';
import {useNavigate} from 'react-router-dom';
import LaboratorioNav from "./LaboratorioNav";
import { Button } from "@mui/material";
import { useState } from "react";
import Fade from "@mui/material/Fade";
import { useEffect } from "react";

Header.defaultProps = {
  isNotLogin: true,
  isUserAdmin: false,
};
export default function Header(props) {
  const userActual = JSON.parse(localStorage.getItem("usuario"));
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "#b4e0bc" }} position="static" 
      maxwidth="lg"
      >
        
        <Toolbar>
        <img width={150} heigth={60} src={logo} alt="logo" />
          <Typography variant="h6" align='center'color={"primary.main"} component="div" sx={{ flexGrow: 1 }}>
            {props.texto}
          </Typography>
          {(props.isNotLogin && userActual ) && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              > 
              <Typography  color={"primary.main"}> {(userActual.nombre)} {(userActual.apellido) } </Typography>
                <Avatar alt="usuario">{(userActual.nombre).charAt(0).concat((userActual.apellido).charAt(0))}</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              > 
                <MenuItem onClick={handleLogout}> Cerrar sesión </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        {
          props.isUserAdmin && (
            <LaboratorioNav></LaboratorioNav>
          )
        }
      </AppBar>
      </Box>
    </>
  );
}
