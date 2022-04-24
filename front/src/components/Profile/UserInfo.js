import axios from 'axios'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { GET, DELETE } from '../../utils/axios'
import edit from './../../assets/icons/edit.svg'

const UserInfo = ({ uid }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const [isUpdated, setIsUpdated] = useState(false);
    const [firstNameUpdate, setFirstNameUpdate] = useState(false);
    const [lastNameUpdate, setLastNameUpdate] = useState(false);

    useEffect(() => {
		const getUserInfo = async () => {
			await GET(`api/auth/${uid}`)
				.then((res) => {
                    setFirstName(res.data.firstName)
                    setLastName(res.data.lastName)
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getUserInfo();

	}, [uid, firstName, lastName]);

    const handleUpdate = async () => {
        if (firstNameUpdate || lastNameUpdate) {
            const data = new FormData()
            data.append ('firstName', firstNameUpdate || firstName)
            data.append ('lastName', lastNameUpdate || lastName)
            axios({
                method: 'put',
                baseURL: `http://localhost:3000/api/auth/${uid}`,
                withCredentials: true,
                data: data,
            })
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
            Cookies.remove(key)
        }
    }

    const deleteAccount = () => {
        DELETE(`api/auth/${uid}`)
        .then(() => {
            removeCookie("jwt")
            sessionStorage.clear()
            window.location = "/"
        })
        .catch((err) => console.log(err))
    }

    return (
        <form className="user-update">
            {isUpdated === false &&
                <input
                type="text"
                placeholder='Prénom'
                defaultValue={firstName}
                disabled="disabled"
            />
            }
            {isUpdated === false &&
            <input
                type="text"
                placeholder='Nom'
                defaultValue={lastName}
                disabled="disabled"
            />
            }
            {isUpdated && (
                <div className="update-post">
                    <input
                        type="text"
                        defaultValue={firstName}
                        onChange={(e) => setFirstNameUpdate(e.target.value)}
                    />
                    <input
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
                <img title='modifier' src={edit} width="25" alt="edit icon" />
            </figure>
            <p id="deleteAccount"
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