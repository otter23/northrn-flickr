import React, { useState } from 'react';
import * as photosActions from '../../store/photos';
import * as commentsActions from '../../store/comments';
import { useDispatch } from 'react-redux';

const DeleteImageForm = ({
  setDeleted,
  setDeleteFormHidden,
  deleteFormHidden,
  userId,
  imageId,
}) => {
  const dispatch = useDispatch();

  const [deleteErrors, setDeleteErrors] = useState([]);

  //on submit dispatch deletePhotoThunk
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    setDeleteErrors([]); //reset error state

    // send request to backend API image route (DELETE api/image/:imageId)
    try {
      const response = await dispatch(
        photosActions.deletePhotoThunk(userId, imageId)
      );

      dispatch(commentsActions.deleteImageComments(imageId));

      if (response.ok) {
        setDeleted(true);
        document.getElementById('root').classList.remove('overflow');
        return;
      }
    } catch (errorResponse) {
      const data = await errorResponse.json();
      if (data && data.errors) setDeleteErrors(data.errors);
    }
  };

  return (
    <div
      className={`imageP-delete-form-container ${
        deleteFormHidden ? 'hidden' : ''
      }`}
    >
      {deleteErrors.length > 0 && (
        <div className='imageP-error-container'>
          {deleteErrors.map((error, idx) => (
            <p className='imageP-error-message' key={idx}>
              {error}
            </p>
          ))}
        </div>
      )}

      <form className='imageP-delete-form' onSubmit={handleDeleteSubmit}>
        <div className='imageP-delete-text1'>
          <span>Delete Photo</span>
        </div>
        <div className='imageP-delete-text2'>
          <span>Do you want to permanently delete this photo?</span>
        </div>

        <div className='imageP-delete-form-btn-div'>
          <div className='imageP-btn-container'>
            <button
              className='imageP-cancel-btn'
              type='button'
              onClick={() => {
                setDeleteFormHidden(true);
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

export default DeleteImageForm;
