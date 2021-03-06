import Cookies from 'js-cookie';
import React, { useState } from 'react';
import edit from './../../assets/icons/edit.svg'
import { apiRequest } from '../../utils/api';

const UserInfo = ({ uid, firstName, lastName }) => {
    const [isUpdated, setIsUpdated] = useState(false);
    const [firstNameUpdate, setFirstNameUpdate] = useState(false);
    const [lastNameUpdate, setLastNameUpdate] = useState(false);

    const handleUpdate = async () => {
        if (firstNameUpdate || lastNameUpdate) {
            const data = new FormData()
            data.append ('firstName', firstNameUpdate || firstName)
            data.append ('lastName', lastNameUpdate || lastName)
            apiRequest.updateUser(`${uid}`, data)
            .then((res) => {
                console.log(res)
                window.location = '/profile'
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const cancelPost=()=>{
        window.location = '/profile'
    }

    const removeCookie = (key) => {
        if (window !== "undefined") {
            Cookies.remove(key, { expires: 1 })
        }
    }

    const deleteAccount = () => {
        apiRequest.deleteUser(`${uid}`)
        .then(() => {
            removeCookie("jwt")
            localStorage.clear()
            window.location = "/"
        })
        .catch((err) => console.log(err))
    }

    return (
        <form className="user-update">
            {isUpdated === false &&
                <input
                aria-label="Prénom"
                type="text"
                placeholder='Prénom'
                defaultValue={firstName}
                disabled="disabled"
            />
            }
            {isUpdated === false &&
            <input
            aria-label="Nom"
                type="text"
                placeholder='Nom'
                defaultValue={lastName}
                disabled="disabled"
            />
            }
            {isUpdated && (
                <div className="update-post">
                    <input
                    aria-label="Prénom"
                        type="text"
                        defaultValue={firstName}
                        onChange={(e) => setFirstNameUpdate(e.target.value)}
                    />
                    <input
                    aria-label="Nom"
                        type="text"
                        defaultValue={lastName}
                        onChange={(e) => setLastNameUpdate(e.target.value)}
                    />
                    <div className="button-container">
                        <button className='cancel-btn' onClick={(e) => cancelPost()}>Annuler</button>
                        <button className="validate-btn" onClick={handleUpdate}>Valider modification</button>
                    </div>
                </div>
            )}
            <figure className="edit-button" onClick={() => setIsUpdated(!isUpdated)}>
                <img tabIndex="0" title='modifier' src={edit} width="25" alt="edit icon" />
            </figure>
            <p tabIndex="0" id="deleteAccount"
                onClick={() => {
                    if (window.confirm("Voulez vous supprimer votre compte?")) {
                        deleteAccount();
                    }
                }}>
                    Supprimer le compte
            </p>
        </form>
    );
};

export default UserInfo;