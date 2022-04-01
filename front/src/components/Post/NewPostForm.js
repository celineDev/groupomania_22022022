import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { isEmpty } from './../Utils'

const NewPostForm = () => {
    const uid =  useContext(UserContext)
    // const [userPicture, setUserPicture] = useState('')
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

    }, [uid, firstName, lastName])

    const handlePost = async () => {
        if (message || postPicture || video) {
            const data = new FormData();
            data.append("UserId", uid.userId);
            data.append("content", message);
            if (file) {
                data.append("image", file);
            }

            try {
                const res = await axios({
                    method: "post",
                    baseURL: `http://localhost:3000/api/post`,
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: data,
                });
                console.log('File uploaded', res.data);
            } catch (err) {
                console.error('Failed to upload file', err);
            }
        } else {
            alert("Veuillez entrer un message")
        }
    }

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        // setVideo('')
    }

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
                    <img src="uploads/profile.jpg" width="50px" alt="profil de l'utilisateur" />
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
                <img src={postPicture} alt="" className="img-preview" width="200px" />
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
                            accept='.jpg, .jpeg, .png'
                            onChange={(e) => handlePicture(e)}
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