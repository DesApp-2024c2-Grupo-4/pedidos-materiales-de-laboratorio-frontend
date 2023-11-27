import React, { createContext, useState } from "react";
import { getAdmin } from "../Services/getUsuarioService";

export const userContext = createContext();
const LabProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("usuario")) || {}
  );
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
  return (
    <userContext.Provider
      value={{ user, update, setUpdate, userAdmin, storeUser, cleanStorage }}
    >
      {children}
    </userContext.Provider>
  );
};

export default LabProvider;
