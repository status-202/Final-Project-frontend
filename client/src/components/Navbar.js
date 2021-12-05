import "../css/navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Login from "./Login";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState();

  const userLoggedIn = () => {
    if (loggedIn) {
      return <div> <Logout setLoggedIn={setLoggedIn} /> </div> 
    } else {
      return <div> <Login setLoggedIn={setLoggedIn} /> </div> 
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div> <Link to="/">Home</Link> </div>
        <div> <Link to="/dashboard">Dashboard</Link> </div>
      </div>
      <div className="navbar__right">
        { userLoggedIn() }
      </div>
    </nav>
  )
}

export default Navbar;