import './UserProfile.css';
import React, { useEffect, useState } from 'react';
import * as photosActions from '../../store/photos';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect,
  NavLink,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom';

import Navigation from '../Navigation';
import Footer from '../Footer';
import userCover from '../../images/demoUser-cover.jpg';
// https://www.pexels.com/photo/low-angle-photography-of-flock-of-bird-flying-1578310/
import userIcon from '../../images/demoUser-icon.jpg';
// https://www.pexels.com/photo/grey-and-black-camera-on-green-background-1983037/

export default function UserProfilePage({ isLoaded }) {
  const dispatch = useDispatch();
  const location = useLocation();

  //subscribe to redux session state
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  // const photos = useSelector((state) => state.photos);

  //grab page userId from params and grab their photos from state
  const { userId } = useParams();
  const userPhotos = useSelector((state) => state.photos[userId]);

  const [userRouteOk, setUserRouteOk] = useState(true);
  const [renderReady, setRenderReady] = useState(false); //keeps redirect from happening until use effect gets a chance to run
  const [isAuthorized, setIsAuthorized] = useState(false); //controls whether session User can edit a page

  //app won't load until user's loaded into redux state from db, so don' need to wrap in useEffect
  //check Redux State for user, returns -1 if no instances found, otherwise returns first index

  // if URL User exists, load URL user images to state
  useEffect(() => {
    // if (!photos.allPhotos.length > 0) return;  //not necessary bc app won't render without photos in Redux state

    const userExists = Object.values(users)?.findIndex(
      (user) => user.id === parseInt(userId)
    );

    if (userExists === -1) {
      //if doesn't exist

      setUserRouteOk(false);
    } else {
      //update state if user exists
      dispatch(photosActions.getUserPhotosThunk(userId)).then(() => {});
      //as long as route is ok can start rendering
      setUserRouteOk(true);
    }
    //don't need to ensure photos in state yet before rendering page
    setRenderReady(true);
  }, [userId, dispatch, users, userRouteOk]);

  //update authorization state if page userId and session user match
  useEffect(() => {
    if (sessionUser?.id === parseInt(userId)) {
      setIsAuthorized(true);
    }
  }, [userId, sessionUser]);

  //check whether photos ready and route ok before loading
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
              {/* <div className='profile-info-upper-container'> */}
              <div className='profile-info-upper'>
                <div>
                  <div className='profile-name'>
                    {users[userId].username ?? 'username'}
                  </div>
                  <div className='profile-menu'></div>
                </div>
              </div>
              <div className='profile-info-bottom'>
                <div className='username'></div>
                <div className='profile-followers'></div>
                <div className='profile-following'></div>
              </div>
              {/* </div> */}
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
        <div className='profile-photo-body-container'>
          <div className='profile-photo-list-container'>
            <ul className='profile-photo-list-inner-container'>
              {!userPhotos && <li>Loading Photos</li>}
              {userPhotos && Object.values(userPhotos)?.length < 1 && (
                <li>No photos to display</li>
              )}
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
  } else return <Redirect to={location.pathname} />;
}
