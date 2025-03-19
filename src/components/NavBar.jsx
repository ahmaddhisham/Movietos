import { Link } from "react-router-dom";
import "../css/navbar.css"

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Movietos</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
            <Link to="/about" className="About-link">About</Link>
        </div>
    </nav>
}

export default NavBar
