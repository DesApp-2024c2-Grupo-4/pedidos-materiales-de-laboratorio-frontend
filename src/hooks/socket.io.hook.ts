import { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { io, Manager, Socket } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<any[]>([]);
  const [stateRoom, setstateRoom] = useState<any>(false);

  useEffect(() => {
    const newSocket = io('ws://localhost:3000', {
      extraHeaders: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    
    newSocket.on('message', (data) => {
      setMessages([...messages, data]);
    });
    
    newSocket.on('readMessage', () => {
      return messages
    });

    newSocket.on('joinRoom', (data) => {
      setstateRoom(data)
    });


    newSocket.on('leaveRoom', () => {
      setstateRoom(undefined)
    });

    
    setSocket(newSocket);
    
    return () => {
      newSocket.disconnect();
    };
  }, []);


  return {socket}



};
