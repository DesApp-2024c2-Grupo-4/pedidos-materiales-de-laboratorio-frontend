import * as React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Grid, Box, Button, TextField } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import "./chat-online.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getMensajes, enviarMensaje } from "../../Services/chat-service.js";

const ENDPOINT = "http://localhost:3001";
const socket = io(ENDPOINT);

export default function ChatOnline({ pedido, onClose }) {
  const [mensaje_input, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const userActual = JSON.parse(localStorage.getItem('usuario'));
  const pedidoId = pedido._id;

  useEffect(() => {
    debugger
    // Unirse al chat cuando el componente se monta
    socket.emit('joinChat', pedidoId);

    // Manejar mensajes del servidor
    socket.on('chatMessage', (data) => {
      
      setMensajes([...mensajes, data]);
    });

    return () => {
      // Desconectarse y dejar de escuchar cuando el componente se desmonta
      socket.off('connect');
      socket.off('chatMessage');
    };
  }, [pedidoId, mensajes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear objeto de mensaje
    let objMensaje = {
      nombre:
        userActual.rol === 'lab'
          ? 'LAB'
          : userActual.nombre[0].toLocaleUpperCase() +
            userActual.apellido[0].toLocaleUpperCase(),
      id_emisor: userActual.dni,
      mensaje: e.target.input.value,
      read: true,
      id_pedido: pedido._id,
    };
    enviarMensaje(objMensaje).then((rpta) => {
      debugger
      socket.emit('sendMessage', pedidoId, rpta);
    });
    // Limpiar el campo de mensaje después de enviar
    e.target.input.value = '';
  };
  return (
    <Box className="container-chat">
      <Grid container>
        <Grid item xs={0} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Box className="containter-form-login">
            <Box className="chat-online">
              <Box className="container-cerrar">
                <Box className="cerrar">
                  <CloseIcon onClick={onClose} className="icono-cerrar" />
                </Box>
              </Box>
              <Box className="chat">
                <Box className="container-message">
                  {mensajes.map((mensaje,index) =>
                    mensaje.id_emisor != userActual.dni? (
                      <Box key={index} className="chat-prof">
                        <p className="message-prof">{mensaje.mensaje}</p>
                        <Box className="icono-message">
                          <p>
                            {mensaje.nombre}
                          </p>
                        </Box>
                      </Box>
                    ) : (
                      <Box key={index} className="chat-labo">
                        <p className="message">{mensaje.mensaje}</p>
                        <Box className="icono-message">
                        {mensaje.nombre}
                        </Box>
                      </Box>
                    )
                  )}
                </Box>
              </Box>
              <form onSubmit={handleSubmit}>
                <Box className="container-enviar">
                  <input
                    className="input"
                    name="input"
                    placeholder="  hola..."
                  ></input>
                  <button className="button" type="submit">
                    <ArrowDropUpIcon className="icono" />
                  </button>
                </Box>
              </form>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} md={3}></Grid>
      </Grid>
    </Box>
  );
}
