import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';
function Navbar() {
    const { onLogout, userData } = useContext(AuthContext);
    return (
        <nav>
            <ul className="nav-list">
                <li className={"nav-item "} >
                    <NavLink to="/">Home</NavLink>
                </li>
                
                
                {userData ? (
                   <li>
                    <NavLink to="/trivias">Trivias</NavLink>
                   </li>

                ) : (
                    <li >
                        <NavLink to="/login">Login</NavLink>
                    </li>

                )}
            </ul>
        </nav>
    )
}

export default Navbar;