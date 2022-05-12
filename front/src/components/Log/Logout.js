import React from "react";
import { apiRequest } from "../../utils/api";
import cookie from "js-cookie";
import logoutIcon from './../../assets/icons/logoutIcon.svg'

const Logout = () => {
    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
    };

  const logout = async () => {
        await apiRequest.logout()
        .then(() => {
            removeCookie("jwt")
            localStorage.clear()
        })
        .catch((err) => console.log(err));

        window.location = "/";
  };

    return (
        <li tabIndex="0" title="se deconnecter"  className="logout-container" onClick={logout}>
            <img className="logout" src={logoutIcon} width="28" alt="logout" />
        </li>
    );
};

export default Logout;