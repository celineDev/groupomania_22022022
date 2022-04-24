import React, { useEffect, useState } from 'react';
import Cards from './Post/Cards';
import { isEmpty } from '../utils/Functions';
import { GET } from '../utils/axios'

const Thread = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getAllPost = async () => {
            await GET("api/post/")
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
            {!isEmpty(posts[0]) &&
                posts.map((post) => {
                    return <Cards post={post} key={post.id} />;
                })
            }
        </section>
    );
};

export default Thread;