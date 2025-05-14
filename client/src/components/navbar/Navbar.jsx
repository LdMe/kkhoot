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
                <li >
                    <NavLink to="/stand">Stands</NavLink>
                </li>
                <li >
                    <NavLink to="/product">Products</NavLink>
                </li>
                {userData && userData.role ==="seller" && (
                    <li className={"nav-item "}>
                    <button >Cosas de vendedores</button>
                </li>
                )}
                
                {userData ? (
                    <li className={"nav-item "}>
                        <button onClick={onLogout}>Logout</button>
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