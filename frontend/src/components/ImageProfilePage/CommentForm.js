import React, { useState, useRef } from 'react';
import * as commentsActions from '../../store/comments';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CommentForm = ({ setErrors, sessionUser, imageId, restartInterval }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const buttonComment = useRef(null);
  const [buttonCommentHidden, setButtonCommentHidden] = useState(true);

  const [newComment, setNewComment] = useState('');
  const [newCommentLabel, setNewCommentLabel] = useState(false);

  //Allow 'Enter' to submit form request. Can still use Shift + Enter to create new lines
  const commentForm = useRef(null);
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      commentForm.current?.requestSubmit();
    }
  };

  //on submit dispatch addCommentThunk
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    if (!sessionUser) {
      alert('Please login to post a comment. Redirecting you to login page.');
      history.push('/login');
      return;
    }

    // send request to backend API image route (POST api/comments/)
    try {
      //could add a prev state holder, and then only send request if prev and current don't match
      const response = await dispatch(
        commentsActions.addCommentThunk({
          userId: sessionUser.id,
          imageId,
          comment: newComment,
        })
      );

      if (response.ok) {
        setButtonCommentHidden(true);
        setNewComment('');
        restartInterval();
        return;
      }
    } catch (errorResponse) {
      const data = await errorResponse.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  return (
    <form
      className='imageP-newComment-form'
      onSubmit={handleCommentSubmit}
      autoComplete='off'
      ref={commentForm}
    >
      {/* TO DO: auto resize textarea */}
      <div
        className={`imageP-form-group ${
          newCommentLabel ? 'imageP-form-group-color' : ''
        }`}
      >
        <label></label>
        <textarea
          id='newComment'
          className='imageP-newComment-textarea'
          rows='4'
          // cols='30'
          placeholder='Add a comment'
          name='newComment'
          value={newComment ?? ''}
          onKeyDown={onEnterPress}
          onChange={(e) => setNewComment(e.target.value)}
          onFocus={() => {
            if (!newComment) {
              setButtonCommentHidden((prev) => !prev);
            }
            setNewCommentLabel((prev) => !prev);
          }}
          onBlur={() => {
            if (!newComment) {
              setButtonCommentHidden((prev) => !prev);
            }
            setNewCommentLabel((prev) => !prev);
          }}
        ></textarea>
      </div>

      <div className={`imageP-comment-btn-container`} ref={buttonComment}>
        <button
          className={`imageP-comment-btn ${
            buttonCommentHidden ? 'hidden' : ''
          }`}
          type='submit'
          disabled={newComment.length < 1}
        >
          Comment
        </button>
      </div>
      <div>{/* <div>Icon</div> */}</div>
    </form>
  );
};

export default CommentForm;
