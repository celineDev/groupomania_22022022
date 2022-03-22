import React, { useContext } from 'react';
import Navigation from '../components/Navigation';
import Log from '../components/Log';
import { UserContext } from '../UserContext';

const Profile = () => {
    const uid = useContext(UserContext)
    return (
        <div className='profil-page'>
            <Navigation />
            {uid ? (
                <h1>UPDATE PAGE</h1>
            ) : (
            <div className='log-container'>
            <Log login={true} signup={false} />
            <h1>Profile</h1>
            </div>
            )}
        </div>
    );
};

export default Profile;