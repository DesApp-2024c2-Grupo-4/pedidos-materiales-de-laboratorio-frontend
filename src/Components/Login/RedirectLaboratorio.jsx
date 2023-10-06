import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userContext } from '../../Context/LabProvider';

const RedirectLaboratorio = () => {

    const {user, setUser} = useContext(userContext)

    useEffect(() => {
        if (localStorage.getItem("usuario")) {
            setUser(JSON.parse(localStorage.getItem("usuario")));
        }
      }, []);

    useEffect(() => {
        localStorage.setItem("usuario", JSON.stringify(user));
    }, [user]);
    
    if(user.rol === 'lab'){
        return(
            <div >  
                <Outlet/>
            </div>
        )
    }
    return <Navigate to="/login"/>
}

export default RedirectLaboratorio;