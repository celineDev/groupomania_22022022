import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { dateParser } from '../../utils/Functions';
import Comment from './Comment';
import DeletePost from './DeletePost';
import Like from './Like';
import { GET, PUT } from '../../utils/axios'
import edit from './../../assets/icons/edit.svg'
import chat from './../../assets/icons/chat.svg'

// donnée passé en props quand on appelle à chaque fois la carte que l'on a
const Cards = ({ post }) => {
    const uid = useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState('')

    const [posterPicture, setPosterPicture] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLasttName] = useState('')

    const [file, setFile] = useState('')
	const [isUpdated, setIsUpdated] = useState(false);
	const [textUpdate, setTextUpdate] = useState(null);
	const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        const getPosterInfo = async () => {
            try {
                const user = await GET(`api/auth/${post.UserId}`);
                setPosterPicture(user.data.profile)
                setFirstName(user.data.firstName)
                setLasttName(user.data.lastName)

            } catch(err) {
                console.log(err)
            }
        }
        getPosterInfo()

    }, [posterPicture, post.UserId])

    useEffect(() => {
        const isAdmin = async () => {
            try {
                if (uid !== null) {
                    const userId = uid.userId
                    await GET(`api/auth/${userId}`);
                    if (userId === 1) {
                        setIsAdmin(true)
                    } else {
                        setIsAdmin(false)
                    }
                }
            } catch(err) {
                console.log(err)
            }
        }
        isAdmin()

    }, [uid, isAdmin])

    const updateItem = async () => {
        if (textUpdate) {
            const content = textUpdate
            try {
                await PUT(`api/post/${post.id}`, {content});
                window.location = '/'
            } catch(err) {
                console.log(err)
            }
        }
        setIsUpdated(false);
    }

    const handlePicture = async (e) => {
        e.preventDefault();
        const data = new FormData()
        if (file) {
            data.append("image", file)
        }
        try {
            const res = await axios({
                method: "put",
                baseURL: `http://localhost:3000/api/post/${post.id}`,
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: data,
            });
            console.log('File uploaded', res.data);
            window.location = '/'
        } catch (err) {
            console.error('Failed to upload file', err);
        }
    }

    return (
        <li style={{border: '1px solid black'}} className="card-container" key={post.post_id} id={post.post_id}>
            <div className="header-card">
                <div className="poster">
                    <img className="imageUrl" src={posterPicture} width="50" alt="poster profile" />
                    <h3>{firstName} {lastName}</h3>
                </div>
                <span>{dateParser(post.updatedAt)}</span>
            </div>
            {isUpdated === false && <p>{post.content}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}

            {isUpdated === false && <img src={post.imageUrl} width="200" alt="post illustration" className="card-pic" />}
            {isUpdated && (
              <div className="update-post">
                <input
                    type="file"
                    id='file'
                    name='file'
                    accept='.jpg, .jpeg, .png'
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <br />
                <img src={post.imageUrl} width="200" alt="post illustration" className="card-pic" />
                <div className="button-container">
                  <button className="btn" onClick={handlePicture}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}

            {/* {uid ? (uid.userId === post.UserId) || isAdmin ?  (
                <div className="button-container">
                    <div className="edit-button">
                        <div onClick={() => setIsUpdated(!isUpdated)}>
                            <img src={edit} width="25" alt="edit icon" />
                        </div>
                        {(uid.userId === post.UserId) || isAdmin ? (
                        <div>
                            <DeletePost id={post.id} />
                        </div> ):(null)}
                    </div>
                </div>
            ) :  null  : null  } */}



<div className="button-container">
            {uid ? (uid.userId === post.UserId) ?  (
                    <div className="edit-button">
                        <div onClick={() => setIsUpdated(!isUpdated)}>
                            <img src={edit} width="25" alt="edit icon" />
                        </div>
                    </div>
                        ) :  null  : null  }
                    <div>
                        {uid ? (uid.userId === post.UserId) || isAdmin ? (
                        <div>
                            <DeletePost id={post.id} />
                        </div> 
                        ):null : null}

                    </div>
            </div>












            <div className='card-footer'>
                <Like post={post}/>
                <div className='comment-icon'>
                    <img src={chat} width="25" alt="comment" onClick={() => setShowComments(!showComments)} />
                    {/* <span>{post.comment.length}</span> */}
                </div>
                {showComments && <Comment post={post} />}
                {/* <Comment /> */}
            </div>
        </li>
    );
};

export default Cards;
