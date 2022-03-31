import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { isEmpty, timestampParser } from './../Utils'

const NewPostForm = () => {
    const uid =  useContext(UserContext)
    const [userPicture, setUserPicture] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [message, setMessage] = useState('')
    const [postPicture, setPostPicture] = useState('')
    const [video, setVideo] = useState('')
    const [file, setFile] = useState('')

    useEffect(() => {
        const getUserInfo = async () => {
            if (uid !== null) {
                const userId = uid.userId
                await axios ({
                    method: "get",
                    url: `http://localhost:3000/api/auth/${userId}`,
                    withCredentials: true,
                })
                .then((res) => {
                    setFirstName(res.data.first_name)
                    setLastName(res.data.last_name)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
        getUserInfo()

        if(firstName, lastName);
    }, [uid, firstName, lastName])

    const handlePost = async () => {
        if (message || postPicture || video) {
            const formData = new FormData()
            formData.append("UserId", uid.userId)
            formData.append("content", message)
            // formData.append("video", video)
            if (file) formData.append("imageUrl", file)

            console.log(message)
            const UserId = uid.userId
            const content = message

            axios({
                method: "post",
                baseURL: `http://localhost:3000/api/post`,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {UserId, content,}
            })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            // cancelPost()
        } else {
            alert("Veuillez entrer un message")
        }
    }

    const handlePicture = () => {}

    const cancelPost = () => {
        setMessage('')
        setPostPicture('')
        setVideo('')
        setFile('')
    }

    return (
        <div className='post-container' style={{border: "1px solid black"}}>
            <NavLink to="/profile">
                <div className='user-info'>
                    <img src="images/uploads/profile.jpg" width="50px" alt="profil de l'utilisateur" />
                    <p>{firstName} {lastName} is connected</p>
                </div>
            </NavLink>
            <div className='post-form'>
                <textarea
                    type="text"
                    name="message"
                    id="message"
                    cols="50"
                    rows="5"
                    placeholder='Quoi de neuf ?'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                ></textarea>
            </div>

            <div className='footer-form'>
                <div className='icon'>
                    {isEmpty(video) && (
                        <>
                        <img src="" alt="icone paysage" />
                        <input
                            type="file"
                            id='file-upload'
                            name='file'
                            accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture()}
                        />
                        </>
                    )}
                    {video && (
                        <button onClick={(e) => setVideo('')}>Supprimer vidéo</button>
                    )}
                </div>
                <div className='btn-send'>
                    {message || postPicture || video.length > 20 ? (
                        <button className='cancel' onClick={(e) => cancelPost()}>Annuler</button>
                    ) : null}
                    <button className='send' onClick={(e) => handlePost()}>Envoyer</button>
                </div>
            </div>
        </div>
    );
};

export default NewPostForm;