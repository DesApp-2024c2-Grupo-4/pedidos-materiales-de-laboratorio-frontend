import * as React from 'react';
import Box from '@mui/material/Box';

import {ThemeProvider } from '@mui/material/styles';
import Theme1 from '../Theme/Theme1';

import {useNavigate} from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const LaboratorioNav = () => {
  const navigate=useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ml:4, flexGrow: 1, display: { md: 'flex' } }} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
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
  