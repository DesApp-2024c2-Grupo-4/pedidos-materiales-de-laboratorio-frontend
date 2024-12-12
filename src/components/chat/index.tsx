import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import newSocket from "./socketio";

export default function ChatOnline({ onClose, id }) {
  const chatRef = useRef();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    newSocket.emit("message", { requestId: "ejemplorequest", message: inputMessage });
    setInputMessage("");
  };

  const handleClose = () => {
    newSocket.emit("leaveRoom", { requestId: "ejemplorequest" });
    newSocket.disconnect();
    onClose();
  };

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
              {messages.map((mensaje, index) => (
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
