import './Splash.css';

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import flickrLogo from '../../images/flickrLogo.svg';
import flickerImage from '../../images/splash-bg.jpg';
import fbIcon from '../../images/icons/fb-icon.svg';
import twitterIcon from '../../images/icons/twitter-icon.svg';
import instaIcon from '../../images/icons/insta-icon.svg';

function Splash({ isLoaded }) {
  // const sessionUser = useSelector((state) => state.session.user);

  //setup a setInterval to move through photos to mimic splash page
  // const [bgImage, setBgImage] = useState(flickerImage);
  // setBgImage(flickerImage); //create function and update later

  return (
    <>
      <nav className='splash-nav'>
        <div className='splash-nav-inner'>
          <div className='splash-left-nav'>
            <NavLink exact to='/'>
              <img
                className='splash-nav-logo'
                src={flickrLogo}
                alt='logo'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid meet'
              />
            </NavLink>
          </div>

          <div className='splash-nav-right'>
            <div className='splash-nav-search-div'>
              <form className='splash-nav-search-form'>
                <label></label>
                <div className='material-icons'>search</div>
                <input
                  type='search'
                  placeholder='Photos, people, or groups'
                ></input>
              </form>
            </div>

            <div>
              <Link className='splash-login' to='/login'>
                Log In
              </Link>
            </div>

            <div>
              <Link className='splash-signup' to='/sign-up'>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div
        className='splash-background'
        style={{ backgroundImage: `url(${flickerImage})` }}
      >
        <div className='splash-body-container'>
          <h1 className='splash-find-inspiration'> Find your inspiration.</h1>
          <h2>
            Join the Northrn Flickr community, home to tens of billions of
            photos and 2 million groups
          </h2>
          <Link to='/sign-up' className='splash-start-for-free'>
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
        <div className='splash-english-div'>
          English
          <span className='material-symbols-outlined login-footer-icon'>
            expand_more
          </span>
        </div>
        <div>SmugMug+Flickr.</div>
        <div className='splash-footer-icon-container'>
          <img className='splash-fb-icon' src={fbIcon} alt='facebook icon' />
          <img
            className='splash-twt-icon'
            src={twitterIcon}
            alt='twitter icon'
            style={{ width: '24px', height: '24px' }}
          />
          <img
            className='splash-insta-icon'
            src={instaIcon}
            alt='instagram icon'
          />
        </div>
      </footer>
    </>
  );
}

export default Splash;
