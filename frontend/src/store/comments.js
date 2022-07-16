//Redux state slice to hold comments from db

import { csrfFetch } from './utils/csrf'; //restoreCSRF

//ACTION TYPES:
const GET_ALL_COMMENTS = 'comments/getAllComments';

const GET_IMAGE_COMMENTS = 'comments/getImageComments';
const ADD_COMMENT = 'comments/addComment';
const UPDATE_COMMENT = 'comments/updateComment';
const DELETE_COMMENT = 'comments/deleteComment';

//USED only to update the store after an image is deleted, which cascades and deleted all image comments
const DELETE_IMAGE_COMMENTS = 'comments/deleteImageComments';

//REGULAR ACTION CREATORS (implicit returns)

//payload: array of comment objects
export const getAllComments = (allComments) => ({
  type: GET_ALL_COMMENTS,
  payload: { allComments },
});

//Payload: one user comment object
export const addComment = (userComment) => ({
  type: ADD_COMMENT,
  payload: { userComment },
});

//payload: array of user Comment objects
export const getImageComments = (imageComments, imageId) => ({
  type: GET_IMAGE_COMMENTS,
  payload: { imageComments, imageId },
});

//Payload: one updated user Comment object
export const updateComment = (userComment) => ({
  type: UPDATE_COMMENT,
  payload: { userComment },
});

//Payload: imageId and commentId to key into commentByKey image object
export const deleteComment = (imageId, commentId) => ({
  type: DELETE_COMMENT,
  payload: { imageId, commentId },
});

export const deleteImageComments = (imageId) => ({
  type: DELETE_IMAGE_COMMENTS,
  payload: { imageId },
});

//THUNK ACTION CREATORS:

//ERROR HANDLING NOTES:
//fetch() function will automatically throw an error for network errors
//but not for HTTP errors such as 4xx or 5xx responses. EXCEPT 401 and 400
//status 422 is !res.ok so the else if will handle those sequel validation errors
//ALT: throw new Error(response.errors)
//In genera; need to throw non-network errors from a fetch

//Then, in component can check body for the error messages
//or check response for a .errors property for errors or unauthorized response:
// const resBody = await response.json();
// if (resBody.message !== 'Unauthorized') return 'Unauthorized';

//request to backend for all comments
//comments are pre-sorted by most recent in backend
export const getAllCommentsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/comments`);

  if (response.ok) {
    const allComments = await response.json();
    dispatch(getAllComments(allComments));
    return response;
  } else throw response;
  //un-needed, should always throw response so handle everything the same on the front end
  // else if (response.status === 422) {
  //   const resBody = await response.json();
  //   const resErr = new Error();
  //   resErr.errors = resBody.errors;
  //   throw resErr;
  // }
};

//request to backend for all of an images comments
//comments are pre-sorted by most recent in backend
export const getImageCommentsThunk = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}/comments`);

  if (response.ok) {
    const resBody = await response.json();

    //Normalize array into an object with  (Index comments by id):
    //idToComment or ImageCommentById
    let imageComments = {};
    resBody.forEach((comment) => {
      imageComments[comment.id] = comment;
    });

    dispatch(getImageComments(imageComments, imageId));
    return response;
  } else throw response;
};

//request to backend to add a single user Comment
export const addCommentThunk = (formData) => async (dispatch) => {
  const { userId, imageId, comment } = formData;
  const response = await csrfFetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      imageId,
      comment,
    }),
  });

  if (response.ok) {
    const userComment = await response.json();
    dispatch(addComment(userComment));
    response.userComment = userComment;
    return response;
  } else throw response;
};

//request to backend to update a single user Comment
export const updateCommentThunk = (formData) => async (dispatch) => {
  const { commentId, comment } = formData;

  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      comment,
    }),
  });

  if (response.ok) {
    const userComment = await response.json();
    // console.log('COMMENT:', userComment);
    dispatch(updateComment(userComment));
    response.userComment = userComment;
    return response;
  } else throw response;
};

//request to backend to delete a single user Comment
export const deleteCommentThunk = (imageId, commentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const resBody = await response.json();
    // console.log('DELETE: ', resBody);
    if (resBody.message === 'Success') {
      dispatch(deleteComment(imageId, commentId));
    }
    return response;
  } else throw response;
};

//Comment REDUCER:

// imageId1:  {commentId1: commentObj, commentId2: commentObj }, imageId2: {etc};
const initialState = { allComments: [] };
//in scalable version each imageId object would also have a property:    allImageComments:[]
//When map over image obj, need to first make it an array with Object.array in component

// allComments: [] - this will be for the landing page
//to update this part of state need to user .find or .findIndex
// explore: [] - this will be to store a list of Comments that matches a search query on the explore page

export default function commentsReducer(state = initialState, action) {
  Object.freeze(state);
  Object.freeze(state.allComments);
  Object.freeze(state.explore);

  //Deep Clone State:
  let allComments = [];
  state.allComments.forEach((comment) => {
    allComments.push({ ...comment });
  });

  const newState = { ...state, allComments };

  Object.keys(state).forEach((key) => {
    if (key !== 'allComments') {
      let imageObj = {};
      Object.values(state[key]).forEach((comment) => {
        imageObj[comment.id] = { ...comment };
      });
      newState[key] = imageObj;
    }
  });

  // optional chaining that works in transpiler, ?. doesn't work with Redux transpiler
  // USE instead: const testVar = action || {}.payload || {}.allComments;

  let imageId;
  let commentId;
  let index;

  switch (action.type) {
    case GET_ALL_COMMENTS:
      newState.allComments = action.payload.allComments;
      return newState;

    case GET_IMAGE_COMMENTS:
      imageId = action.payload.imageId;
      newState[imageId] = action.payload.imageComments;
      return newState;

    case ADD_COMMENT:
      imageId = action.payload.userComment.imageId;
      commentId = action.payload.userComment.id;
      //add Comment to beginning of array sorted by "createdAt"
      newState.allComments.unshift(action.payload.userComment);
      //add Comment to image CommentById map
      newState[imageId][commentId] = action.payload.userComment;
      return newState;

    case UPDATE_COMMENT:
      imageId = action.payload.userComment.imageId;
      commentId = action.payload.userComment.id;
      //find index of comment to update
      index = newState.allComments.findIndex(
        (comment) => comment.id === parseInt(commentId)
      );
      //replace comment in allComments array
      newState.allComments[index] = action.payload.userComment;
      //replace comment in userComment obj
      newState[imageId][commentId] = action.payload.userComment;
      return newState;

    case DELETE_COMMENT:
      imageId = action.payload.imageId;
      commentId = action.payload.commentId;
      //find index of comment to delete
      index = newState.allComments.findIndex(
        (comment) => comment.id === parseInt(commentId)
      );
      //remove comment from allComments array
      newState.allComments.splice(index, 1);
      //remove comment from imageComment obj
      delete newState[imageId][commentId];
      return newState;

    case DELETE_IMAGE_COMMENTS:
      imageId = action.payload.imageId;

      //NOTE THIS IS NOT SCALABLE, prob faster to just call Get_all_Comment instead
      //Remove each comment from allComments
      Object.keys(newState[imageId]).forEach((commentId) => {
        //find index of comment to delete
        index = newState.allComments.findIndex(
          (comment) => comment.id === commentId
        );
        //remove comment from allComments array
        newState.allComments.splice(index, 1);
      });

      //remove imageObj from state
      delete newState[imageId];
      return newState;

    default:
      return state;
  }
}

//TEST THUNKS:

//RUN THESE TWO FIRST BEFORE TESTING UPDATE AND DELETE

// window.store.dispatch(window.commentsActions.getAllCommentsThunk())
// window.store.dispatch(window.commentsActions.getImageCommentsThunk(1))

//TEST UNAUTHORIZED ids as well, e.g. photos not owned by the logged in user

//ADD COMMENT
// window.store.dispatch(
//   window.commentsActions.addCommentThunk({
//     userId: 1,
//     imageId: 1,
//     comment: 'NEWEST COMMENT CONTENT',
//   })
// ).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})

//UPDATE
// window.store.dispatch(
//   window.commentsActions.updateCommentThunk({
//     imageId: 1,
//     commentId: 11,
//     comment: 'UPDATED COMMENT',
//   })
// ).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})

//DELETE
// window.store.dispatch(window.commentsActions.deleteCommentThunk(1, 11)).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})

//DELETE IMAGE COMMENTS from store
// window.store.dispatch(window.commentsActions.deleteImageComments(22))

//EXAMPLE COMPONENT CODE WITH ERROR HANDLER
// try {
//       let createdPokemon = await dispatch(createPokemon(payload));

//       if (createdPokemon) {
//         history.push(`/pokemon/${createdPokemon.id}`);
//         hideForm();
//       }
//     } catch (e) {
//       console.log('ERRORS:', e.errors);
//       setErrors(e.errors);
//     }
//     console.log(errors);
//   };
