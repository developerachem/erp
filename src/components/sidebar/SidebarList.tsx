import { BiChevronDown } from "react-icons/bi";
import listCss from './Sidebar.module.css'
import { Link, useLocation } from "react-router-dom";
const props ={
  children : undefined,
  title : undefined ,
  icon : undefined,
  active : undefined,
  link : undefined,
}

const SidebarList = ({ children, title, icon, active, link} = props) => {
  const currentPath = useLocation().pathname

  // Sub Menu Open Handler
  const handleSubmenu = (e:undefined) => {
    if(!e.target.nextElementSibling.classList.contains('menuOpenAcive')){
    e.target.nextElementSibling.classList.add('menuOpenAcive')
    }else{
    e.target.nextElementSibling.classList.remove('menuOpenAcive')
    }
  }

  return (
    <>
      {!children && (
       <li>
        <Link to={link} className={ currentPath === link  && "menuActive"}>
            <div className='flex gap-2 items-center'>
                {icon}
                <p>{title}</p>
            </div>
        </Link>
      </li>
    )}

    {children && (
      <li>
        <button className={ active && "menuActive"} onClick={handleSubmenu}>
            <div className={`${listCss.list} flex gap-2 items-center`}>
                {icon}
                {title}
            </div>
            {children && <BiChevronDown size={25} />}
        </button>
        {children}
      </li>
    )}
    </>
  )
}

export default SidebarList