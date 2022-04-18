import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';

const Like = ({ post }) => {
    const uid = useContext(UserContext)
    const [liked, setLiked] = useState('false')
    const [likeCount, setLikeCount] = useState('')

    // number of likes
    useEffect(() => {
        const likeCount = async () => {
            await axios({
                method: "get",
                url: `http://localhost:3000/api/post/${post.id}/like`,
                withCredentials: true,
            })
            .then((res) => {
                // setLikeCount(res.data.likes)
                setLikeCount(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        likeCount()

    }, [uid, post.id])

    const handleLike = () => {
        axios({
            method: "post",
            baseURL: `http://localhost:3000/api/post/${post.id}/like`,
            withCredentials: true,
            data: {
                uid: uid,
            },
        })
        .then((res) => {
            if (res.err) {
                console.log(res.err)
            }
            if (res.status === 200) {
                setLiked(false)
                setLikeCount(likeCount -1)
            } else if (res.status === 201) {
                setLiked(true)
                setLikeCount(likeCount +1)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='like-container'>
			{liked === false && <img src="" onClick={handleLike} alt="like" />}
			{liked && <img src="" onClick={handleLike} alt="unlike" />}
            ♡
            <span>{likeCount}</span>
        </div>
    );
};

export default Like;