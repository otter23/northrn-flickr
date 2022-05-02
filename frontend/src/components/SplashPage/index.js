import './Splash.css';

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';

import flickrLogo from '../../images/flickrLogo.svg';
import flickerImage from '../../images/splash-bg.jpg';
import fbIcon from '../../images/icons/fb-icon.svg';
import twitterIcon from '../../images/icons/twitter-icon.svg';
import instaIcon from '../../images/icons/insta-icon.svg';

function Splash({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const [bgImage, setBgImage] = useState(flickerImage);
  // setBgImage(flickerImage); //create function and update later

  let sessionLinks;
  //is user, show profile button, else show login/signup links
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <div className='splash-login'>
          <Link to='/login'>Log In</Link>
        </div>

        <div className='splash-signup'>
          <Link to='/sign-up'>Sign Up</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <nav className='splash-nav'>
        <div className='splash-nav-inner'>
          <div className='splash-left-nav'>
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
          <div className='splash-nav-search-div'>
            <input type='search'></input>
          </div>
          {isLoaded && sessionLinks}
        </div>
      </nav>
      <div
        className='splash-background'
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className='splash-body-container'>
          <h1 className='find-inspiration'> Find your inspiration.</h1>
          <h2>
            Join the Northrn Flickr community, home to tens of billions of
            photos and 2 million groups
          </h2>
          <Link to='/sign-up' className='start-for-free'>
            Start for free
          </Link>
        </div>
        <div className='splash-photo-meta-container'>
          <div className='splash-photo-title'>
            <Link to='#'>Northern Flicker</Link>
          </div>
          <div className='splash-photo-username'>
            <Link to='#'>by Steve Jones</Link>
          </div>
        </div>
      </div>
      <footer className='splash-footer'>
        <div>About</div>
        <div>Jobs</div>
        <div>Blogs</div>
        <div>Developers</div>
        <div>Guidelines</div>
        <div>Help</div>
        <div>Help forum</div>
        <div>Privacy</div>
        <div>Terms</div>
        <div>Cookies</div>
        <div className='english-div'>
          English
          <span className='material-symbols-outlined login-footer-icon'>
            expand_more
          </span>
        </div>
        <div>SmugMug+Flickr.</div>
        <div className='footer-icon-container'>
          <img className='fb-icon' src={fbIcon} alt='facebook icon' />
          <img
            className='logo-nav'
            src={twitterIcon}
            alt='twitter icon'
            style={{ width: '24px', height: '24px' }}
          />
          <img className='insta-icon' src={instaIcon} alt='instagram icon' />
        </div>
      </footer>
    </>
  );
}

export default Splash;
