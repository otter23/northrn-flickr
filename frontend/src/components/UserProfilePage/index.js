import './UserProfile.css';
import React, { useEffect, useState } from 'react';
import * as photosActions from '../../store/photos';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, Link, useParams } from 'react-router-dom';

import Navigation from '../Navigation';
import Footer from '../Footer';
import userCover from '../../images/demoUser-cover.jpg';
import userIcon from '../../images/demoUser-icon.jpg';

export default function UserProfilePage({ isLoaded }) {
  const dispatch = useDispatch();

  //subscribe to redux session state
  const sessionUser = useSelector((state) => state.session.user);
  // const users = useSelector((state) => state.users);
  const photos = useSelector((state) => state.photos);
  // const sessionUserId = sessionUser.id;

  //grab page userId from params and grab their photos from state
  const { userId } = useParams();
  const userPhotos = useSelector((state) => state.photos[userId]);

  const [userRouteOk, setUserRouteOk] = useState(false);
  const [renderReady, setRenderReady] = useState(false); //keeps redirect from happening until use effect gets a chance to run
  const [isAuthorized, setIsAuthorized] = useState(false); //controls whether session User can edit a page

  // check if URL User exists, if so load URL user images to state
  //will refactor once user store is setup
  useEffect(() => {
    // if (!photos.allPhotos.length > 0) return;  //not necessary bc app won't render without photos in Redux state

    //check Redux State for user, returns -1 if no instances found, otherwise returns first index
    //TO DO: should really be a check to the db...
    const userExists = photos?.allPhotos?.findIndex(
      (image) => image.userId === parseInt(userId)
    );

    if (userExists !== -1) {
      //update state if user exists
      dispatch(photosActions.getUserPhotosThunk(userId)).then(() => {});

      //don't need to ensure photos in state yet before rendering page
      setRenderReady(true);
      //as long as route is ok can start rendering
      setUserRouteOk(true);
    }
  }, [userId, dispatch]);

  //update authorization state if page userId and session user match
  useEffect(() => {
    if (sessionUser?.id === parseInt(userId)) {
      setIsAuthorized(true);
    }
  }, [userId, sessionUser]);

  if (!userRouteOk && renderReady) {
    return (
      <Redirect
        onLoad={alert("User doesn't exist, redirecting to Homepage.")}
        to={`/`}
      />
    );
  } else if (renderReady) {
    return (
      <>
        <Navigation isLoaded={isLoaded} isAuthorized={isAuthorized} />

        <div
          className='profile-coverPhoto'
          style={{ backgroundImage: `url(${userCover})` }}
        >
          <div className='profile-coverPhoto-inner-div'>
            <div className='profile-img-username-div'>
              <div
                className='profile-image'
                style={{ backgroundImage: `url(${userIcon})` }}
              >
                {/* <div class='material-symbols-outlined'>photo_camera</div> */}
              </div>
              <div>
                <div className='profile-info-upper'>
                  <div>
                    <div className='profile-name'>{'username'}</div>
                    <div className='profile-menu'></div>
                  </div>
                </div>
                <div className='profile-info-bottom'>
                  <div className='username'></div>
                  <div className='profile-followers'></div>
                  <div className='profile-following'></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='profile-row-two'>
          <ul className='profile-row-two-inner'>
            <li className='profile-about'>
              <div>
                <span>About</span>
              </div>
            </li>
            <li className='profile-photostream'>
              <NavLink
                to={`/photos/${userId}`}
                className={(state) =>
                  state ? 'profile-photostream-link-active' : 'inactive'
                }
              >
                <span>Photostream</span>
              </NavLink>
            </li>
            <li className='profile-albums'>
              <div>
                <span>Albums</span>
              </div>
            </li>
            <li className='profile-faves'>
              <div>
                <span>Faves</span>
              </div>
            </li>
            <li className='profile-galleries'>
              <div>
                <span>Galleries</span>
              </div>
            </li>
            <li className='profile-groups'>
              <div to='#'>
                <span>Groups</span>
              </div>
            </li>
          </ul>
        </div>

        <div className='profile-toolbar'></div>
        <div className='profile-photo-list-scroll'>
          <div className='profile-photo-list-container'>
            <ul className='profile-photo-list-inner-container'>
              {userPhotos &&
                Object.values(userPhotos)?.map((image) => {
                  return (
                    <li key={image?.id}>
                      <Link to={`/photos/${userId}/${image?.id}`}>
                        <img src={image?.imageUrl} alt={image?.title}></img>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <Footer />
      </>
    );
  } else return;
}
