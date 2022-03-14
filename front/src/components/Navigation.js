import React from 'react';
// same as href
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <ul>
                <NavLink to="/">
                    <li>accueil</li>
                </NavLink>
            </ul>
            <ul>
                <NavLink to="/profile">
                    <li>profil</li>
                </NavLink>
            </ul>
            <ul>
                <NavLink to="/login">
                    <li>Se connecter</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navigation;