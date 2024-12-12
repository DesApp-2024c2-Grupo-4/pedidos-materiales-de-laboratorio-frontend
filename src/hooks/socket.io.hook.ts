  import { useEffect, useLayoutEffect, useState } from "react";
  import { useAuth } from "../context/auth.context";
  import { io, Manager, Socket } from "socket.io-client";
  import Cookies from "js-cookie";

  
interface Message {
  _id: string | null;
  message: string | null;
  ownerId: string | null;
  delivered: any[];
  read: any[];
  updatedAt: Date|null;
  createdAt: Date|null;
}


  export default function useSocket(idRequest:string) {
    const [socket, setSocket] = useState<Socket>();
    const [messagesList, setMessages] = useState<Message[]>([]);
    const [stateRoom, setstateRoom] = useState<any>(false);
    const ACCESS_TOKEN_COOKIE = "x-access-token";
    const [authToken, setAuthToken] = useState<string | null>(Cookies.get(ACCESS_TOKEN_COOKIE) || null);

    useEffect(() => {
      const newSocket = io('ws://localhost:3000', {
        extraHeaders: {
          'Authorization': `Bearer ${authToken}`
        }
        
      });

      newSocket.on('message', (data) => {
        const {message} = data 
        console.log(message)
        receiveMessage(message)
        
      });

      newSocket.on('roomHistory', (data) => {
        console.log(data)
        const { messages } = data 
        setMessages(messages)
      });
      
      console.log("sala" ,idRequest)
      newSocket.emit("joinRoom",{"requestId" :idRequest} )

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }, []);

    const joinRoom = (idRequest) =>{
    }
    
    const message = (idRequest,message) =>{
      socket?.emit("message",{"requestId" :idRequest , "message" : message} )
      console.log(messagesList)
    }

    const showMessages = () => {
      return messagesList
    }

    const receiveMessage = (message) => setMessages((messagesList) => [... messagesList,message]) 

    return {showMessages ,joinRoom,message}



  };
