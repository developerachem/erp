import { MdDashboard } from 'react-icons/md';
import sidebarCss from './Sidebar.module.css'
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { AiOutlinePlusCircle, AiOutlineShoppingCart, AiOutlineUnorderedList } from 'react-icons/ai';
import SidebarList from './SidebarList';
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const navigate = useNavigate()
  return (
    <div style={{width : '270px', height :'100vh', borderColor : 'var(--border)', backgroundColor : 'var(--sidebar-bg)'}} className='border-r' >
        <button 
            className="text-xl flex items-center gap-1 py-4 px-5 border-b cursor-pointer w-full" 
            style={{color : 'white', borderColor : '#333333'}}
            onClick={() => navigate('/')}    
        > 
            <FaBars size={17} /> 
            Menu
        </button> 
        <ul className={sidebarCss.sidebar_menu}>
           
            <SidebarList link="/dashboard" active={true} icon={<MdDashboard size={25} />} title="Dahboard" />
            <SidebarList icon={<FaFileInvoiceDollar size={25} />} title="Sales" >
                <ul>
                    <SidebarList link="/sales/add" icon={<AiOutlinePlusCircle size={25} />} title="Add Sales" />
                    <SidebarList link="/sales/list" icon={<AiOutlineUnorderedList size={25} />} title="All Sales" />
                </ul>
            </SidebarList>
            <SidebarList icon={<AiOutlineShoppingCart size={25} />} title="Purchase" > 
                <ul>
                    <SidebarList icon={<AiOutlinePlusCircle size={25} />} title="Add Purchase" />
                    <SidebarList icon={<AiOutlineUnorderedList size={25} />} title="All Purchase" />
                </ul>
            </SidebarList>
           
        </ul>
    </div>
  )
}

export default Sidebar