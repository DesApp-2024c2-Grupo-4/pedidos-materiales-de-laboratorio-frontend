import React, { createContext, useState } from "react";
import { getAdmin, getUserInfo } from "../Services/getUsuarioService";

export const userContext = createContext();
const LabProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("usuario")) || {}
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || {}
  );
  const storeToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token || JSON.parse(localStorage.getItem("token")));
  };
  const storeUser = (user) => {
    localStorage.setItem("usuario", JSON.stringify(user));
    setUser(user || JSON.parse(localStorage.getItem("usuario")));
  };
  const cleanStorage = () => {
    localStorage.clear();
  };
  const userAdmin = async (id) => {
    if (id) {
      return await getAdmin(id);
    }
  };
  const userInfo = async(id) => {
    if (id){
      return await getUserInfo(id)
    }
  }
  return (
    <userContext.Provider
      value={{ user, update, setUpdate, userAdmin, storeUser, cleanStorage, storeToken, userInfo}}
    >
      {children}
    </userContext.Provider>
  );
};

export default LabProvider;
