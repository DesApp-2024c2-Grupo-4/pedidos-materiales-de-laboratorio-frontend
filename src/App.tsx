import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* Components */
import Template from "./views/template";
import Login from "./views/login";

/* Styles */
import "./App.scss";
import PrivateRoute from "./components/private-route";
import Home from "./views/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Template />}>
          <Route index path="/login" element={<Login />} />
          {/* Component PrivateRoute will check for a valid JWT
           * and redirect to '/login' if there isn't one
           * so every route that requires an auth user should be
           * defined inside this route*/}
          <Route element={<PrivateRoute />}>
            <Route index path="/home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
