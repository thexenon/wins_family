const express = require('express');
const scriptureController = require('../controllers/scriptureController');
const authController = require('../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

router.use('/:scriptureId/comments', commentRouter);

router
  .route('/')
  .get(scriptureController.getAllScriptures)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'head'),
    scriptureController.addNewScripture,
    scriptureController.uploadScriptureImages,
    scriptureController.resizeScriptureImages,
  );

router
  .route('/:id')
  .get(scriptureController.getSingleScripture)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'head'),
    scriptureController.uploadScriptureImages,
    scriptureController.resizeScriptureImages,
    scriptureController.updateScripture,
  )
  .delete(
    authController.protect,
    authController.restrictTo('head'),
    scriptureController.deleteScripture,
  );

module.exports = router;
