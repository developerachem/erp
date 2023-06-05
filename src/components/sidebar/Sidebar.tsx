import { MdDashboard } from 'react-icons/md';
import sidebarCss from './Sidebar.module.css'
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { AiOutlinePlusCircle, AiOutlineShoppingCart, AiOutlineUnorderedList } from 'react-icons/ai';
import SidebarList from './SidebarList';


const Sidebar = () => {
  return (
    <div style={{width : '270px', height :'90vh'}} className='border-r'>
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