import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userContext } from '../../Context/LabProvider';

const RedirectLaboratorio = () => {

    const {user, storeUser} = useContext(userContext)

    useEffect(() => {
        if (user) {
            storeUser(user);
        }
      }, []);

    useEffect(() => {
        storeUser(user);
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