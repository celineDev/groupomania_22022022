import React from 'react';
import Navigation from '../components/Navigation';

const Login = () => {
    return (
        <div>
            <Navigation />
            <h1>LOGIN</h1>
            <form action="">
                <label htmlFor="">Prénom</label>
                <input type="text" />
                <br />
                <label htmlFor="">Nom</label>
                <input type="text" />
                <br />
                <label htmlFor="">Email</label>
                <input type="text" />
                <br />
                <label htmlFor="">Mot de passe</label>
                <input type="text" />
                <br />
                <button>Se connecter</button>
            </form>
        </div>
    );
};

export default Login;