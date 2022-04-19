import React from 'react';
import { DELETE } from '../../utils/axios'
import trash from './../../assets/icons/trash.svg'

const DeletePost = (props) => {

    const destroyPost = () => {
        DELETE(`api/post/${props.id}`)
        .then((res) => {
            console.log(res)
            if (res.err) {
                console.log(res.err);
            }
            const post = document.getElementById(`${props.id}`);
            console.log(post)
            window.location = "/";
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div onClick={() => {
            if (window.confirm("Supprimer cet article ?")) {
                destroyPost()
            }
        }}>
            <img src={trash} width="25px" alt="trash icon" />
        </div>
    );
};

export default DeletePost;
