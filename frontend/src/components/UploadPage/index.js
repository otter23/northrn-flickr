import './UploadPage.css';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import * as photosActions from '../../store/photos';

import Navigation from '../Navigation';

import flickrIcon from '../../images/n_flickr_birds.svg';

//can only visit this page if logged in
export default function UploadPage({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const uploadPhotoInputRef = useRef(null);

  // subscribe to session redux State
  const sessionUser = useSelector((state) => state.session.user);
  const [userId, setUserId] = useState(null);
  //load userId to state once userSession is loaded
  useEffect(() => {
    if (sessionUser) setUserId(sessionUser.id);
  }, [isLoaded, sessionUser]);

  // subscribe to session redux State
  const photos = useSelector((state) => state.photos);

  //slices of react state for controlled inputs and error handling
  const [title, setTitle] = useState('');
  const [titleLabel, setTitleLabel] = useState(false);

  const [description, setDescription] = useState('');
  const [descriptionLabel, setDescriptionLabel] = useState(false);

  // const [imageUrl, setImageUrl] = useState('');
  const [imageUrlLabel, setImageUrlLabel] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState(null);

  const [errors, setErrors] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [uploadedImg, setUploadedImg] = useState({});

  const [count, setCount] = useState(1000);

  useEffect(() => {
    if (userId) {
      if (photos[userId]) {
        setCount(1000 - Object.values(photos[userId]).length);
      }
    }
  }, [userId, photos]);

  //single file upload
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
    if (file) setImageName(file.name);
    // if (file && !title) setTitle(file.name);
  };

  //when click wrapper div, initiate file input
  const focusFileSelector = () => uploadPhotoInputRef.current.click();

  // function isImage(url) {
  //   return /\.(jpg|jpeg|png|webp|avif|gif|svg)(\?.*)?$/.test(url);
  // }
  function isImage(file) {
    const test = file.type.split('/')[1];
    return /(jpg|jpeg|pjpeg|bmp|png|apng|webp|avif|gif|svg|tiff)/.test(test);
  }

  //pass in file.size
  function returnFileSize(number) {
    if (number < 1024) {
      return number + 'bytes';
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB';
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + 'MB';
    }
  }

  //on submit dispatch addPhotoThunk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); //reset error state

    // if (!isImage(imageUrl)) {
    //   return setErrors(['Please provide a url linked directly to an image.']);
    // }

    //if no image file or wrong image file
    if (!imageFile) return setErrors(['Please provide an image file.']);
    if (!isImage(imageFile))
      return setErrors(['Please provide an image file.']);

    // send request to backend API image route (POST api/image/)
    try {
      const response = await dispatch(
        photosActions.addPhotoThunk({
          userId,
          title,
          description: description || null,
          imageFile,
        })
      );

      if (response.ok) {
        setUploadSuccess(true);
        setUploadedImg(response.userPhoto);

        //reset form
        setTitle('');
        setDescription('');
        // setImageUrl('');
        setImageFile(null);

        return history.push(`/photos/${userId}/${response.userPhoto.id}`);
        //once page built can have redirect here:
      }
    } catch (errorResponse) {
      if (errorResponse.status === 401) {
        setErrors(['Unauthorized']);
        return;
      }
      //TO DO add sequelize error handling parsing
      const data = await errorResponse.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  // If not logged-in, redirect to login page without a render
  if (!sessionUser) {
    return <Redirect to='/login' />;
    // } else if (uploadSuccess) { //loses race condition
    //   return <Redirect to={`/photos/${userId}/${uploadedImg.id}`} />;
  } else {
    return (
      <>
        <Navigation isLoaded={isLoaded} />

        <div className='upload-secondNav-container'></div>

        <div className='upload-body-container'>
          <div className='upload-page-header'>
            <span>You can upload {count} more photos and videos.</span>
          </div>

          <div className='upload-card-container'>
            <div className='upload-card'>
              <div className='upload-logo-icon-container'>
                <img
                  src={flickrIcon}
                  alt='logo icon'
                  viewBox='0 0 100 100'
                  preserveAspectRatio='xMidYMid meet'
                  className='upload-logo-icon'
                />
              </div>

              <h6 className='upload-header'>Upload a Photo</h6>

              {errors.length > 0 && (
                <div className='upload-error-container'>
                  {errors.map((error, idx) => (
                    <p className='upload-error-message' key={idx}>
                      {error}
                    </p>
                  ))}
                </div>
              )}

              <form
                className={`upload-form-control`}
                autoComplete='off'
                onSubmit={handleSubmit}
              >
                <div
                  className={`upload-form-group ${
                    titleLabel ? 'upload-form-group-color' : ''
                  }`}
                >
                  <label
                    className={`upload-label ${
                      title.length > 0 || titleLabel ? 'upload-label-small' : ''
                    } ${titleLabel ? 'upload-label-color' : ''}`}
                    htmlFor='title'
                  >
                    Title
                  </label>
                  <input
                    id='title'
                    className={`upload-input`}
                    type='text'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => setTitleLabel((prev) => !prev)}
                    onBlur={() => setTitleLabel((prev) => !prev)}
                    required
                  />
                </div>

                <div
                  className={`upload-form-group ${
                    descriptionLabel ? 'upload-form-group-color' : ''
                  }`}
                >
                  <label
                    className={`upload-label ${
                      description.length > 0 || descriptionLabel
                        ? 'upload-label-small'
                        : ''
                    } ${descriptionLabel ? 'upload-label-color' : ''}`}
                    htmlFor='description'
                  >
                    Description
                  </label>
                  <input
                    id='description'
                    className={`upload-input`}
                    type='text'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onFocus={() => setDescriptionLabel((prev) => !prev)}
                    onBlur={() => setDescriptionLabel((prev) => !prev)}
                  />
                </div>

                {/* <div
                  className={`upload-form-group ${
                    imageUrlLabel ? 'upload-form-group-color' : ''
                  }`}
                >
                  <label
                    className={`upload-label ${
                      imageUrl.length > 0 || imageUrlLabel
                        ? 'upload-label-small'
                        : ''
                    } ${imageUrlLabel ? 'upload-label-color' : ''}`}
                    htmlFor='imageUrl'
                  >
                    Photo Url
                  </label>
                  <input
                    id='imageUrl'
                    className={`upload-input`}
                    type='text'
                    name='imageUrl'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onFocus={() => setImageUrlLabel((prev) => !prev)}
                    onBlur={() => setImageUrlLabel((prev) => !prev)}
                    required
                  />
                </div> */}

                <div
                  className={`upload-form-group upload-photo-container ${
                    imageUrlLabel ? 'upload-form-group-color' : ''
                  }`}
                  onClick={focusFileSelector}
                >
                  <label
                    className={`upload-label upload-photo-label ${
                      imageFile || imageUrlLabel ? 'upload-label-small' : ''
                    } ${imageUrlLabel ? 'upload-label-color' : ''}`}
                    // htmlFor='imageUpload'
                  >
                    Choose Photo to Upload
                  </label>
                  <input
                    id='imageUpload'
                    className={`upload-input upload-photo`}
                    type='file'
                    //gray out unacceptable file choices, can use image/*.
                    accept='.jpg,.jpeg,.png,.webp,.avif,.gif,.svg,'
                    name='imageUpload'
                    // value={imageFile} //not a controlled input
                    ref={uploadPhotoInputRef}
                    onChange={updateFile}
                    // required
                  />
                  <textarea
                    id='imageUpload-text'
                    className={`upload-input upload-photo-text`}
                    type='text'
                    name='imageUpload-text'
                    value={imageName ?? ''}
                    // onChange={(e) => setImageName(e.target.value)}
                    onFocus={() => setImageUrlLabel((prev) => !prev)}
                    onBlur={() => setImageUrlLabel((prev) => !prev)}
                    disabled
                  />
                </div>
                {imageFile ? (
                  <div
                    className={`upload-form-group upload-fil-size ${
                      imageUrlLabel ? 'upload-form-group-color' : ''
                    }`}
                  >
                    <div className={`upload-fil-size-text`}>
                      File Size: {returnFileSize(imageFile?.size)}{' '}
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <div className='upload-btn-container'>
                  <button className='upload-btn' type='submit'>
                    Upload
                  </button>
                </div>
              </form>

              <div
                className={`upload-success ${
                  uploadSuccess ? '' : 'upload-hidden'
                }`}
              >
                <div className='upload-success-text'>Photo Uploaded!</div>
                <Link to={`/photos/${userId}/${uploadedImg.id}`}>
                  <img
                    className='uploaded-image'
                    src={uploadedImg.imageUrl}
                    // EX: 'https://images.pexels.com/photos/54108/peacock-bird-spring-animal-54108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    alt='uploaded'
                  ></img>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
