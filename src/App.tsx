import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

/* Components */
import Template from "./views/template";
import Login from "./views/login";

/* Styles */
import "./App.scss";
import PrivateRoute from "./components/private-route";
import RequestsView from "./views/requests";
import { AuthProvider } from "./context/auth.context";
import NotFound from "./views/errors/404";
import CardRequest from "./Components/card";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route
            index
            path="/test"
            element={
              <CardRequest
                title="Pedido #1"
                banner="Pendiente"
                date="26/04/06"
                laboratory="65"
                building="Malvinas"
                proffesor="Cin"
                students="kamakdn"
              />
            }
          />

          {/* Component PrivateRoute will check for a valid JWT
           * and redirect to '/login' if there isn't one
           * so every route that requires an auth user should be
           * defined inside this route*/}
          <Route element={<PrivateRoute />}>
            <Route element={<Template />}>
              <Route element={<Navigate replace to="/requests" />} index />
              <Route path="/requests" element={<RequestsView />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
