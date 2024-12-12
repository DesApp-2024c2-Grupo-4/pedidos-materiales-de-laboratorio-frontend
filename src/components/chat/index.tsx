import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useAuth } from "../../context/auth.context";

import  useSocket from "../../hooks/socket.io.hook.ts"
import { useParams } from "react-router-dom";
import { io  } from "socket.io-client";
import Cookies from "js-cookie";



export default function ChatOnline({ onClose, id }) {
  const chatRef = useRef();
  const socket =useSocket(id)
  const authService = useAuth();

  
  const [inputMessage, setInputMessage] = useState("");
  const authToken = authService.getTokenInfo();
  
  
  useEffect(() => {
    socket.joinRoom(id)
      
    }, []);

  useEffect(() => {
      socket.joinRoom(id)
      
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.message(id,inputMessage)
    setInputMessage("");
    };

  const handleClose = () => {
  
    onClose();
  };

  function formatearFecha(fechaString) {
    // Crear un objeto Date a partir de la cadena
    const fecha = new Date(fechaString);

    // Obtener los componentes de la fecha
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');

    // Formatear la fecha en el nuevo formato
    return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ border: "1px solid #ccc", borderRadius: 2, padding: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
         <Box ref={chatRef} sx={{ maxHeight: 300, overflowY: "auto", marginBottom: 2 }}>
              {socket.showMessages().map((mensaje, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: mensaje?.ownerId! !== authToken?.id ? "row" : "row-reverse",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Box      
                    sx={{
                      backgroundColor: mensaje?.ownerId! == authToken?.id ? "#e0e0e0" : "#1976d2",
                      color: mensaje?.ownerId! == authToken?.id ? "black" : "white",
                      borderRadius: 2,
                      padding: 1,
                      maxWidth: "70%",
                    }}
                  >
                    <p>{mensaje.message}</p>
                    <Box sx={{ fontSize: "0.8em", textAlign: "right" }}>{formatearFecha(mensaje.createdAt)}</Box>
                  </Box>
                </Box>
              ))}
            </Box> 
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Escribe un mensaje aquí"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  sx={{ marginRight: 1 }}
                />
                <Button type="submit" variant="contained" color="primary">
                  <ArrowDropUpIcon />
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}


