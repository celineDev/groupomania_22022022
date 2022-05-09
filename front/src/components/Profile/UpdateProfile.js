import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./../../UserContext";
import UploadImg from "./UploadImg";
import UserInfo from "./UserInfo";
import { apiRequest } from "../../utils/api";

const UpdateProfile = () => {
	const userId = useContext(UserContext);
	const [userProfile, setUserProfile] = useState()
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();

    const  uid = userId.userId

	useEffect(() => {
		const getUserInfo = async () => {
			await apiRequest.getUser(`${uid}`)
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
		<section className="profile-container">
			<h1> Profil de {firstName} {lastName}</h1>
			<UploadImg userProfile={userProfile} uid={uid} />
			<UserInfo uid={uid} firstName={firstName} lastName={lastName} />
		</section>
	)
};

export default UpdateProfile;