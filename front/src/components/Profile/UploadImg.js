import React from 'react';
import { apiRequest } from '../../utils/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import *  as yup from 'yup'
import uploads from './../../assets/icons/uploads.svg'

const schema = yup
    .object()
    .shape({
    profile: yup
        .mixed()
        .test('required', "Fichier requis", (value) =>{
            return value && value.length
        })
        .test("fileSize", "Fichier trop large", (value) => {
            return value && value[0] && value[0].size <= 200000;
        })
        .test("type", "Le format doit être .jpg, .jpeg ou .png", (value) => {
            return value && value[0] && (
                value[0].type === "image/jpeg" ||
                value[0].type === "image/jpg" ||
                value[0].type === "image/png"
            );
        })
    })
    .required()

    const UploadImg = ({ userProfile, uid}) => {
        const { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(schema),
    });

    const onSubmit = async file => {
        const newData = new FormData()
        if (file) {
            newData.append("image", file.profile[0])
        }
        try {
            const res = await apiRequest.updateUser(`${uid}`,newData);
            console.log('File uploaded', res.data);
            window.location = '/profile'
        } catch (err) {
            console.error('Failed to upload file', err);
        }
    }

    return (
        <div className='profile-picture'>
            <figure>
                <img className='profile-pic' src={userProfile ? userProfile : "./images/img/profile.png"} alt="profile" />
            </figure>
            <form onSubmit={handleSubmit(onSubmit)} className="upload-picture">
                <input
                    type="file"
                    id='file'
                    name='file'
                    accept='.jpg, .jpeg, .png'
                    {...register('profile', { required: true })}
                />
                <label className='file-input__label' htmlFor="file">
                    <img className='svg' src={uploads} alt="upload" />
                    Modifier photo de profil
                </label>
                <p className="error">{errors.profile ? <span>{errors.profile.message} </span> : null }</p>
                <input className='new-picture' type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default UploadImg;