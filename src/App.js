import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";

import RedirectDocente from "./Components/Login/RedirectDocente";
import RedirectLaboratorio from "./Components/Login/RedirectLaboratorio";
import RedirectLog from "./Components/Login/RedirectLog";

import PedidoV1 from "./Components/Docente/PedidoV1";
import NuevoPedido from "./Components/Docente/NuevoPedido";
import Docente from "./Components/Docente/Pedidos";

import Pedidos from "./Components/Laboratorio/Pedidos";
import Alta_Equipo from './Components/ABM/AltaEquipo';
import Equipos from './Components/Laboratorio/Equipos';
import Usuarios from './Components/Laboratorio/Usuarios';
import Materiales from './Components/Laboratorio/Materiales'
import Reactivos from './Components/Laboratorio/Reactivos'
import LabProvider from './Context/LabProvider';
import './navbar.css';
import './pedidos.css';

function App() {
  return (
    <BrowserRouter>
      <LabProvider>
        <Routes>
          <Route path="/login" element={<RedirectLog />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/" element={<RedirectDocente />}>
            <Route path="/Docente/Pedidos" element={<Docente />} />{" "}
            {/*home docentes*/}
            <Route path="/Docente/Pedidos/PedidoV1" element={<PedidoV1 />} />
            <Route path="/Docente/NuevoPedido" element={<NuevoPedido />} />
          </Route>

          <Route path="/" element={<RedirectLaboratorio />}>
            <Route path="/Laboratorio/Pedidos" element={<Pedidos />} />
            <Route path="/Laboratorio/Equipos" element={<Equipos />} />
            <Route path="/Laboratorio/Usuarios" element={<Usuarios />} />
            <Route path="/Laboratorio/Materiales" element={<Materiales />} />
            <Route path="/Laboratorio/Reactivos" element={<Reactivos />} />
            <Route path="/ABM/AltaEquipo" element={<Alta_Equipo />} />
          </Route>
        </Routes>
      </LabProvider>
    </BrowserRouter>
  );
}

export default App;
