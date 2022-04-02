import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm'

const SignupForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault();

      // const terms = document.getElementById('terms').style.color="green"
      const termsError = document.querySelector('.terms.error')
      const firstNameError = document.querySelector('p.firstName.error')
      const lastNameError = document.querySelector('p.lastName.error')
      const emailError = document.querySelector('p.email.error')
      const passwordError = document.querySelector('p.password.error')

      // firstNameError.innerHTML = "";
      // lastNameError.innerHTML = "";
      // emailError.innerHTML = "";
      // passwordError.innerHTML = "";
      termsError.innerHTML = "";

      // if (!terms.checked) {
      //     termsError.innerHTML = "Veuillez valider les conditions générales";
      // } else {
        console.log('hello')
        await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
          headers: {
              'Content-Type': 'application/json'
          },
          data: {
              firstName,
              lastName,
              email,
              password,
          },
      })
          .then((res) => {
              console.log('res');
              console.log(res);
              if (res.data.errors) {
                  firstNameError.innerHTML = res.data.errors.firstName;
                  lastNameError.innerHTML = res.data.errors.lastName;
                  emailError.innerHTML = res.data.errors.email;
                  passwordError.innerHTML = res.data.errors.password;
              } else {
                  setFormSubmit(true);
              }
          })
          .catch((err) => console.log(err));
      // }
  }

  return (
    <>
    {formSubmit ? (
        <>
          <LoginForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
      <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="firstName">Prénom</label>
          <br />
          <input
              type="text"
              name='firstName'
              id='firstName'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
          />
          <br />
          <p className="firstName error">Veuillez écrire un prénom</p>
          <br />

          <label htmlFor="lastName">Nom</label>
          <br />
          <input
              type="text"
              name='lastName'
              id='lastName'
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
          />
          <br />
          <p className="lastName error">Veuillez écrire un prénom</p>
          <br />

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

          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
              J'accepte les{" "}
              <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
              </a>
          </label>
          <div className="terms error"></div>
          <br />

          <input type="submit" value="S'inscrire'"/>
      </form>
      )}
    </>
  );
};

export default SignupForm;