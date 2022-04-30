import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { restoreCSRF, csrfFetch } from './store/csrf';

import * as sessionActions from './store/session';

//create the redux store
import configureStore from './store';
const store = configureStore();

//DEVELOPMENT ONLY:
//used for debugging redux in development
//also adds csrf because separate backend/frontend servers in development
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF(); //add csrf's XSRF-TOKEN to cookies
  window.csrfFetch = csrfFetch; //add helper function to window to make csrf protected fetch calls to backend api
  window.store = store; //easy access to store and its methods in browser console
  window.sessionActions = sessionActions; //test session redux state
}

//root wrapper used to wrap <App/>  in various provider components
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
