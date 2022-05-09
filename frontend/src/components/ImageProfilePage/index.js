import './ImageProfile.css';
import React, { useEffect, useState, useRef } from 'react';
import * as photosActions from '../../store/photos';
import * as commentsActions from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, Redirect } from 'react-router-dom';

import Navigation from '../Navigation';
import Footer from '../Footer';
import CommentForm from './CommentForm';
import DeleteImageForm from './DeleteImageForm';
// import UpdateImageForm from './UpdateImageForm';

// import cartIcon from '../../images/icons/cart-icon.svg';
import shareIcon from '../../images/icons/share-icon.svg';
import userIcon from '../../images/demoUser-icon.jpg';

// import defaultUserPhoto from '../../images/login-bg-2000x1333.jpg';
// import defaultCoverPhoto from '../../images/login-bg-2000x1333.jpg';

export default function ImageProfilePage({ isLoaded }) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { imageId } = useParams();

  // subscribe to redux session states
  const sessionUser = useSelector((state) => state.session.user);
  // const users = useSelector((state) => state.users); //not built yet
  const allPhotos = useSelector((state) => state.photos.allPhotos);
  const userPhotos = useSelector((state) => state.photos[userId]);
  const imageComments = useSelector((state) => state.comments[imageId]);

  const [userRouteOk, setUserRouteOk] = useState(false);
  const [imageRouteOk, setImageRouteOk] = useState(false);
  const [renderReady, setRenderReady] = useState(false);
  //controls whether session User can edit a page
  const [isAuthorized, setIsAuthorized] = useState(false);

  //slices of react state for controlled inputs and error handling
  const [deleted, setDeleted] = useState(false);
  const [deleteFormHidden, setDeleteFormHidden] = useState(true);

  const form = useRef(null);
  const [formHidden, setFormHidden] = useState(true);

  const [title, setTitle] = useState('');
  const [prevTitle, setPrevTitle] = useState('');
  const [titleLabel, setTitleLabel] = useState(false);

  const [description, setDescription] = useState('');
  const [prevDescription, setPrevDescription] = useState('');
  const [descriptionLabel, setDescriptionLabel] = useState(false);

  const [errors, setErrors] = useState([]);

  //NOTE: photos.allPhotos eager loaded before app can render component
  //NOTE:logged in user photos are eager loaded on app initiation or upon login

  // check if URL user exists, if so load URL User's images to state
  //ALT: could make new thunk to send a findOne() to API route and see if image or user exists in db...
  useEffect(() => {
    //check Redux State for user, returns -1 if no instances found, otherwise returns first index
    const userExists = allPhotos?.findIndex(
      (image) => image.userId === parseInt(userId)
    );

    if (userExists !== -1) {
      dispatch(photosActions.getUserPhotosThunk(userId)).then(() => {
        setRenderReady(true); //ensures user photos in state before rendering
      });
      setUserRouteOk(true);
    }

    //adding allPhotos state to dependency list creates infinite loop, only need to run once
  }, [userId, imageId, dispatch]); // how get rid of complaint?

  //check if image exists in state, again prob better to check db...
  useEffect(() => {
    //once user's in state check to see if image exists

    const imageExists = userPhotos && userPhotos[imageId];
    if (imageExists) {
      dispatch(commentsActions.getImageCommentsThunk(imageId)).then(() => {
        // setRenderReady(true); //ensures user photos in state before rendering
      });
      setImageRouteOk(true);
    }

    //run again once userPhotos updates
  }, [userId, imageId, userPhotos]);

  //update authorization state if page userId and session user match
  useEffect(() => {
    if (sessionUser?.id === parseInt(userId)) {
      setIsAuthorized(true);
    }
  }, [userId, sessionUser]);

  //Initialize image's description and title and form values
  useEffect(() => {
    if (userPhotos) {
      setTitle(userPhotos[imageId]?.title);
      setDescription(
        userPhotos[imageId]?.description ? userPhotos[imageId]?.description : ''
      );
    }
  }, [imageId, userId, userPhotos]);

  //Check focus of title/description form
  useEffect(() => {
    //if form already hidden do nothing
    if (formHidden) return;

    const hideForm = ({ target }) => {
      if (target !== form.current && !form.current.contains(target)) {
        setTitle(prevTitle);
        setDescription(prevDescription);
        setFormHidden((prev) => !prev);
        // handleSubmit()
        // console.log('reached here');
        // console.log(title);
        // console.log(description);
        // form.current.onsubmit = handleSubmit;
        // form.current.dispatchEvent(new Event('submit'));
        //TO DO use context so title available between renders
      }
    };

    document.addEventListener('click', hideForm);
    // if (document.hasFocus() && form.current.contains(document.activeElement)) {setFocus(true);}});

    //cleanup function
    return () => document.removeEventListener('click', hideForm);
  }, [formHidden, prevDescription, prevTitle]);

  //on submit dispatch updatePhotoThunk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    // send request to backend API image route (PATCH api/image/:imageId)
    try {
      //could add a prev state holder, and then only send request if prev and current don't match
      const response = await dispatch(
        photosActions.updatePhotoThunk({
          imageId,
          title,
          description: description || null,
        })
      );

      if (response.ok) {
        setFormHidden(true);
        return;
      }
    } catch (errorResponse) {
      const data = await errorResponse.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  // console.log('BEFORE:', userRouteOk);
  // console.log('BEFORE:', imageRouteOk);

  if (deleted) {
    alert('Image successfully deleted, redirecting to photostream');
    return <Redirect to={`/photos/${userId}`} />;
  } else if (!userRouteOk && renderReady)
    return (
      <Redirect
        onLoad={alert("User doesn't exist, redirecting to Homepage.")}
        to={`/`}
      />
    );
  else if (!imageRouteOk && renderReady) {
    return (
      <Redirect
        onLoad={alert("Image doesn't exist, redirecting to User's Page.")}
        to={`/photos/${userId}`}
      />
    );
  } else if (renderReady) {
    return (
      <>
        <DeleteImageForm
          setDeleted={setDeleted}
          setDeleteFormHidden={setDeleteFormHidden}
          deleteFormHidden={deleteFormHidden}
          userId={userId}
          imageId={imageId}
        />

        <div className='imageP-root-inner'>
          <Navigation isLoaded={isLoaded} />
          <div className='imageP-photo-div'>
            <div className='imageP-photo-div-inner'>
              <div className='imageP-photostream-div'>
                <Link className='imageP-photostream' to='/photos/1'></Link>
              </div>
              <img
                className='imageP-photo'
                src={
                  `${userPhotos && userPhotos[imageId]?.imageUrl}`
                  // 'https://images.pexels.com/photos/54108/peacock-bird-spring-animal-54108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                }
                alt='specific'
              ></img>
              <div className='imageP-photo-tools'>
                <div
                  className={`imageP-delete-button ${
                    isAuthorized ? '' : 'hidden'
                  }`}
                  onClick={() => {
                    setDeleteFormHidden((prev) => !prev);
                    document
                      .getElementById('root')
                      .classList.toggle('overflow');
                  }}
                >
                  <span className='material-symbols-outlined'>delete</span>
                </div>
                <div>
                  <img
                    className='imageP-icon'
                    src={shareIcon}
                    alt='facebook icon'
                  />
                </div>
                <div>
                  <span className='material-symbols-outlined'>
                    file_download
                  </span>
                </div>
                <div>
                  <span className='material-symbols-outlined'>
                    shopping_cart
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='imageP-body-lower-container'>
            <div className='imageP-body-lower-inner'>
              <div className={`imageP-title-desc-container`}>
                {/* <div className='imageP-profile-img'></div> */}
                <Link
                  to={`/photos/${userId}`}
                  className='imageP-profile-image'
                  style={{ backgroundImage: `url(${userIcon})` }}
                ></Link>

                <div className='imageP-username-title-div'>
                  <div className='imageP-username'>
                    <Link to={`/photos/${userId}`}>username</Link>
                  </div>
                  <div
                    className={`imageP-title-desc-div
                ${formHidden ? '' : 'hidden'}
                ${isAuthorized ? '' : 'noPointer'}   `}
                    onClick={() => {
                      if (isAuthorized) setFormHidden((prev) => !prev);
                      setPrevTitle(title);
                      setPrevDescription(description);
                      form.current.focus();
                    }}
                  >
                    <div className='imageP-title'>{title}</div>
                    <div className='imageP-desc'>{description}</div>
                  </div>

                  <form
                    className={`imageP-form-control ${
                      formHidden ? 'hidden' : ''
                    }`}
                    autoComplete='off'
                    onSubmit={handleSubmit}
                    // tabIndex={0} //can use to make any element focusable
                    ref={form}
                  >
                    {errors.length > 0 && (
                      <div className='imageP-error-container'>
                        {/* <p className='signup-error-message'>Invalid email or password.</p> */}
                        {errors.map((error, idx) => (
                          <p className='imageP-error-message' key={idx}>
                            {error}
                          </p>
                        ))}
                      </div>
                    )}

                    <div
                      className={`imageP-form-group ${
                        titleLabel ? 'imageP-form-group-color' : ''
                      }`}
                    >
                      <label
                        className={`imageP-label ${
                          title?.length > 0 || titleLabel
                            ? 'imageP-label-small'
                            : ''
                        } ${titleLabel ? 'imageP-label-color' : ''}`}
                        htmlFor='title'
                      >
                        Title
                      </label>
                      <input
                        id='title'
                        className={`imageP-input`}
                        type='text'
                        name='title'
                        //value prop must always be set to at least a string default value
                        value={title ?? ''}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setTitleLabel((prev) => !prev)}
                        onBlur={() => setTitleLabel((prev) => !prev)}
                        required
                      />
                    </div>

                    <div
                      className={`imageP-form-group ${
                        descriptionLabel ? 'imageP-form-group-color' : ''
                      }`}
                    >
                      <label
                        className={`imageP-label ${
                          description?.length > 0 || descriptionLabel
                            ? 'imageP-label-small'
                            : ''
                        } ${descriptionLabel ? 'imageP-label-color' : ''}`}
                        htmlFor='description'
                      >
                        Description
                      </label>
                      {/* TO DO CHANGE TO TEXTAREA */}
                      <input
                        id='description'
                        className={`imageP-input`}
                        type='text'
                        name='description'
                        value={description ?? ''}
                        onChange={(e) => setDescription(e.target.value)}
                        onFocus={() => setDescriptionLabel((prev) => !prev)}
                        onBlur={() => setDescriptionLabel((prev) => !prev)}
                      />
                    </div>

                    <div className='imageP-btn-container'>
                      <button className='imageP-btn' type='submit'>
                        Done
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='imageP-comment-list-container'>
                {imageComments &&
                  Object.values(imageComments).map((comment) => {
                    return (
                      <div
                        key={comment.id}
                        className='imageP-comment-container'
                      >
                        <Link
                          to={`/photos/${comment.userId}`}
                          className='imageP-comment-image'
                          style={{ backgroundImage: `url(${userIcon})` }}
                        ></Link>
                        <div className='imageP-comment-right-div'>
                          {/* add date of comment */}
                          <div className='imageP-comment-username-div'>
                            <Link to={`/photos/${comment.userId}`}>
                              username
                            </Link>
                          </div>
                          <div>{comment.comment}</div>
                        </div>
                      </div>
                    );
                  })}

                <div className='imageP-newComment-container'>
                  <div>
                    <div
                      className='imageP-newComment-image'
                      style={{ backgroundImage: `url(${userIcon})` }}
                    ></div>
                  </div>
                  <CommentForm
                    setErrors={setErrors}
                    sessionUser={sessionUser}
                    imageId={imageId}
                  />
                </div>
              </div>

              <div className='imageP-spacer-div'></div>
            </div>
          </div>

          <Footer />
        </div>
      </>
    );
  } else return;
}
