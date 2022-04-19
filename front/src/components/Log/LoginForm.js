import React, { useState } from 'react';
import eyeOpen from './../../assets/icons/eyeOpen.svg'
import eyeClosed from './../../assets/icons/eyeClosed.svg'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import *  as yup from 'yup'
import { POST } from '../../utils/axios'

const schema = yup
  .object()
  .shape({
    email: yup.string().email("Email non valide").required("Email requis"),
    password: yup.string().required("Mot de passe requis"),
})
  .required()

const LoginForm = () => {
    const [passwordIsVisible, setPasswordIsVisible] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

    const onSubmit = async data => {
      try {
          const res = await POST(`api/auth/login`, data);
          console.log('Enregistré', res.data);
          const userId = res.data
          console.log(userId)
          sessionStorage.setItem('user', JSON.stringify(userId))
          window.location = "/";
      } catch (err) {
        document.getElementById('error').innerText = 'Erreur sur les identifiants'
        console.error('echec', err);
      }
    }

    return (
      <form action="" onSubmit={handleSubmit(onSubmit)} id="login-form">
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
          <p className="error-msg error">{errors.email ? <span>{errors.email.message} </span> : null }</p>

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
          <p className="error-msg error" id='error'>{errors.password ? <span>{errors.password.message}</span>: null }</p>
          <br />

          <input type="submit" value="Se connecter"/>
      </form>
    );
};

export default LoginForm;