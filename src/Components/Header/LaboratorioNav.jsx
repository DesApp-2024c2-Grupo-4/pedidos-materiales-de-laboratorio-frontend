import * as React from 'react';
import Box from '@mui/material/Box';

import {ThemeProvider } from '@mui/material/styles';
import Theme1 from '../Theme/Theme1';

import {useNavigate} from 'react-router-dom';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
const LaboratorioNav = () => {
  const navigate=useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    const currentLocation = window.location.pathname;
    const locationToTabIndex = {
      '/Laboratorio/Pedidos': 0,
      '/Laboratorio/Equipos': 1, 
      '/Laboratorio/Materiales': 2,
      '/Laboratorio/Reactivos': 3,
      '/Laboratorio/Usuarios': 4,
    };

    setValue(locationToTabIndex[currentLocation] || 0);
  }, []);
  return (
    <Box sx={{ml:4, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="Pedidos" className='nav-button' onClick={() => navigate("/Laboratorio/Pedidos")} />
          <Tab label="Equipos" className='nav-button' onClick={() => navigate("/Laboratorio/Equipos")} />
          <Tab label="Materiales" className='nav-button' onClick={() => navigate("/Laboratorio/Materiales")}/>
          <Tab label="Reactivos" className='nav-button' onClick={() => navigate("/Laboratorio/Reactivos")}/>
          <Tab label="Usuarios" className='nav-button' onClick={() => navigate("/Laboratorio/Usuarios")}/>
      </Tabs>
    </Box>
  )
}
export default LaboratorioNav;
  