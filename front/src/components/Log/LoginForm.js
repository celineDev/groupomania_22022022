import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();

        const emailError = document.querySelector('p.email.error')
        const passwordError = document.querySelector('p.password.error').style.color="red"

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
        .then((res) => {
            console.log(res)
            if (res.data.error) {
                emailError.innerHTML = res.data.error.email;
                passwordError.innerHTML = res.data.error.password;
            } else {
                console.log(res.data);
                // window.location = '/';
                // return res.data;
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <form action="" onSubmit={handleLogin} id="login-form">
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <br />
            <p className="email error">Veuillez rentrer un email valide</p>
            <br />

            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="text"
                name='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <br />
            <p className="password error">Veuillez renseigner un mot de passe</p>
            <br />

            <input type="submit" value="Se connecter"/>
        </form>
    );
};

export default LoginForm;