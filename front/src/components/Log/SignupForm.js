import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm'

const SignupForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault();

      // const terms = document.getElementById('terms').style.color="green"
      const termsError = document.querySelector('.terms.error')
      const firstNameError = document.querySelector('p.first_name.error')
      const lastNameError = document.querySelector('p.last_name.error')
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
              first_name,
              last_name,
              email,
              password,
          },
      })
          .then((res) => {
              console.log('res');
              console.log(res);
              if (res.data.errors) {
                  firstNameError.innerHTML = res.data.errors.first_name;
                  lastNameError.innerHTML = res.data.errors.last_name;
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
          <label htmlFor="first_name">Prénom</label>
          <br />
          <input
              type="text"
              name='first_name'
              id='first_name'
              onChange={(e) => setFirst_name(e.target.value)}
              value={first_name}
          />
          <br />
          <p className="first_name error">Veuillez écrire un prénom</p>
          <br />

          <label htmlFor="last_name">Nom</label>
          <br />
          <input
              type="text"
              name='last_name'
              id='last_name'
              onChange={(e) => setLast_name(e.target.value)}
              value={last_name}
          />
          <br />
          <p className="last_name error">Veuillez écrire un prénom</p>
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