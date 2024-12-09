
import { useLayoutEffect } from "react";
import { useAuth } from "../context/auth.context";
import { io, Manager } from "socket.io-client";

const useSocket = () => {

  const authService = useAuth();

  useLayoutEffect(() => {
    const authToken = authService.getTokenInfo();
    if (!authToken) return;
    console.log(authToken, "authToken");
    const userRoles = authToken.roles;
      
  }, []);



const manager = new Manager("ws://localhost:3000", {
  reconnectionDelayMax: 10000,
  query: {
    "Bearer": authService.authToken
  }
});

const socket = manager.socket("/my-namespace", {
  auth: {
    token: "123"
  }
});



  return { manager, socket };
};

export default useSocket;
