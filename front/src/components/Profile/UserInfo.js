import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Logout from '../Log/Logout';

const UserInfo = ({ uid }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [updateForm, setUpdateForm] = useState(false);

    // useEffect(() => {
	// 	const getUserInfo = async () => {
	// 		await axios({
	// 			method: "get",
	// 			url: `http://localhost:3000/api/auth/${uid}`,
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			withCredentials: true,
	// 		})
	// 			.then((res) => {
	// 				console.log(res)
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	};
	// 	getUserInfo();

	// }, [uid, firstName, lastName]);

    const handleUpdate = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('firstName', firstName)
        data.append('lastName', lastName)

		await axios({
			method: "put",
			baseURL: `http://localhost:3000/api/auth/${uid}`,
			headers: {
				'Content-Type': 'application/json'
			},
            withCredentials: true,
			data: data,
		})
        .then((res) => {
            console.log(res.err)
            if (res.err) {
                console.log(res.err)
            }
        })
        .catch((err) => {
            console.log(err)
        })
		setUpdateForm(false)
    }

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
        })
        .catch((err) => console.log(err))
        window.location = "/"
    }

    return (
        <div className='user-info'>
            <div className="firstname-update">
                <h3>Prénom {firstName}</h3>
                {updateForm === false && (
                <>
                    <p onClick={() => setUpdateForm(!updateForm)}>{firstName}</p>
                    <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier prénom
                    </button>
                </>
                )}
                {updateForm && (
                <>
                    <textarea
                    type="text"
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    ></textarea>
                    <button onClick={handleUpdate}>Valider modifications</button>
                </>
                )}
            </div>
            <div className="lastname-update">
                <h3>Nom {lastName}</h3>
                {updateForm === false && (
                <>
                    <p onClick={() => setUpdateForm(!updateForm)}>{lastName}</p>
                    <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier nom
                    </button>
                </>
                )}
                {updateForm && (
                <>
                    <textarea
                    type="text"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    ></textarea>
                    <button onClick={handleUpdate}>Valider modifications</button>
                </>
                )}
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