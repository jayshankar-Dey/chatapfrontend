import { Link } from "react-router-dom"

import "./Navbar.css"
const Navbar = () => {
  return (
    <nav>
        <ul>
            <Link to={"/"}>Home</Link>
        </ul>
        
        <ul>
         <button onClick={()=>{
          localStorage.removeItem("chatUser")
         }}>Logout</button>
        </ul>
    </nav>
  )
}

export default Navbar
