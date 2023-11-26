import * as React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Grid, Box } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import "./chat-online.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  getMensajes,
  enviarMensaje,
  updateMensaje,
} from "../../Services/chat-service.js";
import { urlBD } from "../../connectDB";
import { useRef } from "react";
const socket = io(urlBD);

export default function ChatOnline({setRead, pedido, onClose }) {
  const chatRef = useRef();
  const [mensajes, setMensajes] = useState([]);
  const userActual = JSON.parse(localStorage.getItem("usuario"));
  const pedidoId = pedido._id;
  useEffect(() => {
    // Únete al chat cuando el componente se monta
    socket.emit("joinChat", pedidoId);
    socket.on("chatMessage", (data) => {
      setMensajes(data);
    });
    getMensajes(pedidoId).then((res) => {
      if (res.data) {
        const ultimoElemento =
          res.data.list_mensajes[res.data.list_mensajes.length - 1];
        if (userActual.rol == "lab" && ultimoElemento.nombre != "LAB") {
          res.data.list_mensajes.map((resp) => {
            resp.read = true;
            ultimoElemento.read = true
          });
          updateMensaje(res.data);
          setRead(ultimoElemento.read)
        } else if (userActual.rol != "lab" && ultimoElemento.nombre == "LAB") {
          res.data.list_mensajes.map((resp) => {
            resp.read = true;
            ultimoElemento.read = true
          });
          updateMensaje(res.data);
          setRead(ultimoElemento.read)
        }
        setMensajes(res.data.list_mensajes);
      } else {
        setMensajes([]);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("chatMessage");
    };
  },[]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [mensajes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.input.value !== ""){
      let objMensaje = {
        id_pedido: pedido._id,
        mail: {
          nombre:
            userActual.rol === "lab"
              ? "LAB"
              : userActual.nombre[0].toLocaleUpperCase() +
                userActual.apellido[0].toLocaleUpperCase(),
          id_emisor: userActual.dni,
          mensaje: e.target.input.value,
          read: false,
        },
      };
  
      enviarMensaje(objMensaje).then((rpta) => {
        setMensajes(rpta.list_mensajes);
        socket.emit("sendMessage", pedidoId, rpta.list_mensajes);
        e.target.input.value = "";
      });
    }
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
              <Box className="chat" ref={chatRef} sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Box className="container-message">
                  {mensajes?.map((mensaje, index) =>
                    mensaje.id_emisor != userActual.dni ? (
                      <Box key={index} className="chat-prof">
                        <p className="message-prof">{mensaje.mensaje}</p>
                        <Box className="icono-message">
                          <p>{mensaje.nombre}</p>
                        </Box>
                      </Box>
                    ) : (
                      <Box key={index} className="chat-labo">
                        <p className="message">{mensaje.mensaje}</p>
                        <Box className="icono-message">{mensaje.nombre}</Box>
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
                    placeholder="Escribe un mensaje aquí"
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
