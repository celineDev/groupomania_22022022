import React, { useContext, useState, useEffect } from 'react';
// same as href
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Logout from './Log/Logout';
import { GET } from '../utils/axios'

const Navigation = () => {
    const uid = useContext(UserContext);
    const [firstName, setFirstName] = useState()

    useEffect(() => {
        const getUserInfo = async () => {
            if (uid !== null) {
                const userId = uid.userId
                await GET (`api/auth/${userId}`)
                .then((res) => {
                    setFirstName(res.data.firstName)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
        getUserInfo()

    }, [uid, firstName])


    return (
        <header className="navigation">
            <nav className='nav-container'>
                <ul className='logo'>
                    <li>
                        <NavLink activeclassname="active" to="/">
                            <img src="./images/logos/icon-left-font-sm.png" alt="logo groupomania" />
                        </NavLink>
                    </li>
                </ul>
                {uid ? (
                    <ul>
                        {/* <li></li> li vide */}
                        <li className='welcome'>
                            <NavLink to='/profile'>
                                <h5>Bienvenue {firstName}</h5>
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
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Navigation;