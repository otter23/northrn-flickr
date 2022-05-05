import './ImageProfile.css';
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import * as photosActions from '../../store/photos';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useParams } from 'react-router-dom';

import Navigation from '../Navigation';
import Footer from '../Footer';

import defaultUserPhoto from '../../images/login-bg-2000x1333.jpg';
import defaultCoverPhoto from '../../images/login-bg-2000x1333.jpg';

export default function ImageProfilePage({ isLoaded }) {
  const dispatch = useDispatch();

  //subscribe to redux session state
  const sessionUser = useSelector((state) => state.session.user);

  // const sessionUserId = sessionUser.id;
  // const { userId } = useParams();
  // const userPhotos = useSelector((state) => state.photos[userId]);

  //grab user photos before render
  // dispatch(photosActions.getUserPhotosThunk(userId));

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
      <div className='image-photo-list-container'></div>
      <Footer />
    </div>
  );
}
