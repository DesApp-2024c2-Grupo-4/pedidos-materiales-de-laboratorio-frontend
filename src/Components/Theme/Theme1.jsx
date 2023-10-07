import React from "react";
import teal from "@mui/material/colors/teal";
import green from "@mui/material/colors/green";

import { createTheme } from "@mui/material/styles";

const Theme1 = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#26a69a",
    },

    secondary: {
      main: "#b4e0bc",
      oscuro: "#248f37",
    },
    verdeC: {
      main: "#b4e0bc",
    },

    rojo: {
      main: "#ba000d",
    },
    gris: {
      main: "#685E5E",
      claro: "#cfc6c6",
    },
    blanco: {
      main: "#FFFFFF",
    },
  },
});

export default Theme1;
