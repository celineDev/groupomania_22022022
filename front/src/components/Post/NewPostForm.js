import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { apiRequest } from '../../utils/api';
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
                await apiRequest.getUser(`${userId}`)
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

    const handlePost = async (e) => {
        e.preventDefault()
        if (message || postPicture) {
            const data = new FormData();
            data.append("UserId", uid.userId);
            data.append("content", message);
            if (file) {
                data.append("image", file);
            }

            try {
                const res = await apiRequest.createPost(data)
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
            <h1 className='h1'>Créer un post</h1>
            <figure title='Profil utilisateur' className='new card-header'>
                <img className='nav-profile' src={userPicture ? userPicture : "./images/img/profile.png"} width='50px' alt="profil de l'utilisateur" />
                <h2 tabIndex="0" className='h2'>{firstName} {lastName}</h2>
            </figure>
            <div className='post-form'>
                <textarea
                    aria-label="Ecrire un post"
                    type="text"
                    name="message"
                    id="message"
                    cols="50"
                    rows="5"
                    placeholder="Quoi de neuf ?"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                ></textarea>
                {postPicture && <img src={postPicture} alt="preview" tabIndex="0" className="img-preview" />}
            </div>

            <div className='footer-form'>
                <div className='icon'>
                    <input
                        aria-label="Ajouter une image"
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
                    <button className='new validate-btn' onClick={(e) => handlePost(e)}>Envoyer</button>
                </div>
            </div>
        </form>
    );
};

export default NewPostForm;