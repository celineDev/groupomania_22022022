import axios from 'axios';
import React from 'react';

const DeletePost = (props) => {

    const destroyPost = () => {
        axios({
            method: "delete",
            baseURL: `http://localhost:3000/api/post/${props.id}`,
            withCredentials: true,
        })
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
        Supprimer
        </div>
    );
};

export default DeletePost;
