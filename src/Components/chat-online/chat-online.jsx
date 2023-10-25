import * as React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Grid, Box, Button, TextField } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import "./chat-online.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {io}  from "socket.io-client";
import { getEquipoPorId } from "../../Services/getEquipoPorId";


const ENDPOINT = "http://localhost:3001";
const socket = io(ENDPOINT);

export default function ChatOnline() {
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [pedido, setpedido] = useState([]);

  useEffect(() => {
    socket.on('chat_message', (data) => {
      setMensajes(mensajes => [...mensajes, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('chat_message');
    }

  }, []);

 
  React.useEffect(() => {
    getEquipoPorId('64fe5abb1e88e7c93f8d13fa').then(resp=>{
      setMensajes(pedido => [...pedido, resp]);
    });
  }, []);
  const handleSubmit = (e) => {
    socket.emit('chat_message', {
      usuario: socket.id,
      mensaje: nuevoMensaje
    });
  };

  return (
    <Box className="container">
      <Grid container>
        <Grid item xs={0} md={3}></Grid>
        <Grid item xs={12} md={6}>
          <Box className="containter-form-login">
            <Box className="chat-online">
              <Box className="container-cerrar">
                <Box className="cerrar">
                  <CloseIcon className="icono-cerrar" />
                </Box>
              </Box>
              <Box className="chat">
                <Box className="container-message">
                {pedido.lista_mensajes.map((resp,index) => (
                    true ? (
                      <Box key={index} className="chat-prof">
                        <p className="message-prof">{resp.mensaje}</p>
                        <Box className="icono-message">
                          <p>
                            {pedido.docente.nombre[0].toLocaleUpperCase() +
                              pedido.docente.apellido[0].toLocaleUpperCase()}
                          </p>
                        </Box>
                      </Box>
                    ) : (
                      <Box key={index} className="chat-labo">
                        <p className="message">{resp.mensaje}</p>
                        <Box className="icono-message">
                          <p>LAB</p>
                        </Box>
                      </Box>
                    )
                  ))}
                </Box>
              </Box>
              <form onSubmit={handleSubmit}>
                <Box className="container-enviar">
                  <input className="input" name="input" placeholder="  hola..."></input>
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
