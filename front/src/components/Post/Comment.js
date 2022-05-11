import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { isEmpty } from '../../utils/Functions';
import { UserContext } from '../../UserContext';
import Comments from './Comments';
import { apiRequest } from '../../utils/api';

const Comment = ({ post }) => {
    const uid = useContext(UserContext)
    const [userPicture, setUserPicture] = useState('')
    const [comment , setComment] = useState('')
    const [comments , setComments] = useState('')

    // trouver le commenteur
    useEffect(() => {
        const getUserInfo = async () => {
            if (uid !== null) {
                const userId = uid.userId
                await apiRequest.getUser(`${userId}`)
                .then((res) => {
                    setUserPicture(res.data.profile)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
        getUserInfo()

    }, [uid, userPicture])

    // create a comment
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/api/post/${post.id}/comment`,
                withCredentials: true,
                data: {
                    comment,
                },
            })
            window.location = "/";
        } catch (err) {
          console.error('echec', err);
        }
    }

    useEffect(() => {
        const getAllComments = async () => {
            await apiRequest.getAllComment(`${post.id}`)
            .then((res) => {
                setComments(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getAllComments()
    }, [post.id])

    return (
        <div className='comment-form-container'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='comment-form'>
                    <figure title='Profil utilisateur' className='new card-header'>
                        <img className='nav-profile' src={userPicture ? userPicture : "./images/img/profile.png"} width='50px' alt="profil de l'utilisateur" />
                    </figure>
                    <input
                        className='rounded-input'
                        type="text"
                        name='comment'
                        id='comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Ajouter un commentaire...'
                    />
                </div>
                {comment ? (
                    <input className='rounded-input' type="submit" value="Publier" />
                ) : null}
            </form>
            <section className='thread-container'>
                {!isEmpty(comments[0]) &&
                    comments.map((comment) => {
                        return <Comments comment={comment} key={comment.id} />;
                    })
                }
            </section>
        </div>
    );
};

export default Comment;