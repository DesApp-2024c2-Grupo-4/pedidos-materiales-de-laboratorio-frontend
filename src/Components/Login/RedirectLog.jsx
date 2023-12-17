import React, { useEffect } from 'react'
import {  Outlet, useNavigate } from 'react-router-dom';

const RedirectLog = () => {
    const navigate = useNavigate()
    useEffect(()=> {
        navigate("/login")
    },[])   
    
    return(
            <div >  
                <Outlet/>
            </div>
        )
}

export default RedirectLog;