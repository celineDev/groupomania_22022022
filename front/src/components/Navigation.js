import React, { useContext, useState, useEffect } from 'react';
// same as href
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Logout from './Log/Logout';
import { apiRequest } from '../utils/api';

const Navigation = () => {
    const uid = useContext(UserContext);
    const [firstName, setFirstName] = useState()
    const [profilePicture, setProfilePicture] = useState()

    useEffect(() => {
        const getUserInfo = async () => {
            if (uid !== null) {
                const userId = uid.userId
                await apiRequest.getUser(`${userId}`)
                .then((res) => {
                    setFirstName(res.data.firstName)
                    setProfilePicture(res.data.profile)
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
                <NavLink className="inactive" activeclassname="active" to="/">
                    <img className='logo' src="./images/logos/icon-left-font-sm.png" alt="logo groupomania" />
                </NavLink>
                {uid ? (
                    <ul className='nav-list'>
                        <li className='nav-welcome' title='Compte utilidateur'>
                            <NavLink className="inactive" to='/profile'>
                                <figure className='nav-figure'>
                                    <img className='nav-profile' src={profilePicture} alt="user" />
                                </figure>
                                <p className='nav-p'>{firstName}</p>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li className='nav-bye'>
                            <NavLink className="inactive" activeclassname="active" to='/profile'>
                                Connexion
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Navigation;