import React, { useContext, useEffect, useState } from 'react';
import emptyHeart from './../../assets/icons/emptyHeart.svg'
import filledHeart from './../../assets/icons/filledHeart.svg'
import { UserContext } from '../../UserContext';
import { axiosInstance } from '../../utils/AxiosConfig'
import { NavLink } from 'react-router-dom';

const Like = ({ post }) => {
    const uid = useContext(UserContext)
    const [liked, setLiked] = useState('false')
    const [likeCount, setLikeCount] = useState('')

    // number of likes
    useEffect(() => {
        const likeCount = async () => {
            await axiosInstance.GET(`api/post/${post.id}/like`)
            .then((res) => {
                setLikeCount(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        likeCount()

    }, [uid, post.id])

    const handleLike = () => {
        axiosInstance.POST(`api/post/${post.id}/like`, { uid })
        .then((res) => {
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
        <figure className='like-container'>
            {uid ? (
                <div>
                    {liked === false && <img  title='liker' src={emptyHeart} width="25" onClick={handleLike} alt="bouton like" />}
                    {liked && <img title='unliker' src={filledHeart} width="25" onClick={handleLike} alt="bouton unlike" />}
                </div>
            ) : (
                <NavLink activeclassname="active" to='/profile'>
                    <img src={emptyHeart} width="25" alt="login" />
                </NavLink>
            )}
            <figcaption>{likeCount}</figcaption>
        </figure>
    );
};

export default Like;