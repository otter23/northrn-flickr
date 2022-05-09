import React, { useState } from 'react';
import * as commentsActions from '../../store/comments';
import { useDispatch } from 'react-redux';

const DeleteCommentForm = ({
  setDeleteCommentFormHidden,
  deleteCommentFormHidden,
  commentId,
  imageId,
}) => {
  const dispatch = useDispatch();

  const [deleteErrors, setDeleteErrors] = useState([]);

  //on submit dispatch deletePhotoThunk
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    setDeleteErrors([]); //reset error state
    document.getElementById('root').classList.remove('overflow');

    // send request to backend API image route (DELETE api/image/:imageId)
    try {
      const response = await dispatch(
        commentsActions.deleteCommentThunk(imageId, commentId)
      );

      if (response.ok) {
        // setDeleted(true);
        setDeleteCommentFormHidden(true);
        return;
      }
    } catch (errorResponse) {
      const data = await errorResponse.json();
      if (data && data.errors) setDeleteErrors(data.errors);
      // console.log('ERRORS', deleteErrors);
    }
  };

  return (
    <div
      className={`imageP-delete-comment-form-container ${
        deleteCommentFormHidden ? 'hidden' : ''
      }`}
    >
      {deleteErrors.length > 0 && (
        <div className='imageP-error-container'>
          {deleteErrors?.map((error, idx) => (
            <p className='imageP-error-message' key={idx}>
              {error}
            </p>
          ))}
        </div>
      )}

      <form className='imageP-delete-form' onSubmit={handleDeleteSubmit}>
        <div className='imageP-delete-text1'>
          <span>Delete Comment</span>
        </div>
        <div className='imageP-delete-text2'>
          <span>Are you sure you want to delete this comment?</span>
        </div>

        <div className='imageP-delete-form-btn-div'>
          <div className='imageP-btn-container'>
            <button
              className='imageP-cancel-btn'
              type='button'
              onClick={() => {
                setDeleteCommentFormHidden(true);
                document.getElementById('root').classList.remove('overflow');
              }}
            >
              Cancel
            </button>
          </div>

          <div className='imageP-btn-container'>
            <button className='imageP-delete-btn' type='submit'>
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteCommentForm;
