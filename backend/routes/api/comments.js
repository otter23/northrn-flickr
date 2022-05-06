// api/comments

const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { Comment } = require('../../db/models');

//error validation functions
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

//GET ALL COMMENTS IN DATABASE
router.get(
  '/',
  asyncHandler(async (req, res) => {
    //query db for all comments
    const comments = await Comment.findAll({ order: [['createdAt', 'DESC']] });

    return res.json(comments);
  })
);

//GET COMMENT BY ID
router.get(
  '/:commentId(\\d+)',
  asyncHandler(async (req, res) => {
    const commentId = req.params.commentId;

    //query db for one comment
    const comment = await Comment.findByPk(commentId);

    return res.json(comment);
  })
);

//validation for the comment creation form
// comment can unlimited length but not null
const validateComment = [
  check('comment')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a comment'),
  // .isLength({min: 1})
  // .withMessage('Please provide a comment'),
  handleValidationErrors,
];

//ADD COMMENT - LOGGED-IN USER ONLY
//any logged in user can comment on their own or another user's photo
router.post(
  '/',
  requireAuth, //if no user info in verified jwt, then will throw error
  validateComment, //if validation errors, errors thrown with array of error messages
  asyncHandler(async (req, res) => {
    const sessionUserId = parseInt(req.user.id, 10); //ensures will only succeed if requireAuth succeeds
    const { userId, imageId, comment } = req.body;

    const newComment = await Comment.create({
      userId,
      imageId,
      comment,
    });

    return res.json(newComment);
  })
);

const validateCommentUpdate = [
  check('comment')
    .exists({ checkFalsy: true })
    .withMessage('A comment must have a text, use delete to remove comment.'),
  handleValidationErrors,
];

//UPDATE COMMENT - LOGGED-IN USER ONLY
router.patch(
  '/:commentId(\\d+)',
  requireAuth,
  validateCommentUpdate, //if validation errors, errors thrown with array of error messages
  asyncHandler(async (req, res) => {
    const sessionUserId = parseInt(req.user.id, 10);
    const commentId = req.params.commentId;

    const commentToUpdate = await Comment.findByPk(commentId);
    const { comment } = req.body;

    //check if comment belongs to signed in user
    if (sessionUserId === commentToUpdate.userId) {
      const updatedComment = await commentToUpdate.update({ comment });
      return res.json(updatedComment);
    } else {
      return res.json('Unauthorized');
    }
  })
);

//DELETE COMMENT - LOGGED-IN USER ONLY
router.delete(
  '/:commentId(\\d+)',
  requireAuth,
  asyncHandler(async (req, res) => {
    //grab id of logged in user
    const sessionUserId = parseInt(req.user.id, 10);
    const commentId = req.params.commentId;

    const commentToDelete = await Comment.findByPk(commentId);

    //check if comment belongs to signed in user
    if (sessionUserId === commentToDelete.userId) {
      // comments do not have any dependencies
      // delete comment from database
      await Comment.destroy({ where: { id: commentId } });

      return res.json({ message: 'Success' });
    } else {
      return res.json('Unauthorized');
    }
  })
);

module.exports = router;

//Test Routes

//GET ALL COMMENTs
// fetch('/api/comments')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//GET ALL USER COMMENTS
// fetch("/api/users/1/comments").then( res => res.json() ).then(data => console.log(data) )

//GET ONE Comment by commentId
// fetch("/api/comments/2").then( res => res.json() ).then(data => console.log(data) )

//POST
// csrfFetch('/api/comments', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     userId: '1',
//     imageId: '1',
//     comment: 'test',
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//PATCH
// csrfFetch('/api/comments/7', {
//   method: 'PATCH',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     comment: 'UPDATED',
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// DELETE
// csrfFetch('/api/comments/1', {
//   method: 'DELETE',
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));
