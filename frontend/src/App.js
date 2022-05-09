import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';

import SplashPage from './components/SplashPage';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import UserProfilePage from './components/UserProfilePage';
import ImageProfilePage from './components/ImageProfilePage';
import UploadPage from './components/UploadPage';
import ExplorePage from './components/ExplorePage';

import * as sessionActions from './store/session';
import * as photosActions from './store/photos';
import * as usersActions from './store/users';

export default function App() {
  const sessionUser = useSelector((state) => state.session.user);
  // const photos = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPhotosLoaded, setIsPhotosLoaded] = useState(false);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  const [sessionUserId, setSessionUserId] = useState(null);

  //grab userId and imageId if exists from location.pathname
  // const location = useLocation();
  // const arr = location.pathname.split("/photos/")

  //on first render, check whether jwt token credentials matches user in db,
  //if so add user to Redux State
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

    //eager load all photos in db into state
    dispatch(photosActions.getAllPhotosThunk()).then(() =>
      setIsPhotosLoaded(true)
    );

    //eager load all users in db into state
    dispatch(usersActions.getAllUsersThunk()).then(() =>
      setIsUsersLoaded(true)
    );
  }, [dispatch, sessionUserId]);

  //load userId to state once userSession is loaded
  useEffect(() => {
    if (sessionUser) setSessionUserId(sessionUser.id);
  }, [isLoaded, sessionUser]);

  //eager load sessionUsers photos into state on first render or once userId is updated.
  useEffect(() => {
    if (sessionUserId)
      dispatch(photosActions.getUserPhotosThunk(sessionUserId));
  }, [sessionUserId, dispatch]);

  //ensure app rendering waits for sessionUser (if exists) to be loaded to state
  //TO DO: can remove isLoaded props most likely except for Navigation.
  // Or just make Navigation dependent on sessionUser only
  if (isLoaded && isPhotosLoaded && isUsersLoaded) {
    return (
      <>
        <Switch>
          <Route exact path='/'>
            {/* LAnding Page once logged in */}
            {sessionUser ? (
              // <LandingPage isLoaded={isLoaded} />
              <Redirect to='/explore'></Redirect>
            ) : (
              <SplashPage isLoaded={isLoaded} />
            )}
          </Route>

          <Route path='/explore'>
            <ExplorePage isLoaded={isLoaded} />
          </Route>

          <Route path='/login'>
            <LoginFormPage isLoaded={isLoaded} />
          </Route>

          <Route path='/sign-up'>
            <SignupFormPage isLoaded={isLoaded} />
          </Route>

          {/* Note: also matches /photos/:userId/  */}
          <Route exact path='/photos/:userId(\d+)'>
            <UserProfilePage isLoaded={isLoaded} />
            <div className='RENDER'></div>
          </Route>

          {/*Could move to a nested route if needed  */}
          <Route path='/photos/:userId(\d+)/:imageId(\d+)'>
            <ImageProfilePage isLoaded={isLoaded} />
            {/* {userRouteOk && imageRouteOk ? (
              <ImageProfilePage isLoaded={isLoaded} />
            ) : userRouteOk ? (
              <Redirect to={`/photos/${userId}`} />
            ) : (
              <Redirect to={`/`} />
            )} */}
          </Route>

          <Route path='/photos/upload'>
            <UploadPage isLoaded={isLoaded} />
          </Route>

          <Route>
            <h1>Page Not Found </h1>
          </Route>
        </Switch>
      </>
    );
  }
}
