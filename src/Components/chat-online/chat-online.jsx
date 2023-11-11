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
  const [mensaje_input, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.on("chat_message", (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
    };
  }, []);

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    let objMensaje = {
      // id_equivalencia: id,
      texto: e.target.input.value,
      // id_remitente: usuario_id,
      // id: `${socket - id}${Math.random()}`,
      socketID: socket.id,
    };
    /*  enviarMensaje(objMensaje).then((rpta) => {
      setMensajes([...mensajes, rpta.data]);
      setMensaje("");
    }); */
    socket.emit("chat_message", objMensaje);
   
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
                  {mensajes.map((mensaje) => (
                    <li>
                      {mensaje.socketID}: {mensaje.texto}
                    </li>
                  ))}
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
