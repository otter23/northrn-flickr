import './UserProfile.css';
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import * as photosActions from '../../store/photos';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Link, useParams } from 'react-router-dom';

import Navigation from '../Navigation';
import Footer from '../Footer';

import defaultUserPhoto from '../../images/login-bg-2000x1333.jpg';
import defaultCoverPhoto from '../../images/login-bg-2000x1333.jpg';

export default function UserProfilePage() {
  const dispatch = useDispatch();

  //subscribe to redux session state
  const sessionUser = useSelector((state) => state.session.user);
  // const sessionUserId = sessionUser.id;
  const { userId } = useParams();
  const userPhotos = useSelector((state) => state.photos[userId]);

  //grab user photos before render
  // dispatch(photosActions.getUserPhotosThunk(userId));

  return (
    <>
      <div>
        <Navigation />

        <div className='profile-coverPhoto'>
          <div className='profile-coverPhoto-inner-div'>
            <div className='profile-photo'></div>
            <div className='profile-info-upper'>
              <div className='profile-name'></div>
              <div className='profile-menu'></div>
            </div>
            <div className='profile-info-bottom'>
              <div className='username'></div>
              <div className='profile-followers'></div>
              <div className='profile-following'></div>
            </div>
          </div>
        </div>
        <div className='profile-nav'>
          <ul>
            <li>
              <Link to='#'>
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link to={`/photos/${userId}`}>
                <span>Photostream</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <span>Albums</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <span>Faves</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <span>Galleries</span>
              </Link>
            </li>
            <li>
              <Link to='#'>
                <span>Groups</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className='profile-toolbar'></div>
        <div className='profile-photo-list-container'></div>

        <Footer />
      </div>
    </>
  );
}
