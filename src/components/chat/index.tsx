import * as React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Grid, Box, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, useRef } from "react";

export default function ChatOnline({ onClose }) {
  const chatRef = useRef();
  const [userData, setUserData] = useState({});
  const mockMensajes = [
    { id_emisor: 1, mensaje: "Hola, ¿cómo estás?", nombre: "Juan" },
    { id_emisor: 2, mensaje: "Bien, ¿y tú?", nombre: "María" },
    { id_emisor: 1, mensaje: "Todo bien, gracias.", nombre: "Juan" },
    { id_emisor: 2, mensaje: "¿Qué tal el proyecto?", nombre: "María" },
  ];

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para enviar mensajes
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ border: "1px solid #ccc", borderRadius: 2, padding: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box ref={chatRef} sx={{ maxHeight: 300, overflowY: "auto", marginBottom: 2 }}>
              {mockMensajes.map((mensaje, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: mensaje.id_emisor !== 2 ? "row" : "row-reverse",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: mensaje.id_emisor !== 2 ? "#e0e0e0" : "#1976d2",
                      color: mensaje.id_emisor !== 2 ? "black" : "white",
                      borderRadius: 2,
                      padding: 1,
                      maxWidth: "70%",
                    }}
                  >
                    <p>{mensaje.mensaje}</p>
                    <Box sx={{ fontSize: "0.8em", textAlign: "right" }}>{mensaje.nombre}</Box>
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
                  name="input"
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
