import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {ThemeProvider, createTheme } from '@mui/material/styles';
import Theme1 from '../Theme/Theme1';
import logo from '../Image/logo uni-01.png';
import {useNavigate} from 'react-router-dom';
import LaboratorioNav from "./LaboratorioNav";
const themeHeader=createTheme({
  palette:{
      primary:{
          main:"#685E5E"
      }
  },
})
Header.defaultProps={
  isNotLogin: true,
  isUserAdmin: false
}
export default function Header(props) {
  const userActual = JSON.parse(localStorage.getItem('usuario'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate=useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
    <Box sx={{ flexGrow: 1}}>
      <AppBar style={{ backgroundColor: "#1D2F58" }} position="static" 
      maxwidth="lg"
      >
        
        <Toolbar>
        <img className='logo' width={450} heigth={90} src={logo} alt="logo" />
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
              
              <Typography  color={"primary.main"} className='user_name'> {(userActual.nombre)} {(userActual.apellido) } </Typography>
              
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
