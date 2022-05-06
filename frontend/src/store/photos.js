//Redux state slice to hold images from db

import { csrfFetch } from './csrf'; //restoreCSRF

//ACTION TYPES:
const GET_ALL_PHOTOS = 'photos/getAllPhotos';

const GET_USER_PHOTOS = 'photos/getUserPhotos';
const ADD_PHOTOS = 'photos/addPhoto';
const UPDATE_PHOTO = 'photos/updatePhoto';
const DELETE_PHOTO = 'photos/deletePhoto';

//REGULAR ACTION CREATORS (implicit returns)

//payload: array of photo objects
export const getAllPhotos = (allPhotos) => ({
  type: GET_ALL_PHOTOS,
  payload: { allPhotos },
});

//Payload: one user photo object
export const addPhoto = (userPhoto) => ({
  type: ADD_PHOTOS,
  payload: { userPhoto },
});

//payload: array of user photo objects
export const getUserPhotos = (userPhotos, userId) => ({
  type: GET_USER_PHOTOS,
  payload: { userPhotos, userId },
});

//Payload: one updated user photo object
export const updatePhoto = (userPhoto) => ({
  type: UPDATE_PHOTO,
  payload: { userPhoto },
});

//Payload: userId and imageId to key into imageByKey user object
export const deletePhoto = (userId, imageId) => ({
  type: DELETE_PHOTO,
  payload: { userId, imageId },
});

//THUNK ACTION CREATORS:

//request to backend for all photos
//photos are pre-sorted by most recent in backend
export const getAllPhotosThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/images`);

  if (response.ok) {
    const allPhotos = await response.json();
    dispatch(getAllPhotos(allPhotos));
    return response;
  }
};

//request to backend for all of a user's photos
//photos are pre-sorted by most recent in backend
export const getUserPhotosThunk = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/images`);

  if (response.ok) {
    const resBody = await response.json();

    //Normalize array into an object with  (Index images by id):
    //idToImage or UserImageById
    let userPhotos = {};
    resBody.forEach((image) => {
      userPhotos[image.id] = image;
    });

    dispatch(getUserPhotos(userPhotos, userId));
    return response;
  }
};

//request to backend to add a single user photo
export const addPhotoThunk = (formData) => async (dispatch) => {
  const { userId, title, description, imageUrl } = formData;
  const response = await csrfFetch('/api/images', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      title,
      description,
      imageUrl,
    }),
  });
  const userPhoto = await response.json();
  dispatch(addPhoto(userPhoto));
  response.userPhoto = userPhoto;
  return response;
};

//request to backend to update a single user photo
export const updatePhotoThunk = (formData) => async (dispatch) => {
  const { imageId, title, description } = formData;
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      description,
    }),
  });
  const userPhoto = await response.json();
  dispatch(updatePhoto(userPhoto));
  response.userPhoto = userPhoto;
  return response;
};

//request to backend to delete a single user photo
export const deletePhotoThunk = (userId, imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: 'DELETE',
  });
  const resBody = await response.json();
  console.log('DELETE: ', resBody);
  if (resBody.message === 'Success') {
    dispatch(deletePhoto(userId, imageId));
  }
  return response;
};

//Photo REDUCER:
const initialState = { allPhotos: [], explore: [] }; // userId1:  {imagId1: imageObj imagId2: imageObj }, userId2: {};
//in scalable version each userId object would also have a property:    allUserPhotos:[]
//When map over user obj, need to first make it an array with Object.array in component

// allPhotos: [] - this will be for the landing page
//to update this part of state need to user .find or .findIndex
// explore: [] - this will be to store a list of photos that matches a search query on the explore page

export default function photosReducer(state = initialState, action) {
  Object.freeze(state);
  Object.freeze(state.allPhotos);
  Object.freeze(state.explore);

  //Deep Clone State:
  let allPhotos = [];
  state.allPhotos.forEach((photo) => {
    allPhotos.push({ ...photo });
  });
  let explore = [];
  state.explore.forEach((photo) => {
    explore.push({ ...photo });
  });

  const newState = { ...state, allPhotos, explore };

  Object.keys(state).forEach((key) => {
    if (key !== 'allPhotos' && key !== 'explore') {
      let userObj = {};
      Object.values(state[key]).forEach((image) => {
        userObj[image.id] = { ...image };
      });
      newState[key] = userObj;
    }
  });

  // optional chaining that works in transpiler, ?. doesn't work
  // const testVar = action || {}.payload || {}.allPhotos;

  let userId;
  let imageId;
  let index;

  switch (action.type) {
    case GET_ALL_PHOTOS:
      newState.allPhotos = action.payload.allPhotos;
      return newState;

    case GET_USER_PHOTOS:
      userId = action.payload.userId;
      newState[userId] = action.payload.userPhotos;
      return newState;

    case ADD_PHOTOS:
      userId = action.payload.userPhoto.userId;
      imageId = action.payload.userPhoto.id;
      //add photo to beginning of array sorted by "createdAt"
      newState.allPhotos.unshift(action.payload.userPhoto);
      //add photo to user ImageById map
      newState[userId][imageId] = action.payload.userPhoto;
      return newState;

    case UPDATE_PHOTO:
      userId = action.payload.userPhoto.userId;
      imageId = action.payload.userPhoto.id;
      //find index of image to update
      index = newState.allPhotos.findIndex((image) => image.id === imageId);
      //replace image in allPhotos array
      newState.allPhotos[index] = action.payload.userPhoto;
      //replace image in userPhoto obj
      newState[userId][imageId] = action.payload.userPhoto;
      return newState;

    case DELETE_PHOTO:
      userId = action.payload.userId;
      imageId = action.payload.imageId;
      //find index of image to delete
      index = newState.allPhotos.findIndex((image) => image.id === imageId);
      //remove image from allPhotos array
      newState.allPhotos.splice(index, 1);
      //remove image from userPhoto obj
      delete newState[userId][imageId];
      return newState;
    default:
      return state;
  }
}

//TEST THUNKS:

// window.store.dispatch(window.photosActions.getAllPhotosThunk())
// window.store.dispatch(window.photosActions.getUserPhotosThunk(1))

// window.store.dispatch(
//   window.photosActions.addPhotoThunk({
//     userId: 1,
//     title: 'NEWEST IMAGE',
//     description: null,
//     imageUrl:
//       'https://images.pexels.com/photos/63330/geese-water-birds-waterfowl-63330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//   })
// );

// window.store.dispatch(
//   window.photosActions.updatePhotoThunk({
//     imageId: 1,
//     title: 'UPDATED PHOTO',
//     description: "UPDATED DESCRIPTION",
//   })
// );

// window.store.dispatch(window.photosActions.deletePhotoThunk(1, 11));
