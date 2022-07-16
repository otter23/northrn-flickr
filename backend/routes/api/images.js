// api/images

const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Image, JoinImageAlbum, Comment } = require('../../db/models');

//error validation functions
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

//AWS helper functions
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

//GET ALL IMAGES IN DATABASE - //maybe add to /explore
router.get(
  '/',
  asyncHandler(async (req, res) => {
    //query db for all images
    const images = await Image.findAll({ order: [['createdAt', 'DESC']] });

    return res.json(images);
  })
);

//GET IMAGE BY ID
router.get(
  '/:imageId(\\d+)',
  asyncHandler(async (req, res) => {
    const imageId = req.params.imageId;

    //query db for all images that belong to user
    const image = await Image.findByPk(imageId);

    return res.json(image);
  })
);

//validation for the image creation form
// description can be null and unlimited length
const validateImage = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a title for your Image'),
  // check('description')
  //   .isLength({ max: 255 })
  //   .withMessage('Description can only be 255 characters'),
  // check('imageUrl')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Please provide an ImageUrl'),
  handleValidationErrors,
];

//ADD PHOTO URL - LOGGED-IN USER ONLY
// router.post(
//   '/',
//   requireAuth, //if no user info in verified jwt, then will throw error
//   validateImage, //if validation errors, errors thrown with array of error messages
//   asyncHandler(async (req, res) => {
//     const sessionUserId = parseInt(req.user.id, 10); //ensures will only succeed if requireAuth succeeds
//     const { title, description, imageUrl, userId } = req.body;

//     if (sessionUserId === userId) {
//       const newImage = await Image.create({
//         userId,
//         title,
//         description,
//         imageUrl,
//       });

//       return res.json(newImage);
//       // return res.redirect(`${req.baseUrl}/${newImage.id}`);
//     } else {
//       res.status(401);
//       return res.json({ errors: 'Unauthorized' });
//     }
//   })
// );

//ADD PHOTO AWS - LOGGED-IN USER ONLY
router.post(
  '/',
  requireAuth, //if no user info in verified jwt, then will throw error
  singleMulterUpload('image'), //adds image file to req
  validateImage, //if validation errors, errors thrown with array of error messages
  asyncHandler(async (req, res) => {
    const sessionUserId = parseInt(req.user.id, 10); //ensures will only succeed if requireAuth succeeds
    const { title, description, userId } = req.body;

    if (sessionUserId === parseInt(userId, 10)) {
      //uploads file to aws and returns source url
      const imageUrl = await singlePublicFileUpload(req.file);
      //add image to database
      const newImage = await Image.create({
        userId,
        title,
        description,
        imageUrl,
      });

      return res.json(newImage);
      // return res.redirect(`${req.baseUrl}/${newImage.id}`);
    } else {
      res.status(401);
      return res.json({ errors: 'Unauthorized' });
    }
  })
);

const validateImageUpdate = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('An image must have a title'),
  handleValidationErrors,
];

//UPDATE PHOTO - LOGGED-IN USER ONLY
router.patch(
  '/:imageId(\\d+)',
  requireAuth,
  validateImageUpdate, //if validation errors, errors thrown with array of error messages
  asyncHandler(async (req, res) => {
    const sessionUserId = parseInt(req.user.id, 10);
    const imageId = req.params.imageId;

    const imageToUpdate = await Image.findByPk(imageId);

    if (!imageToUpdate) {
      res.status(422);
      return res.json({ errors: 'Image not found' });
    }

    const { title, description } = req.body; //user not allowed to update imageUrl

    //check if image belongs to signed in user
    if (sessionUserId === imageToUpdate.userId) {
      const updatedImage = await imageToUpdate.update({ title, description });
      return res.json(updatedImage);
    } else {
      res.status(401);
      return res.json({ errors: 'Unauthorized' });
    }
  })
);

//DELETE PHOTO - LOGGED-IN USER ONLY
router.delete(
  '/:imageId(\\d+)',
  requireAuth,
  asyncHandler(async (req, res) => {
    //grab id of logged in user
    const sessionUserId = parseInt(req.user.id, 10);
    const imageId = req.params.imageId;

    const imageToDelete = await Image.findByPk(imageId);

    if (!imageToDelete) {
      res.status(422);
      return res.json({ errors: 'Image not found' });
    }

    //check if image belongs to signed in user
    if (sessionUserId === imageToDelete.userId) {
      //Destroy Images dependencies first:
      //find all albums associated to the imageId
      const albumAssociations = await JoinImageAlbum.findAll({
        where: { imageId },
      });
      //find all comments associated to the imageId
      const imageComments = await Comment.findAll({
        where: { imageId },
      });

      //if associations exist destroy them
      if (albumAssociations.length > 0) {
        //delete all of the many to many relationship records
        await JoinImageAlbum.destroy({ where: { imageId } });
      }
      if (imageComments.length > 0) {
        await Comment.destroy({ where: { imageId } });
      }

      // once dependencies destroyed, delete image from database
      await Image.destroy({ where: { id: imageId } });

      return res.json({ message: 'Success' });
    } else {
      res.status(401);
      return res.json({ errors: 'Unauthorized' });
    }
  })
);

//GET ALL IMAGE COMMENTS by imageId
router.get(
  '/:imageId(\\d+)/comments',
  asyncHandler(async (req, res) => {
    //grab id of image
    const imageId = req.params.imageId;

    //query db for all comments that belong to image
    const comments = await Comment.findAll({
      where: { imageId },
      order: [['createdAt', 'DESC']],
    });

    return res.json(comments);
  })
);

module.exports = router;

//Test Routes

//GET ALL IMAGES
// fetch("/api/images").then( res => res.json() ).then(data => console.log(data) )

//GET ALL USER IMAGES
// fetch("/api/users/1/images").then( res => res.json() ).then(data => console.log(data) )

//GET ONE Image by imageId
// fetch("/api/images/2").then( res => res.json() ).then(data => console.log(data) )

//POST
// csrfFetch('/api/images', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'test',
//     description: 'test',
//     imageUrl:
//       'https://images.pexels.com/photos/459198/pexels-photo-459198.jpeg',
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//PATCH
// csrfFetch('/api/images/11', {
//   method: 'PATCH',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'UPDATED',
//     description: 'ALSO UPDATED',
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// DELETE
// csrfFetch('/api/images/1', {
//   method: 'DELETE',
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//GET ALL IMAGE Comments
// fetch("/api/images/1/comments").then( res => res.json() ).then(data => console.log(data) )
