import React, { useState } from 'react';
import './Navigation.css';

const Navigation = ({links}) => {
    const [navOpen, setNavOpen] = useState(false)

    return (
        <div>
            <p  className={navOpen ? 'mobileNav move' : 'mobileNav'} onClick={() => setNavOpen(!navOpen)}>{navOpen ? 'X' : '☰'}</p>

            <nav className={navOpen ? 'navMenu open'  : 'navMenu'}>
            <img src="/logos/light-logo.png" alt="Cashboard App Logo" width={100} height={100} />

            <ul>
                {links.map(link => (
                    <li>
                        <a href={link.link}>{link.text}</a>
                    </li>
                ))}
            </ul>

            <button>Log Out</button>
        </nav>
        </div>
        
    )
}

export default Navigation;