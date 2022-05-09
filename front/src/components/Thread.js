import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import { isEmpty } from '../utils/Functions';
import Cards from './Post/Cards';
import NewPostForm from './Post/NewPostForm';

const Thread = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getAllPost = async () => {
            await apiRequest.getPost()
            .then((res) => {
                setPosts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getAllPost()
    }, [])

    return (
        <section className='thread-container'>
            <NewPostForm />
            {!isEmpty(posts[0]) &&
                posts.map((post) => {
                    return <Cards post={post} key={post.id} />;
                })
            }
        </section>
    );
};

export default Thread;