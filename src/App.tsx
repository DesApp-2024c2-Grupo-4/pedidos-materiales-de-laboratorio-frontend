import React, { useState } from "react";
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
import CardRequest from "./components/card";
import Header from "./components/header";
import MobileNav from "./components/mobile-nav";

function App() {
  
  const [text,useText] = useState([])
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          
          <Route index path="/pedidos" element={
          <div>
              <Header 
              title = {"pedidos"}
              enableSearch = {true}
              icon = {"request.svg"}
              backArrow = {false}
              searchPlaceholder = {"Buscar Pedidos"}    
            ></Header>

            <div  className="body">
            <CardRequest
            title = {"Bioquimica comision 25 -  Clase 6"}
            date  = {"24/7/1993"}
            laboratory ={""}
            building  ={""}
            proffesor  ={""}
            students  ={"Carlos Lombardi"}
            >
           </CardRequest>              

            <CardRequest
            title = {"Bioquimica comision 25 -  Clase 7"}
            date  = {"24/7/1993"}
            laboratory ={""}
            building  ={""}
            proffesor  ={""}
            students  ={"Carlos Lombardi"}
            ></CardRequest>

            
            <MobileNav>
              
            </MobileNav>
            </div>
          </div>


          } />

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
