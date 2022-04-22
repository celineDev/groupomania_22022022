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
          const userId = res.data
          sessionStorage.setItem('user', JSON.stringify(userId))
          window.location = "/";
      } catch (err) {
        document.getElementById('error').innerText = 'Erreur sur les identifiants'
        console.error('echec', err);
      }
    }

    return (
      <form action="" onSubmit={handleSubmit(onSubmit)} id="login-form">
        <h1>Connexion</h1>
          <input
              type="text"
              name='email'
              id='email'
              placeholder='Email'
              {...register('email', { required: true })}
          />
          <p className="error">{errors.email ? <span>{errors.email.message} </span> : null }</p>
          <div className='form-password'>
            <input
                type={passwordIsVisible ? 'text' : 'password'}
                name='password'
                id='password'
                placeholder='Mot de passe'
                {...register('password', { required: true })}
            />
            <span className='form-eye' onClick={() => setPasswordIsVisible((prevState) => !prevState)}>
                <img src={passwordIsVisible ? eyeOpen : eyeClosed} width="32" alt={passwordIsVisible ? 'oeil ouvert' : 'oeil fermé'} />
            </span>
          </div>
          <p className="error" id='error'>{errors.password ? <span>{errors.password.message}</span>: null }</p>

          <input type="submit" value="Se connecter"/>
      </form>
    );
};

export default LoginForm;