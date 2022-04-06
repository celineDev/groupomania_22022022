import React, { useContext } from 'react';
import Navigation from '../components/Navigation';
import Log from '../components/Log';
import { UserContext } from '../UserContext';
import UpdateProfile from '../components/Profile/UpdateProfile';

const Profile = () => {
    const uid = useContext(UserContext)
    return (
        <div className='profil-page'>
            <Navigation />
            {uid ? (
                <UpdateProfile />
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