import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
  };

  const logout = async () => {
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
            withCredentials: true,
        })
        .then(() => {
            removeCookie("jwt")
            sessionStorage.clear()
        })
        .catch((err) => console.log(err));

        window.location = "/";
  };

    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
    );
};

export default Logout;