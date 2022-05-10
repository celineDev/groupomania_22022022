import React, {useContext} from 'react';
import Log from '../components/Log';
import Navigation from '../components/Navigation';
import Thread from '../components/Thread';
import { UserContext } from '../UserContext';

const Home = () => {
    const uid = useContext(UserContext);

    return (
        <div className='container'>
            <Navigation />
            <main className='main_container'>
                <section className='home-header'>
                    {uid ? <Thread /> : <Log login={true} signup={false} />}
                </section>
            </main>
        </div>
    );
};

export default Home;
