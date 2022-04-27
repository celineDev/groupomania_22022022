import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { GET } from '../../utils/axios'
import landscape from './../../assets/icons/landscape.svg'

const NewPostForm = () => {
    const uid =  useContext(UserContext)
    const [userPicture, setUserPicture] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [message, setMessage] = useState('')
    const [postPicture, setPostPicture] = useState('')
    const [file, setFile] = useState('')

    useEffect(() => {
        const getUserInfo = async () => {
            if (uid !== null) {
                const userId = uid.userId
                await GET (`api/auth/${userId}`)
                .then((res) => {
                    setFirstName(res.data.firstName)
                    setLastName(res.data.lastName)
                    setUserPicture(res.data.profile)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
        getUserInfo()

    }, [uid, firstName, lastName])

    const handlePost = async () => {
        if (message || postPicture) {
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
                window.location = '/'
            } catch (err) {
                console.error('Failed to upload file', err);
            }
            cancelPost()
        } else {
            alert("Veuillez entrer un message")
        }
    }

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    const cancelPost = () => {
        setMessage('')
        setPostPicture('')
        setFile('')
    }

    return (
        <form className='post-container' >
            <h2 className='h1'>Créer un post</h2>
            <NavLink to="/profile">
                <figure title='Profil utilisateur' className='new card-header'>
                    <img className='nav-profile' src={userPicture ? userPicture : "./images/img/profile.png"} width='50px' alt="profil de l'utilisateur" />
                    <h3 className='h2'>{firstName} {lastName}</h3>
                </figure>
            </NavLink>
            <div className='post-form'>
                <textarea
                    type="text"
                    name="message"
                    id="message"
                    cols="50"
                    rows="5"
                    placeholder="Quoi de neuf ?"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                ></textarea>
                {postPicture && <img src={postPicture} alt="preview" className="img-preview" />}
            </div>

            <div className='footer-form'>
                <div className='icon'>
                    <input
                        type="file"
                        id='file-upload'
                        name='file'
                        accept='.jpg, .jpeg, .png'
                        onChange={(e) => handlePicture(e)}
                    />
                    <label className='file-input__label' htmlFor="file-upload">
                        <img className='svg' src={landscape} alt="upload icone paysage" />
                        Ajouter une l'image
                    </label>
                </div>
                <div className='new button-container'>
                    {message || postPicture ? (
                        <button className='new cancel-btn' onClick={(e) => cancelPost()}>Annuler</button>
                    ) : null}
                    <button className='new validate-btn' onClick={(e) => handlePost()}>Envoyer</button>
                </div>
            </div>
        </form>
    );
};

export default NewPostForm;