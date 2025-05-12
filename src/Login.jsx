import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase';

export default function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const signin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log('Signed in:', authUser);
        navigate('/')
      })
      .catch(error => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log('Registered:', authUser);
        navigate('/')
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className='login'>
      <Link to='/'>
        <img
          className='login_logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt='Amazon Logo'
        />
      </Link>

      <div className='login_container'>
        <h1 className='heading'>Sign In</h1>
        <form>
          <h5 className='email'>E-mail</h5>
          <input
            type='email'
            value={email}
            onChange={e => setemail(e.target.value)}
          />

          <h5 className='password'>Password</h5>
          <input
            type='password'
            value={password}
            onChange={e => setpassword(e.target.value)}
          />

          <button className='signin' onClick={signin} type='submit'>
            Sign In
          </button>
        </form>

        <p>
          By signing in, you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, Cookies Notice and Interest-Based Ads.
        </p>

        <button className='create-account' onClick={register}>
          Create a new Account
        </button>
      </div>
    </div>
  );
}
