import React, { useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Log = ( props) => {
    const [signUpModal, setSignUpModal] = useState(props.signup)
    const [loginModal, setLoginModal] = useState(props.login)

    const handleModals = (e) => {
        if (e.target.id === 'register') {
            setLoginModal(false);
            setSignUpModal(true);
        } else if (e.target.id === 'login') {
            setLoginModal(true);
            setSignUpModal(false);
        }
    }

    return (
        <div className='connection-form'>
            <div className="form-container">
                <ul>
                    <li
                    onClick={handleModals}
                    id='register'
                    className={signUpModal ? 'active-btn' : null}
                    >
                        S'inscrire
                    </li>
                    <li
                    onClick={handleModals}
                    id='login'
                    className={loginModal ? 'active-btn' : null}
                    >
                        Se connecter
                    </li>
                </ul>
                {signUpModal && <SignupForm />}
                {loginModal && <LoginForm />}
            </div>
        </div>
    );
};

export default Log;