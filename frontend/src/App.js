import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Route, Switch } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

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
          <Navigation isLoaded={isLoaded} />
        </Route>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/sign-up'>
          <Navigation isLoaded={isLoaded} />
          <SignupFormPage />
        </Route>
        <Route>
          <h1>Page Not Found </h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
