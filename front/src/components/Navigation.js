import React, { useContext, useState, useEffect } from 'react';
// same as href
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Logout from './Log/Logout';
import axios from 'axios'

const Navigation = () => {
    const uid = useContext(UserContext);
    const [first_name, setFirstName] = useState()

    useEffect(() => {
        const getUserInfo = async () => {
            if (uid !== null) {
                const userId = uid.userId
                await axios ({
                    method: "get",
                    url: `http://localhost:3000/api/auth/${userId}`,
                    withCredentials: true,
                })
                .then((res) => {
                    setFirstName(res.data.first_name)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
        getUserInfo()

        if(first_name);
    }, [uid, first_name])


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
                                <h5>Bienvenue {first_name}</h5>
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