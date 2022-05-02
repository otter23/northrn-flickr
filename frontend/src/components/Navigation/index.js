import './Navigation.css';

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import flickrLogo from '../../images/flickrLogo.svg';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  //is user, show profile button, else show login/signup links
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <div className='login'>
          <Link to='/login'>Log In</Link>
        </div>

        <div className='signup'>
          <Link to='/sign-up'>Sign Up</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <nav className='nav'>
        <div className='nav-inner'>
          <div className='left-nav'>
            <NavLink exact to='/'>
              <img
                className='logo-nav'
                src={flickrLogo}
                alt='logo'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid meet'
              />
            </NavLink>
          </div>
          {isLoaded && sessionLinks}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
