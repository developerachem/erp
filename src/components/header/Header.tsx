import { Avatar } from "@chakra-ui/react"
import { useFrappeAuth } from "frappe-react-sdk";
import { FaBars } from "react-icons/fa";
import headerCss from  './header.module.css'
import { BsMoon, BsSunFill } from "react-icons/bs";
import { useState } from "react";



const Header = () => {
  const { currentUser, isValidating, login, logout, updateCurrentUser, getUserCookie } = useFrappeAuth();
  login("azmin", "Azmin@123#");
  // Mode Srare Nabafnebt
  const [mode, setMode] = useState(false)

  // Mode Change Handler
  const handleModeChange = () => {
    const body = document.getElementById('body');
    if(mode){
      setMode(false);
      body?.classList.remove('dark');
      body?.classList.add('light');
    }else{
      setMode(true);
      body?.classList.add('dark');
      body?.classList.remove('light');
    }
  }
  
  return (
    <>
        <div 
          className="flex justify-between border-b items-center" 
          style={{backgroundColor : 'var(--bg)', borderColor : 'var(--border)', padding : '6px 15px'}}
        >
            {/* <h4  className="text-xl flex items-center gap-1 border-e py-4" style={{width : '250px', color : 'var(--text)', borderColor : 'var(--border)'}}> <FaBars size={17} /> Menu</h4> */}
            <div></div>
            <div className="flex items-center  gap-5">
              <button className={headerCss.mode} onClick={handleModeChange}>
                <span>
                  {mode && <BsSunFill size={20} color="#fff" />}
                  {!mode && <BsMoon size={20} color="#000" />}
                </span>
              </button>
              <Avatar name='Developer Achem' className="cursor-pointer" onClick={() => alert('Sccess')} src="https://i.ibb.co/G5yyssZ/Scuare.jpg" />
            </div>
        </div>
    </>
  )
}

export default Header