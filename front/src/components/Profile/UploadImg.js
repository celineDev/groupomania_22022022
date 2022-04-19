import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GET } from '../../utils/axios'

const UploadImg = ({ uid }) => {
    const [file, setFile] = useState('')
    const [userProfile, setUserProfile] = useState(false)

    useEffect(() => {
        const getUserInfo = async () => {
            await GET (`api/auth/${uid}`)
            .then((res) => {
                setUserProfile(res.data.profile)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getUserInfo()

    }, [uid, userProfile])

    const handlePicture = async (e) => {
        e.preventDefault();
        const data = new FormData()
        if (file) {
            data.append("image", file)
        }

        try {
            const res = await axios({
                method: "put",
                baseURL: `http://localhost:3000/api/auth/${uid}`,
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: data,
            });
            console.log('File uploaded', res.data);
            window.location = '/profile'
        } catch (err) {
            console.error('Failed to upload file', err);
        }
    }

    return (
        <div className='profil-picture'>
            <div className='profil-img'>
                <img className='profil-pic' src={userProfile ? userProfile : "./images/img/profile.jpg"} width='100px' alt="profil" />
            </div>
            <form action="" onSubmit={handlePicture} className="upload-pic">
                <input
                    type="file"
                    id='file'
                    name='file'
                    accept='.jpg, .jpeg, .png'
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <input className='changer-pic' type="submit" value="Changer photo de profil" />
            </form>
        </div>
    );
};

export default UploadImg;