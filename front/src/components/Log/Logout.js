import React from "react";
import { POST } from '../../utils/axios'
import cookie from "js-cookie";
import logoutIcon from './../../assets/icons/logoutIcon.svg'

const Logout = () => {
    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
    };

  const logout = async () => {
        await POST(`api/auth/logout`)
        .then(() => {
            removeCookie("jwt")
            sessionStorage.clear()
        })
        .catch((err) => console.log(err));

        window.location = "/";
  };

    return (
        <li title="se deconnecter"  className="logout-container" onClick={logout}>
            <img className="logout" src={logoutIcon} width="28" alt="logout" />
        </li>
    );
};

export default Logout;