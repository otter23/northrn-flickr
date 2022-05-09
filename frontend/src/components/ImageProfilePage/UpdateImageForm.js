// import React, { useEffect, useState, useRef } from 'react';
// import * as photosActions from '../../store/photos';
// import * as commentsActions from '../../store/comments';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams, Redirect } from 'react-router-dom';

// export default function UpdateImageForm({ userId, imageId, userPhotos }) {
//   const dispatch = useDispatch();
//   const form = useRef(null);

//   //on submit dispatch updatePhotoThunk
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]); //reset error state

//     // send request to backend API image route (PATCH api/image/:imageId)
//     try {
//       //could add a prev state holder, and then only send request if prev and current don't match
//       const response = await dispatch(
//         photosActions.updatePhotoThunk({
//           imageId,
//           title,
//           description: description || null,
//         })
//       );

//       if (response.ok) {
//         setFormHidden(true);
//         return;
//       }
//     } catch (errorResponse) {
//       const data = await errorResponse.json();
//       if (data && data.errors) setErrors(data.errors);
//     }
//   };

//   return (
//     <form
//       className={`imageP-form-control ${formHidden ? 'hidden' : ''}`}
//       autoComplete='off'
//       onSubmit={handleSubmit}
//       // tabIndex={0} //can use to make any element focusable
//       ref={form}
//     >
//       {errors.length > 0 && (
//         <div className='imageP-error-container'>
//           {/* <p className='signup-error-message'>Invalid email or password.</p> */}
//           {errors.map((error, idx) => (
//             <p className='imageP-error-message' key={idx}>
//               {error}
//             </p>
//           ))}
//         </div>
//       )}

//       <div
//         className={`imageP-form-group ${
//           titleLabel ? 'imageP-form-group-color' : ''
//         }`}
//       >
//         <label
//           className={`imageP-label ${
//             title?.length > 0 || titleLabel ? 'imageP-label-small' : ''
//           } ${titleLabel ? 'imageP-label-color' : ''}`}
//           htmlFor='title'
//         >
//           Title
//         </label>
//         <input
//           id='title'
//           className={`imageP-input`}
//           type='text'
//           name='title'
//           //value prop must always be set to at least a string default value
//           value={title ?? ''}
//           onChange={(e) => setTitle(e.target.value)}
//           onFocus={() => setTitleLabel((prev) => !prev)}
//           onBlur={() => setTitleLabel((prev) => !prev)}
//           required
//         />
//       </div>

//       <div
//         className={`imageP-form-group ${
//           descriptionLabel ? 'imageP-form-group-color' : ''
//         }`}
//       >
//         <label
//           className={`imageP-label ${
//             description?.length > 0 || descriptionLabel
//               ? 'imageP-label-small'
//               : ''
//           } ${descriptionLabel ? 'imageP-label-color' : ''}`}
//           htmlFor='description'
//         >
//           Description
//         </label>
//         <input
//           id='description'
//           className={`imageP-input`}
//           type='text'
//           name='description'
//           value={description ?? ''}
//           onChange={(e) => setDescription(e.target.value)}
//           onFocus={() => setDescriptionLabel((prev) => !prev)}
//           onBlur={() => setDescriptionLabel((prev) => !prev)}
//         />
//       </div>

//       <div className='imageP-btn-container'>
//         <button className='imageP-btn' type='submit'>
//           Done
//         </button>
//       </div>
//     </form>
//   );
// }
