import React from 'react';
import { axiosInstance } from '../../utils/AxiosConfig'
import trash from './../../assets/icons/trash.svg'

const DeleteComment = (props) => {

    const destroyComment = () => {
        axiosInstance.DELETE(`api/post/${props.postId}/comment/${props.id}`)
        .then(() => {
            const post = document.getElementById(`${props.id}`);
            console.log(post)
            window.location = "/";
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <figure className='comment-trash-icon' onClick={() => {
            if (window.confirm("Supprimer ce message ?")) {
                destroyComment()
            }
        }}>
            <img tabIndex="0" title='Supprimer' src={trash} width="25" alt="trash icon" />
        </figure>
    );
};

export default DeleteComment;
