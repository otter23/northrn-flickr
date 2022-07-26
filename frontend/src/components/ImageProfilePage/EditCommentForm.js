import React, { useState, useRef, useEffect } from 'react';
import * as commentsActions from '../../store/comments';
import { useDispatch } from 'react-redux';

const EditCommentForm = ({
  setErrors,
  hideEditForm,
  comment,
  resetCommentToBeEdited,
}) => {
  const dispatch = useDispatch();

  const buttonComment = useRef(null);
  const [buttonCommentHidden, setButtonCommentHidden] = useState(false);

  const commentForm = useRef(null);

  const commentInput = useRef(null);
  const [updatedComment, setUpdatedComment] = useState(comment.comment);
  const [colorCommentBorder, setColorCommentBorder] = useState(false);

  useEffect(() => {
    commentInput.current?.focus();
    let len = updatedComment?.length;
    commentInput.current?.setSelectionRange(len, len);
    setColorCommentBorder(true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // const regex = /[a-zA-Z]+/;
    if (updatedComment.length === 0) {
      setButtonCommentHidden(true);
      // } else if (!regex.test(updatedComment)) {
      //   setButtonCommentHidden(true);
    } else {
      setButtonCommentHidden(false);
    }
  }, [updatedComment]);

  //Allow 'Enter' to submit form request. Can still use Shift + Enter to create new lines
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

    // send request to backend API image route (POST api/comments/)
    try {
      //could add a prev state holder, and then only send request if prev and current don't match
      const response = await dispatch(
        commentsActions.updateCommentThunk({
          commentId: comment.id,
          comment: updatedComment,
        })
      );

      if (response.ok) {
        setButtonCommentHidden(true);
        resetCommentToBeEdited();
        hideEditForm();
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
          colorCommentBorder ? 'imageP-form-group-color' : ''
        }`}
      >
        <label></label>
        <textarea
          id='updateComment'
          className='imageP-newComment-textarea'
          rows='4'
          // cols='30'
          placeholder='Add a comment'
          name='updateComment'
          value={updatedComment ?? ''}
          ref={commentInput}
          onKeyDown={onEnterPress}
          onChange={(e) => setUpdatedComment(e.target.value)}
          onFocus={() => setColorCommentBorder((prev) => !prev)}
          onBlur={() => setColorCommentBorder((prev) => !prev)}
        ></textarea>
      </div>

      <div className={`imageP-comment-btn-container`} ref={buttonComment}>
        <button
          className={`imageP-comment-btn`}
          type='submit'
          disabled={buttonCommentHidden}
        >
          Done
        </button>
      </div>
      <div>{/* <div>Icon</div> */}</div>
    </form>
  );
};

export default EditCommentForm;
