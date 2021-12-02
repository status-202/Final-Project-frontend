import "../css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <div> <Link to="/">Home</Link> </div>
        <div> <Link to="/dashboard">Dashboard</Link> </div>
      </div>
      <div>
        <div> <Link to="/login">Login</Link> </div>
        <div> <Link to="/logout">Logout</Link> </div>
      </div>
    </nav>
  )
}

export default Navbar;