import React from 'react'
import {  Outlet } from 'react-router-dom';

const RedirectLog = () => {
    return(
            <div >  
                <Outlet/>
            </div>
        )
}

export default RedirectLog;