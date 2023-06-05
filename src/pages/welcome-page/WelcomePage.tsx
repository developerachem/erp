import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import welcomeCss from './welcomeCss.module.css';

const WelcomePage = () => {
    const currentPath = useLocation().pathname === '/';
    
  return (
    <div className="flex justify-between w-full">
        <Sidebar />
        <div className={welcomeCss.welcome}>
            {currentPath ? (
                <div className={welcomeCss.message}>Welcome Back Developer</div>
            ) : <Outlet />}
        </div>
    </div>
  )
}

export default WelcomePage