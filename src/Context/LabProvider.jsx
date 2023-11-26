import React, { createContext, useState } from 'react'
import { getAdmin } from '../Services/getUsuarioService';

export const userContext = createContext()
const LabProvider = ({children}) => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("usuario")) || {}
  );
  const [update, setUpdate] = useState(false)
  const userAdmin = async(id)=>{
    if(id){ 
      return await getAdmin(id)
    }
  }
  return (
    <userContext.Provider
    value={{user, setUser, update, setUpdate, userAdmin}}>
      {children}
    </userContext.Provider>
  )
}

export default LabProvider