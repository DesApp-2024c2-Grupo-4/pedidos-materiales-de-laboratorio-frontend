import React, { createContext, useState } from 'react'

export const userContext = createContext()
const LabProvider = ({children}) => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("usuario")) || {}
  );

  return (
    <userContext.Provider
    value={{user, setUser}}>
      {children}
    </userContext.Provider>
  )
}

export default LabProvider