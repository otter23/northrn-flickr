import './LoginForm.css';
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

//format for Create-react-app which uses SVGR under the hood:
//import { ReactComponent as FlickrLogo } from './Flickr.svg';

import flickrIcon from '../../images/icons/flickr-icon.svg';
import flickrLogo from '../../images/flickrLogo.svg';
import loginBg from '../../images/login-bg.jpeg';

export default function LoginFormPage() {
  const dispatch = useDispatch();

  //subscribe to redux session state
  const sessionUser = useSelector((state) => state.session.user);

  //slices of react state for controlled inputs
  const [credential, setCredential] = useState(
    window.localStorage.getItem('nFlckrEmail') || ''
  );
  const [credentialLabel, setCredentialLabel] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordLabel, setPasswordLabel] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState([]);

  //if redux state updated with user session, redirect to homepage
  //consider using history if want to be able to use back button
  if (sessionUser) return <Redirect to='/' />;

  //on submit dispatch login thunk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    // send request to backend API login route (api/session)
    try {
      const response = await dispatch(
        sessionActions.login({ credential, password })
      );

      if (response.ok) {
        //save email for next session if remember checked
        if (remember) window.localStorage.setItem('nFlckrEmail', credential);
        return;
      }
    } catch (errorResponse) {
      const data = await errorResponse.json();
      if (data && data.errors) setErrors(data.errors);
    }

    // return dispatch(sessionActions.login({ credential, password })).catch(
    //   async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   }
    // );
  };

  return (
    <div
      className='login-background'
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <nav className='login-nav'>
        <div className='login-nav-inner'>
          <Link to='/'>
            <img
              className='logo-nav'
              src={flickrLogo}
              alt='logo'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
            />
          </Link>
        </div>
      </nav>

      <div className='card-container'>
        <div className='login-card'>
          <div className='logo-container'>
            <img
              src={flickrIcon}
              alt='logo'
              viewBox='0 0 100 100'
              preserveAspectRatio='xMidYMid meet'
              className='logo'
            />
          </div>

          <h6 className='login-header'>Log in to Northrn Flickr</h6>

          {errors.length > 0 && (
            <div className='error-container'>
              <p className='error-message'>Invalid email or password.</p>
              {/* {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))} */}
            </div>
          )}

          <form
            className={`form-control`}
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            {/* <input
                autocomplete='false'

                type='text'
                styles='display:none;'
              ></input> */}
            <div
              className={`form-group ${
                credentialLabel ? 'form-group-color' : ''
              }`}
            >
              <label
                className={`label ${
                  credential.length > 0 || credentialLabel ? 'label-small' : ''
                } ${credentialLabel ? 'label-color' : ''}`}
                htmlFor='email'
              >
                Email address
                {/* Username or Email */}
              </label>
              <input
                id='email'
                className={`input`}
                type='text'
                name='email'
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                onFocus={() => setCredentialLabel((prev) => !prev)}
                onBlur={() => setCredentialLabel((prev) => !prev)}
                required
              />
            </div>

            <div
              className={`form-group ${
                passwordLabel ? 'form-group-color' : ''
              }`}
            >
              <label
                className={`label ${
                  password.length > 0 || passwordLabel ? 'label-small' : ''
                } ${passwordLabel ? 'label-color' : ''}`}
                htmlFor='password'
              >
                Password
              </label>
              <div className='input-icon-container'>
                <input
                  id='password'
                  className={`input`}
                  type={hidePassword ? 'password' : 'text'}
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordLabel((prev) => !prev)}
                  onBlur={() => setPasswordLabel((prev) => !prev)}
                  required
                />
                <div
                  className='icon-container'
                  onClick={(e) => setHidePassword((prevVal) => !prevVal)}
                >
                  {hidePassword ? (
                    <span className='material-symbols-outlined'>
                      visibility
                    </span>
                  ) : (
                    <span className='material-symbols-outlined'>
                      visibility_off
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className='checkbox-container'>
              <label className='checkbox-label' htmlFor='remember'>
                <input
                  id='remember'
                  className=''
                  type='checkbox'
                  name='remember'
                  value='remember'
                  checked={remember}
                  onChange={(e) => setRemember((prevVal) => !prevVal)}
                />
                <span> Remember email address</span>
              </label>
            </div>

            <div className='sign-in-btn-container'>
              <button className='sign-in-btn' type='submit'>
                Sign In
              </button>
              {/* <Link className='btn btn-cancel' to='/'>Cancel</Link> */}
            </div>
          </form>

          <div className='login-card-bottom'>
            <div className='forgot-password'>
              <Link className='link-forgot' to='/forgot-password'>
                Forgot password?
              </Link>
            </div>

            <div className='not-member'>
              <span>Not a Northrn Flickr member?</span>
              <Link className='link-signup' to='/sign-up'>
                Sign up here.
              </Link>
            </div>
          </div>

          <div className='login-footer'>
            <div className='login-footer-left'>
              English
              <span className='material-symbols-outlined login-footer-icon'>
                expand_more
              </span>
            </div>

            <div className='login-footer-right'>
              <span>Help</span>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
