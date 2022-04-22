import React, {useContext} from 'react';
import Log from '../components/Log';
import Navigation from '../components/Navigation';
import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread';
import { UserContext } from '../UserContext';

const Home = () => {
    const uid = useContext(UserContext);

    return (
        <div className='container'>
            <Navigation />
            <main className='main_container'>
                <section className='home-header'>
                     {uid ? <NewPostForm /> : <Log login={true} signup={false} />}
                 </section>
                <Thread />
            </main>
        </div>
    );
};

export default Home;
