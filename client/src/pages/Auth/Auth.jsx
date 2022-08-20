import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  // console.log(loading);
  const [isSignup, setIsSignup] = useState(false);
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    conformpassword: '',
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignup) {
      data.password === data.conformpassword
        ? dispatch(signUp(data))
        : setConfirmPass(false);
      // loading(false);
    } else {
      dispatch(logIn(data));
      Navigate('/home');
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      conformpassword: '',
    });
  };
  return (
    <div className='Auth'>
      <div className='a-left'>
        <img src={Logo} alt='' />
        <div className='Webname'>
          <h1>Dawa Media</h1>
          <h6>Explore the idea of content throughtout the world</h6>
        </div>
      </div>

      {/*SignUp /> */}
      <div className='a-right'>
        <form
          className='infoForm authForm'
          onSubmit={handleSubmit}
          method='POST'>
          <h3>{isSignup ? 'Sign up' : 'Login'}</h3>
          {isSignup && (
            <div>
              <input
                type='text'
                placeholder='First Name'
                className='infoInput'
                name='firstname'
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type='text'
                placeholder='Last Name'
                className='infoInput'
                name='lastname'
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type='text'
              placeholder='username'
              className='infoInput'
              name='username'
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type='password'
              placeholder='password'
              className='infoInput'
              name='password'
              onChange={handleChange}
              value={data.password}
            />

            {isSignup && (
              <input
                type='password'
                placeholder='conform password'
                className='infoInput'
                name='conformpassword'
                onChange={handleChange}
                value={data.conformpassword}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? 'none' : 'block',
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px',
            }}>
            *conform password is not same
          </span>
          <div>
            <span
              style={{ fontSize: '12px', cursor: 'pointer' }}
              onClick={() => {
                setIsSignup((prev) => !prev);
                resetForm();
              }}>
              {isSignup
                ? 'Already have an account login!'
                : 'Dont have an account? signup'}
            </span>
          </div>

          <button
            className='button infoButton'
            type='Submit'
            disabled={loading}>
            {loading ? 'loading...' : isSignup ? 'signup' : 'login'}
          </button>
        </form>
      </div>
    </div>
  );
};

// function SignUp(){
//     return (

//         <div className="a-right">
//             <form className="infoForm authForm">
//                 <h3>Sign up</h3>
//                 <div>
//                     <input type="text" placeholder="First Name"
//                     className="infoInput" name="firstName"/>
//                     <input type="text" placeholder="Last Name"
//                     className="infoInput" name="lastName"/>
//                 </div>

//                 <div>
//                     <input type="text" placeholder="username"
//                     className="infoInput" name="usernames"/>
//                 </div>

//                 <div>
//                     <input type="password" placeholder="password"
//                     className="infoInput" name="password" />

//                      <input type="password" placeholder="conform password"
//                     className="infoInput" name="conformPassword" />
//                 </div>
//                 <div>
//                     <spa style={{fontSize: "12px"}}n>Already have an account. Login!</spa>
//                 </div>

//                 <button className="button infoButton" type="submit">
//                     Signup
//                 </button>
//             </form>
//         </div>
//     )
// }

export default Auth;
