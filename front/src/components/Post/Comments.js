import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { apiRequest } from '../../utils/api';
import { dateParser } from '../../utils/Functions';
import DeleteComment from './DeleteComment';

const Comments = ({ comment }) => {
    const uid = useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState('')

    // check if user is admin
    useEffect(() => {
        const getUserInfo = async () => {
            if (uid !== null) {
                const userId = uid.userId
                await apiRequest.getUser(`${userId}`)
                .then((res) => {
                    const admin = res.data.isAdmin
                    if (admin === true) {
                        setIsAdmin(true)
                    } else {
                        setIsAdmin(false)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
        getUserInfo()

    }, [uid])

    return (
        <div className="comment-container">
            <figure className="comment-left">
                <img className="poster-profile" src={comment.User.profile} alt="poster profile" />
            </figure>
            <div className='comment-right'>
                <div className='comment-info'>
                    <p>{comment.User.firstName} {comment.User.lastName}</p>
                    <p>{dateParser(comment.updatedAt)}</p>
                </div>
                <p>{comment.comment}</p>
            </div>
            {uid ? (uid.userId === comment.UserId) || isAdmin ? (
                <DeleteComment id={comment.id} postId={comment.postId} />
            ):null : null}
        </div>
    );
};

export default Comments;