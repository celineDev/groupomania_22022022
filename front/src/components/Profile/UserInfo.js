import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const UserInfo = ({ uid }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const [isUpdated, setIsUpdated] = useState(false);
    const [firstNameUpdate, setFirstNameUpdate] = useState(false);
    const [lastNameUpdate, setLastNameUpdate] = useState(false);

    useEffect(() => {
		const getUserInfo = async () => {
			await axios({
				method: "get",
				url: `http://localhost:3000/api/auth/${uid}`,
				headers: {
					'Content-Type': 'application/json'
				},
				withCredentials: true,
			})
				.then((res) => {
                    setFirstName(res.data.firstName)
                    setLastName(res.data.lastName)
					console.log(res)
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getUserInfo();

	}, [uid, firstName, lastName]);

    console.log(firstName)

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
                console.log(res.err)
                if (res.err) {
                    console.log(res.err)
                }
                window.location = '/profile'
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const cancelPost=()=>{window.location = '/profile'}

    const removeCookie = (key) => {
        if (window !== "undefined") {
            Cookies.remove(key)
        }
    }

    const deleteAccount = () => {
        axios({
            method: "delete",
            baseURL: `http://localhost:3000/api/auth/${uid}`,
            withCredentials: true,
        })
        .then(() => {
            removeCookie("jwt")
            sessionStorage.clear()
            window.location = "/"
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className='user-info'>
            <div className="firstname-update">
                {isUpdated === false && <p>{firstName}</p>}
                {isUpdated === false && <p>{lastName}</p>}
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
                            <button className='cancel' onClick={(e) => cancelPost()}>Annuler</button>
                            <button className="btn" onClick={handleUpdate}>Valider modification</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="button-container">
                <div className="edit-button">
                    <button onClick={() => setIsUpdated(!isUpdated)}>
                        <img src="" alt="edit icon" />
                    </button>
                </div>
            </div>
            <div id="deleteAccount"
                onClick={() => {
					if (window.confirm("Voulez vous désactiver votre compte?")) {
						deleteAccount();
					}
				}}>
				Supprimer le compte
			</div>
        </div>
    );
};

export default UserInfo;