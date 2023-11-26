import * as React from 'react';
import Box from '@mui/material/Box';

import {ThemeProvider } from '@mui/material/styles';
import Theme1 from '../Theme/Theme1';

import {useNavigate} from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { userContext } from '../../Context/LabProvider';
const LaboratorioNav = () => {
  const navigate=useNavigate();
  const {user, userAdmin} = React.useContext(userContext)
  const [value, setValue] = React.useState(0);
  const [admin, setAdmin] = React.useState(false)
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
    obtenerAdmin(user._id)
    setValue(locationToTabIndex[currentLocation] || 0);
  }, []);
;
const obtenerAdmin = async (id) =>{
  const data = await userAdmin(id)
  setAdmin(data)
}  
return (
    <Box sx={{ml:4, flexGrow: 1, display: { md: 'flex' } }} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pedidos" className='nav-button' onClick={() => navigate("/Laboratorio/Pedidos")} />
          <Tab label="Equipos" className='nav-button' onClick={() => navigate("/Laboratorio/Equipos")} />
          <Tab label="Materiales" className='nav-button' onClick={() => navigate("/Laboratorio/Materiales")}/>
          <Tab label="Reactivos" className='nav-button' onClick={() => navigate("/Laboratorio/Reactivos")}/>
          {admin && <Tab label="Usuarios" className='nav-button' onClick={() => navigate("/Laboratorio/Usuarios")}/>}
      </Tabs>
    </Box>
  )
}
export default LaboratorioNav;
  