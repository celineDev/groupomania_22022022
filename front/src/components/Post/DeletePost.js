import React from 'react';
import { apiRequest } from '../../utils/api';
import trash from './../../assets/icons/trash.svg'

const DeletePost = (props) => {

    const destroyPost = () => {
        apiRequest.deletePost(`${props.id}`)
        .then(() => {
            document.getElementById(`${props.id}`);
            window.location = "/";
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <figure className='trash-icon' onClick={() => {
            if (window.confirm("Supprimer cet article ?")) {
                destroyPost()
            }
        }}>
            <img title='Supprimer' tabIndex="0" src={trash} width="25" alt="trash icon" />
        </figure>
    );
};

export default DeletePost;
