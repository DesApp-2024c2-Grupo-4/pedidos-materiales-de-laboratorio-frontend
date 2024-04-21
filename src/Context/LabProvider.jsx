import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { decryptAES, encryptAES } from "../Services/getToken";
import { getAdmin, getUserInfo } from "../Services/getUsuarioService";

export const userContext = createContext();
const LabProvider = ({ children }) => {
  const [update, setUpdate] = useState(0);
  const [user, setUser] = useState(decryptAES(localStorage.getItem("usuario")) || "");
  const [token, setToken] = useState(localStorage.getItem("token") || {});
  const storeToken = (token) => {
    localStorage.setItem("token", token.token);
    setToken(token.token || localStorage.getItem("token"));
  };
  
  const storeUser = (user) => {
    const encryptedUser = encryptAES(user);
    localStorage.setItem("usuario", encryptedUser);
    setUser(user);
  };
  const cleanStorage = () => {
    localStorage.clear();
  };
  const userAdmin = async (id) => {
    if (id) {
      return await getAdmin(id);
    }
  };
  const userInfo = async (id) => {
    if (id) {
      return await getUserInfo(id);
    }
  };
  return (
    <userContext.Provider
      value={{
        user,
        update,
        setUpdate,
        userAdmin,
        storeUser,
        cleanStorage,
        storeToken,
        userInfo,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default LabProvider;
