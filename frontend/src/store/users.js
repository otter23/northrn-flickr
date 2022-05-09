//Redux state slice to hold users from db

import { csrfFetch } from './utils/csrf'; //restoreCSRF

//ACTION TYPES:
const GET_ALL_USERS = 'users/getAllUsers';

//REGULAR ACTION CREATORS (implicit returns)

//payload: array of photo objects
export const getAllUsers = (allUsers) => ({
  type: GET_ALL_USERS,
  payload: { allUsers },
});

//THUNK ACTION CREATORS:

//request to backend for all users safe information in db
export const getAllUsersThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/ids`);

  if (response.ok) {
    const allUsers = await response.json();
    dispatch(getAllUsers(allUsers));
    return response;
  } else throw response;
};

//User REDUCER:
const initialState = {}; // userId1: userObj userId2: userObj;
//When map over user obj, need to first make it an array with Object.array in component

export default function photosReducer(state = initialState, action) {
  Object.freeze(state);

  //Shallow Clone State:
  let newState = { ...state };

  switch (action.type) {
    case GET_ALL_USERS:
      //replaces all keys with same id wih new id objects
      newState = { ...action.payload.allUsers };
      return newState;
    default:
      return state;
  }
}

//TEST THUNK:

// window.store.dispatch(window.usersActions.getAllUsersThunk());
