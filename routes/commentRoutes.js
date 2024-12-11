const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(commentController.getAllComments)
  .post(
    authController.protect,
    authController.restrictTo('member'),
    commentController.setScriptureUserIds,
    commentController.createComment,
  );

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(
    authController.restrictTo('member', 'admin', 'head'),
    commentController.updateComment,
  )
  .delete(
    authController.restrictTo('member', 'admin', 'head'),
    commentController.deleteComment,
  );

module.exports = router;
