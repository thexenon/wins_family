const express = require('express');
const scriptureController = require('../controllers/scriptureController');
const authController = require('../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

router.use('/:scriptureId/comments', commentRouter);
router
  .route('/:scriptureId/reaction/:userID')
  .patch(authController.protect, scriptureController.updateScripture);
router
  .route('/')
  .get(scriptureController.getAllScriptures)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'head'),
    scriptureController.addNewScripture,
  );

router
  .route('/:id')
  .get(scriptureController.getSingleScripture)
  .patch(authController.protect, scriptureController.updateScripture)
  .delete(
    authController.protect,
    authController.restrictTo('head', 'admin'),
    scriptureController.deleteScripture,
  );

module.exports = router;
