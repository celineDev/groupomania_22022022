import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./../../UserContext";
import UploadImg from "./UploadImg";
import UserInfo from "./UserInfo";
import { GET } from '../../utils/axios'

const UpdateProfile = () => {
	const userId = useContext(UserContext);
	const [userProfile, setUserProfile] = useState()
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();

    const  uid = userId.userId

	// user info
	useEffect(() => {
		const getUserInfo = async () => {
			await GET(`api/auth/${uid}`)
				.then((res) => {
					setFirstName(res.data.firstName);
					setLastName(res.data.lastName);
					setUserProfile(res.data.profile);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		getUserInfo();

	}, [uid, firstName, lastName, userProfile]);

	return (
		<>
		{" "}
		<div className="profil-container">
			<h1> Profil de {firstName} {lastName}</h1>
			<div className="picture-part">
				<h3>Photo de profil</h3>
				<UploadImg img={userProfile} uid={uid} />
				{/* <p>{error.maxSize}</p>
				<p>{error.format}</p> */}
			</div>
			<div className="info-part">
				<UserInfo uid={uid} firstName={firstName} lastName={lastName} />
			</div>
		</div>
		</>
	)
};

export default UpdateProfile;