import { Avatar } from "@chakra-ui/react"
import { useFrappeAuth } from "frappe-react-sdk";
import { FaBars } from "react-icons/fa";


const Header = () => {
    const { currentUser, isValidating, login, logout, updateCurrentUser, getUserCookie } = useFrappeAuth();
  login("azmin", "Azmin@123#");
  console.log(currentUser);
  
  return (
    <>
        <div className="flex justify-between border-b items-center px-5">
            <h4  className="text-xl flex items-center gap-1 border-e py-4" style={{width : '250px'}}> <FaBars size={17} /> Menu</h4>
            <Avatar name='Developer Achem' className="cursor-pointer" onClick={() => alert('Sccess')} src="https://i.ibb.co/G5yyssZ/Scuare.jpg" />
        </div>
    </>
  )
}

export default Header