import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import welcomeCss from './welcomeCss.module.css';
import Header from '../../components/header/Header';

const WelcomePage = () => {
    const currentPath = useLocation().pathname === '/';
    
  return (
    <div className="flex justify-between w-full" style={{backgroundColor : 'var(--main-bg)'}}>
        <Sidebar />
        <div className={welcomeCss.welcome}>
            {currentPath ? (
                <>
                  <Header />
                  <div className={welcomeCss.message}>Welcome Back ACHEM</div>
                </>
            ) : (
              <>
                <Header />
                <div className="p-5 pb-0 pr-0 overflow-hidden">
                  <Outlet />
                </div>
              </>
            )}
        </div>
    </div>
  )
}

export default WelcomePage