import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm'
import eyeOpen from './../../assets/icons/eyeOpen.svg'
import eyeClosed from './../../assets/icons/eyeClosed.svg'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import *  as yup from 'yup'

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("Prénom requis"),
    lastName: yup.string().required("Nom requis"),
    email: yup.string().email("Email non valide").required("Email requis"),
    password: yup.string().min(8, "Doit contenir entre 8 et 20 caractères").max(20, "Doit contenir entre 8 et 20 caractères").required("Mot de passe requis"),
})
  .required()

const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

const SignupForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)
  const [passwordIsVisible, setPasswordIsVisible] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    await wait(2000)
    try {
        const res = await axios({
            method: "post",
            url: `http://localhost:3000/api/auth/signup`,
            headers: { 'Content-Type': 'application/json' },
            data: data,
        });
        console.log('Enregistré', res.data);
        setFormSubmit(true)
    } catch (err) {
      document.getElementById('error').innerText = 'Erreur email'
      console.error('echec', err);
    }
  }

    return (
      <>
      {formSubmit ? (
            <>
              <LoginForm />
              <h4 className="success">
                Enregistrement réussi, veuillez-vous connecter
              </h4>
            </>
          ) : (
          <form onSubmit={handleSubmit(onSubmit)} id="sign-up-form">
          <label htmlFor="firstName">Prénom</label>
          <br />
          <input
              type="text"
              name='firstName'
              id='firstName'
              placeholder='Prénom'
              {...register('firstName', { required: true })}
          />
          <br />
          <p className="error-msg error">{errors.firstName && <span>{errors.firstName.message}</span> }</p>
          <br />

          <label htmlFor="lastName">Nom</label>
          <br />
          <input
              type="text"
              name='lastName'
              id='lastName'
              placeholder='Nom'
              {...register('lastName', { required: true })}
          />
          <br />
          <p className="error-msg error">{errors.lastName && <span>{errors.lastName.message}</span> }</p>
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
              type="text"
              name='email'
              id='email'
              placeholder='Email'
              {...register('email', { required: true })}
          />
          <br />
          <p className="error-msg error" id='error'>{errors.email && <span>{errors.email.message}</span> }</p>
          <br />

          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
              type={passwordIsVisible ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='Mot de passe'
              {...register('password', { required: true })}
          />
          <span onClick={() => setPasswordIsVisible((prevState) => !prevState)}>
            <img src={passwordIsVisible ? eyeOpen : eyeClosed} width="32px" alt={passwordIsVisible ? 'oeil ouvert' : 'oeil fermé'} />
          </span>
          <br />
          <p className="error-msg error">{errors.password && <span>{errors.password.message}</span> }</p>
          <br />
          <input type="submit" value="S'inscrire'"/>
      </form>
      )}
    </>
  );
};

export default SignupForm;