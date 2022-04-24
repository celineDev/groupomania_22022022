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
import uploads from './../../assets/icons/uploads.svg'

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

    const cancelPost=()=>{
        window.location = '/'
    }

    return (
        <article className="card-container" key={post.post_id} id={post.post_id}>
            <figure className="card-header">
                <img className="poster-profile" src={posterPicture} alt="poster profile" />
                <figcaption>
                    <h2>{firstName} {lastName}</h2>
                    <p>{dateParser(post.updatedAt)}</p>
                </figcaption>
            </figure>
            <div className='cart-main'>
                {isUpdated === false && <p>{post.content}</p>}
                {isUpdated && (
                <div className="update-post">
                    <textarea
                    defaultValue={post.content}
                    onChange={(e) => setTextUpdate(e.target.value)}
                    />
                    <div className="button-container">
                        <button className='cancel-btn' onClick={(e) => cancelPost()}>Annuler</button>
                        <button className="validate-btn" onClick={updateItem}>Valider modification</button>
                    </div>
                </div>
                )}

                {isUpdated === false && <img src={post.imageUrl} alt="post illustration" className="card-pic" />}
                {isUpdated && (
                <div className="update-post">
                    <img src={post.imageUrl} alt="post illustration" className="card-pic" />
                    <input
                        type="file"
                        id='file'
                        name='file'
                        accept='.jpg, .jpeg, .png'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label className='file-input__label' htmlFor="file">
                        <img className='svg' src={uploads} alt="upload" />
                        Modifier l'image
                    </label>
                    <div className="button-container">
                        <button className='cancel-btn' onClick={(e) => cancelPost()}>Annuler</button>
                        <button className="validate-btn" onClick={handlePicture}>Valider modification</button>
                    </div>
                </div>
                )}
            </div>

            <div className="btn-container">
            {uid ? (uid.userId === post.UserId) ?  (
                <figure title='Modifier' className="edit-button" onClick={() => setIsUpdated(!isUpdated)}>
                    <img src={edit} width="25" alt="edit icon" />
                </figure>
                ) :  null  : null  }
                {uid ? (uid.userId === post.UserId) || isAdmin ? (
                    <DeletePost id={post.id} />
                ):null : null}
            </div>

            <div className='card-footer'>
                <Like post={post}/>
                <figure className='comment-icon'>
                    <img src={chat} width="25" alt="comment" onClick={() => setShowComments(!showComments)} />
                    {/* <figcaption>{post.comment.length}</figcaption> */}
                </figure>
                {showComments && <Comment post={post} />}
                {/* <Comment /> */}
            </div>
        </article>
    );
};

export default Cards;
