import React, { useContext, useEffect, useState } from 'react';
import emptyHeart from './../../assets/icons/emptyHeart.svg'
import { UserContext } from '../../UserContext';
import { GET, POST } from '../../utils/axios'

const Like = ({ post }) => {
    const uid = useContext(UserContext)
    const [liked, setLiked] = useState('false')
    const [likeCount, setLikeCount] = useState('')

    // number of likes
    useEffect(() => {
        const likeCount = async () => {
            await GET(`api/post/${post.id}/like`)
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
        POST(`api/post/${post.id}/like`, { uid })
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
			{liked === false && <img src={emptyHeart} width="25px" onClick={handleLike} alt="like" />}
			{liked && <img src={emptyHeart} width="25px" onClick={handleLike} alt="unlike" />}
            <span>{likeCount}</span>
        </div>
    );
};

export default Like;