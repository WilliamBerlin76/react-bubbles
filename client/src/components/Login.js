import React, { useState } from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth'

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({})

  const handleChange = e => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    });
    console.log(credentials)
  };

  const submit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage')
      })
      .catch(err => {
        console.log('could not sign in', err)
      })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form>
        <input
          placeholder='username'
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          placeholder='password'
          type='text'
          name='password'
          value={credentials.password}
          onChange={handleChange}
        />
        <button onClick={submit}>Sign In</button>
      </form>
    </>
  );
};

export default Login;
