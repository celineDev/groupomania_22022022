import React from 'react';
import Navigation from '../components/Navigation';
import Posts from '../components/Posts';

const Home = () => {
    return (
        <div className='container'>
            <Navigation />
            <Posts />
            <h1>Mes posts</h1>
        </div>
    );
};

export default Home;