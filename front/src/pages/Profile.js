import React from 'react';
import Navigation from '../components/Navigation';
import Log from '../components/Log';

const Profile = () => {
    return (
        <div className='profil-page'>
            <div className='log-container'>
            <Navigation />
            <Log login={false} signup={true} />
            <h1>Profile</h1>

            </div>
        </div>
    );
};

export default Profile;