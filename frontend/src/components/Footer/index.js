import './Footer.css';

import React from 'react';
// import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import fbIcon from '../../images/icons/fb-icon.svg';
import twitterIcon from '../../images/icons/twitter-icon.svg';
import instaIcon from '../../images/icons/insta-icon.svg';

export default function Footer() {
  //subscribe to redux session state
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) {
  }

  const mainFooter = (
    <footer className='footer-container'>
      <div className='footer-top-row'>
        <div>About</div>
        <div>Jobs</div>
        <div>Blogs</div>
        <div>Developers</div>
        <div>Guidelines</div>
        <div>Help</div>
        {sessionUser && <div>Report abuse</div>}
        <div>Help forum</div>
        <div>Privacy</div>
        <div>Terms</div>
        <div>Cookies</div>
        <div className='footer-english-div'>
          <span>English</span>
          <span className='material-symbols-outlined login-footer-icon'>
            expand_more
          </span>
        </div>
      </div>
      <div className='footer-bot-row'>
        <div className='footer-smug'>SmugMug+Flickr.</div>
        <div className='footer-icon-container'>
          <img className='footer-fb-icon' src={fbIcon} alt='facebook icon' />
          <img
            className='footer-twt-icon'
            src={twitterIcon}
            alt='twitter icon'
            style={{ width: '24px', height: '24px' }}
          />
          <img
            className='footer-insta-icon'
            src={instaIcon}
            alt='instagram icon'
          />
        </div>
      </div>
    </footer>
  );

  return (
    <>
      <Switch>
        <Route exact path='/'>
          {mainFooter}
        </Route>
        <Route path='/login'></Route>
        <Route path='/sign-up'></Route>
        <Route path='/photos/:userId'>{mainFooter}</Route>
        <Route path='/photos/:userId/:imageId'>{mainFooter}</Route>
        <Route path='/photos/upload'>{mainFooter}</Route>
      </Switch>
    </>
  );
}
