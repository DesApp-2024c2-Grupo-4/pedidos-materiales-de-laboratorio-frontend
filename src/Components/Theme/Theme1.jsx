import React from "react";
import teal from "@mui/material/colors/teal";
import green from "@mui/material/colors/green";
import { createTheme } from "@mui/material/styles";
//import { createTheme } from "@material-ui/core/styles";

const Theme1 = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1D2F58',
    },
    secondary: {
      main: '#1B621A',
    },
    error: {
      main: '#f11313',
      light: '#f9200f',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    divider: 'rgba(0,0,0,0.12)',
  },
})

export default Theme1;
