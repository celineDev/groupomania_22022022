import React, { useContext } from 'react';
// same as href
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Logout from './Log/Logout';

const Navigation = () => {
    const uid = useContext(UserContext)
    return (
        <header className="navigation">
            <nav className='nav-container'>
                <ul className='logo'>
                    <li>
                        <NavLink activeclassname="active" to="/">
                            <img src="./images/icon-left-font-sm.png" alt="logo groupomania" />
                        </NavLink>
                    </li>
                </ul>
                {uid ? (
                    <ul>
                        {/* <li></li> li vide */}
                        <li className='welcome'>
                            <NavLink to='/profile'>
                                <h5>Bienvenue 'valeur dynamique'</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        {/* <li></li> */}
                        <li>
                            <NavLink activeclassname="active" to='/profile'>
                                <img src="" alt="login" />
                                Se connecter
                                <p>l---</p>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Navigation;