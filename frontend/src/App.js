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

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  //on first render, check whether jwt token has user in db,
  //if so add user to Redux State
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  //could include navigation for every page if loaded before the switch
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
          <LoginFormPage />
        </Route>

        <Route path='/sign-up'>
          <SignupFormPage />
        </Route>

        {/* also matches /photos/:userId/  */}
        <Route exact path='/photos/:userId(\d+)'>
          <UserProfilePage />
          <div className='RENDER'></div>
        </Route>

        <Route path='/photos/:userId(\d+)/:imageId(\d+)'>
          <ImageProfilePage />
        </Route>

        <Route path='/photos/upload'>
          <UploadPage />
        </Route>

        <Route>
          <h1>Page Not Found </h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
