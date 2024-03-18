import React, { useContext, useState } from 'react';
import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navigation = ({links}) => {
    const [navOpen, setNavOpen] = useState(false);
    const { setCurrentUser, setToken} = useContext(AuthContext);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        setCurrentUser(null);
        setToken(null);
        navigate('/login')
    }

    return (
        <div>
            <p  className={navOpen ? 'mobileNav move' : 'mobileNav'} onClick={() => setNavOpen(!navOpen)}>{navOpen ? 'X' : '☰'}</p>

            <nav className={navOpen ? 'navMenu open'  : 'navMenu'}>
            <img src="/logos/light-logo.png" alt="Cashboard App Logo" width={100} height={100} />

            <ul>
                {links.map(link => (
                    <li>
                    <Link to={link.link}>{link.text}</Link>
                    </li>
                ))}
            </ul>

            <button onClick={logout}>Log Out</button>
        </nav>
        </div>
        
    )
}

export default Navigation;