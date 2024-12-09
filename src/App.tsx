import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

/* Components */
import Template from "./views/template";
import Login from "./views/login";

/* Styles */
import "./App.scss";
import PrivateRoute from "./components/private-route";
import { AuthProvider } from "./context/auth.context";
import NotFound from "./views/errors/404";
import Register from "./views/register";
import MaterialsView from "./views/Materials";
import RequestsView from "./views/requests";
import MaterialDetailsView from "./views/MaterialDetail";

import EquipmentDetailsView from "./views/EquipmentDetail";
import EquipmentsView from "./views/Equipments";
import UserProfile from "./views/userProfile/UserProfile";
import ReactivesView from "./views/Reactives";
import ReactivesDetailsView from "./views/ReactiveDetail";
import UserAdmin from "./views/userProfile/UsersTable";
import RequestView from "./views/RequestDetail";
import FUCK from "./views/test";

function App() {
  const [text, useText] = useState([]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route index path="/register/:token" element={<Register />} />
          {/**/}

          <Route element={<PrivateRoute />}>
            <Route element={<Template />}>
              <Route element={<Navigate replace to="/requests" />} index />
              <Route path="/requests" element={<RequestsView />} />
              <Route path="/requests/:id" element={<RequestView />} />
              <Route path="/materials" element={<MaterialsView />} />
              <Route path="/materials/:id" element={<MaterialDetailsView />} />
              <Route path="/equipments" element={<EquipmentsView />} />
              <Route path="/equipments/:id" element={<EquipmentDetailsView />} />
              <Route path="/Reactives/" element={<ReactivesView />} />
              <Route path="/Reactives/:id" element={<ReactivesDetailsView />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profile/users" element={<UserAdmin />} />
              <Route path="/test" element={<FUCK />} />

              
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
