import React from 'react';
import { DELETE } from '../../utils/axios'
import trash from './../../assets/icons/trash.svg'

const DeletePost = (props) => {

    const destroyPost = () => {
        DELETE(`api/post/${props.id}`)
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
            <img title='Supprimer' src={trash} width="25" alt="trash icon" />
        </figure>
    );
};

export default DeletePost;
