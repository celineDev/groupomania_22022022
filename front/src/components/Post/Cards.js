import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { dateParser } from '../Utils';
import Comment from './Comment';
import DeletePost from './DeletePost';
import Like from './Like';

// donnée passé en props quand on appelle à chaque fois la carte que l'on a
const Cards = ({ post }) => {
    const uid = useContext(UserContext)
    // const [isAdmin, setIsAdmin] = useState('')

    const [posterPicture, setPosterPicture] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLasttName] = useState('')

    const [file, setFile] = useState('')
	const [isUpdated, setIsUpdated] = useState(false);
	const [textUpdate, setTextUpdate] = useState(null);
	const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        const getPosterInfo = async () => {
            await axios({
                method: "get",
                url: `http://localhost:3000/api/auth/${post.UserId}`,
                withCredentials: true,
            })
            .then((res) => {
                setPosterPicture(res.data.profile)
                setFirstName(res.data.firstName)
                setLasttName(res.data.lastName)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getPosterInfo()

        if(posterPicture);
    }, [posterPicture, post.UserId])

    const updateItem = () => {
        if (textUpdate) {
            console.log('textupdate', textUpdate)
            const content = textUpdate
            console.log('content', content)
            axios({
                method: 'put',
                baseURL: `http://localhost:3000/api/post/${post.id}`,
                withCredentials: true,
                data: {
					content,
				},
            })
            .then((res) => {
                console.log(res.err)
                if (res.err) {
                    console.log(res.err)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
        setIsUpdated(false);
    }

    const handlePicture = async (e) => {
        e.preventDefault();
        const data = new FormData()
        if (file) {
            data.append("image", file)
        }
        console.log('data', data)
        console.log('file', file)

        try {
            const res = await axios({
                method: "put",
                baseURL: `http://localhost:3000/api/post/${post.id}`,
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: data,
            });
            console.log('File uploaded', res.data);
        } catch (err) {
            console.error('Failed to upload file', err);
        }
    }

    return (
        <li style={{border: '1px solid black'}} className="card-container" key={post.post_id} id={post.post_id}>
            <div className="header-card">
                <div className="poster">
                    <img className="imageUrl" src={posterPicture} width="50px" alt="poster profile" />
                    <h3>
                        {firstName} {lastName}
                    </h3>
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

            {isUpdated === false && <img src={post.imageUrl} width="200px" alt="card-pic" className="card-pic" />}
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
                <img src={post.imageUrl} width="200px" alt="card-pic" className="card-pic" />
                <div className="button-container">
                  <button className="btn" onClick={handlePicture}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}

            {uid ? uid.userId === post.UserId ?  (
                <div className="button-container">
                    <div className="edit-button">
                        <div onClick={() => setIsUpdated(!isUpdated)}>
                            <img src="" alt="edit icon" />
                        </div>
                        <DeletePost id={post.id} />
                    </div>
                </div>
            ) :  null  : null }
            <div className='card-footer'>
                <Like post={post}/>
                <div className='comment-icon'>
                    <img src="" alt="comment" onClick={() => setShowComments(!showComments)} />
                    {/* <span>{post.comment.length}</span> */}
                </div>
                {showComments && <Comment post={post} />}
                {/* <Comment /> */}
            </div>
        </li>
    );
};

export default Cards;
