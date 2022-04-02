import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { dateParser } from '../Utils';
import DeletePost from './DeletePost';

// donnée passé en props quand on appelle à chaque fois la carte que l'on a
const Cards = ({ post }) => {
    const uid = useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState('')

    const [posterPicture, setPosterPicture] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLasttName] = useState('')

	const [isUpdated, setIsUpdated] = useState(false);
	// const [textUpdate, setTextUpdate] = useState();
	// const [showComments, setShowComments] = useState(false);

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

    return (
        <li style={{border: '1px solid black'}} className="card-container" key={post.post_id} id={post.post_id}>
            <div className="header-card">
                <div className="poster">
                    <img className="imageUrl" src={posterPicture} alt="poster profile" />
                    <h3>
                        {firstName} {lastName} {isAdmin} {lastName}
                    </h3>
                </div>
                <span>{dateParser(post.updatedAt)}</span>
            </div>
            {isUpdated === false && <p>{post.content}</p>}
            {post.imageUrl && (
              <img src={post.imageUrl} width="200px" alt="card-pic" className="card-pic" />
            )}
            {post.video && <iframe className="video" width="500" height="300" src={post.video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={post.poster_id}></iframe>}
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
            {/* comment  */}
        </li>
    );
};

export default Cards;
