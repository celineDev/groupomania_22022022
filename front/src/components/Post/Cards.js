import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { dateParser, isEmpty } from '../Utils';

// donnée passé en props quand on appelle à chaque fois la carte que l'on a
const Cards = ({ post }) => {
    const uid = useContext(UserContext)

    const [posterPicture, setPosterPicture] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLasttName] = useState('')

	const [isUpdated, setIsUpdated] = useState(false);
	const [textUpdate, setTextUpdate] = useState();
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
                setFirstName(res.data.first_name)
                setLasttName(res.data.last_name)
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
                    <img className="imageUrl" src={posterPicture} alt="poster profile picture" />
                    <h3>
                        {firstName} {lastName}
                    </h3>
                </div>
                <span>{dateParser(post.updatedAt)}</span>
            </div>
            {isUpdated === false && <p>{post.content}</p>}
            {post.imageUrl && (
              <img src={post.imageUrl} width="200px" alt="card-pic" className="card-pic" />
            )}
        </li>
    );
};

export default Cards;