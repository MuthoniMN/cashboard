import React from "react";
import './Header.css';
import { FaBell, FaUser } from "react-icons/fa";

const Header = ({title, desc}) => {
    return (
        <header>
            <div>
                <h2>{title}</h2>
                <p>{desc}</p>
            </div>
            <div>
                <FaBell style={{ color: '#8F3985', fontSize: '24px' }} />
                <div>
                    <p className="avatar">
                        <FaUser style={{ color: '#8F3985', fontSize: '24px' }} />
                    </p>
                    <div>
                        <h3>username</h3>
                        <p>User Account</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;