import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import UserProfilePage from './components/UserProfilePage';
import ImageProfilePage from './components/ImageProfilePage';
import UploadPage from './components/UploadPage';

import * as sessionActions from './store/session';
import * as photosActions from './store/photos';

export default function App() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState(null);

  //on first render, check whether jwt token credentials matches user in db,
  //if so add user to Redux State
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

    //eager load all photos in db into state
    dispatch(photosActions.getAllPhotosThunk());
  }, [dispatch]);

  //load userId to state once userSession is loaded
  useEffect(() => {
    if (sessionUser) setUserId(sessionUser.id);
  }, [isLoaded, sessionUser]);

  //eager load sessionUsers photos into state on first render or once userId is updated.
  useEffect(() => {
    if (userId) dispatch(photosActions.getUserPhotosThunk(userId));
  }, [userId, dispatch]);

  //ensure app rendering waits for sessionUser (if exists) to be loaded to state
  //TO DO: can remove isLoaded props most likeley except for Navigation.  Or just make Navigation dependent on sessionuser only
  if (isLoaded) {
    return (
      <>
        <Switch>
          <Route exact path='/'>
            {/* LAnding Page once logged in */}
            {sessionUser ? (
              <Navigation isLoaded={isLoaded} />
            ) : (
              <SplashPage isLoaded={isLoaded} />
            )}
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
