import './Navigation.css';

import React from 'react';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import flickrLogo from '../../images/flickrLogo.svg';

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let userId;
  if (sessionUser) {
    userId = sessionUser.id;
  }

  let sessionLinks;
  //is user, show profile button, else show login/signup links
  if (sessionUser) {
    sessionLinks = (
      <>
        <Link to='/photos/upload'>UPLOAD PAGE</Link>
        <ProfileButton user={sessionUser} />
      </>
    );
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

  let rootPath;
  if (sessionUser) {
    rootPath = (
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
    );
  } else {
    rootPath = (
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
                  disabled={true}
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
    );
  }

  const photosUploadNav = (
    <nav className='upload-nav'>
      <div className='upload-nav-inner'>
        <Link to='/' className='upload-nav-link'>
          <img
            className='upload-nav-logo'
            src={
              'https://combo.staticflickr.com/pw/images/flickr-logo-small.png'
            }
            alt='logo'
          />
        </Link>
        <div className='upload-nav-right-container'>
          <ul className='upload-nav-left'>
            <li>
              <Link className='upload-nav-photostream' to={`/photos/${userId}`}>
                Your Photostream
              </Link>
            </li>
            <li>
              <Link className='upload-nav-create' to={`#`}>
                Create
              </Link>
            </li>
          </ul>
          <ul className='upload-nav-right'>
            <li>
              <Link className='upload-nav-oldUploadr' to={`#`}>
                Old Uploadr
              </Link>
            </li>
            <li>
              <Link className='upload-nav-newHere' to={`#`}>
                New Here?
              </Link>
            </li>
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  const authNav = (
    <nav className='auth-nav'>
      <div className='auth-nav-inner'>
        <Link to='/' className='auth-nav-link'>
          <img
            className='auth-nav-logo'
            src={flickrLogo}
            alt='logo'
            viewBox='0 0 100 100'
            preserveAspectRatio='xMidYMid meet'
          />
        </Link>
      </div>
    </nav>
  );

  return (
    <>
      <Switch>
        <Route exact path='/'>
          {rootPath}
        </Route>
        <Route path='/login'>{authNav}</Route>
        <Route path='/sign-up'>{authNav}</Route>
        <Route exact path='/photos/:userId(\d+)'>
          {authNav}
        </Route>
        <Route path='/photos/:userId(\d+)/:imageId(\d+)'>{authNav}</Route>
        <Route path='/photos/upload'>{photosUploadNav}</Route>
      </Switch>
    </>
  );
}
