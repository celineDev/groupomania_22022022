import React from 'react';
// same as href
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <header className="navigation">
            <ul>
                <NavLink to="/">
                    <li><img src="./images/icon-left-font-sm.png" alt="logo groupomania" /></li>
                </NavLink>
            </ul>
            <ul>
                <NavLink to="/signup">
                    <li>inutile</li>
                </NavLink>
            </ul>
            <ul>
                <NavLink to="/profile">
                    <li>Se connecter</li>
                </NavLink>
            </ul>
        </header>
    );
};

export default Navigation;