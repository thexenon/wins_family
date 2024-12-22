const Scripture = require('./../models/scriptureModel');
const factory = require('./handlerFactory');
// const multer = require('multer');
// const sharp = require('sharp');
// const videolib = require('fluent-ffmpeg');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
// const APIFeatures = require('./../utils/apiFeatures');

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
//     cb(null, true);
//   } else {
//     cb(
//       new AppError(
//         'Not an image or video. Please upload just images or video',
//         400,
//       ),
//       false,
//     );
//   }
// };

// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// exports.uploadScriptureImages = upload.fields([
//   { name: 'fileSRC', maxCount: 1 },
//   { name: 'images', maxCount: 3 },
// ]);

// exports.resizeScriptureImages = catchAsync(async (req, res, next) => {
//   if (!req.files.fileSRC || !req.files.images) return next();

//   // 1) Source Image
//   if (req.files.fileSRC[0].mimetype.startsWith('image')) {
//     req.body.fileSRC = `scripture-${req.params.id}.jpeg`;
//     await sharp(req.files.fileSRC[0].buffer)
//       .resize(2000, 1333)
//       .toFormat('jpeg')
//       .jpeg({ quality: 90 })
//       .toFile(`public/img/scriptures/${req.body.fileSRC}`);

//     // 2) Source Video
//   } else if (req.files.fileSRC[0].mimetype.startsWith('video')) {
//     // TODO: WORK ON VIDEO UPLOAD
//     req.body.fileSRC = `scripture-${req.params.id}.mp4`;
//     await videolib()
//       .input(req.files.fileSRC[0].originalname)
//       .toFormat('mp4')
//       .output(`public/vid/scriptures/${req.body.fileSRC}.mp4`)
//       .saveToFile(`public/vid/scriptures/${req.body.fileSRC}.mp4`)
//       .on('end', () => {
//         console.log('====================================');
//         console.log('Video formated');
//         console.log('====================================');
//       })
//       .on('error', (err) => {
//         console.log('====================================');
//         console.log('Video not formated');
//         console.log(err);
//         console.log('====================================');
//       })
//       .run();
//   }

//   // Images
//   req.body.images = [];
//   await Promise.all(
//     req.files.images.map(async (file, index) => {
//       const filename = `scripture-${req.params.id}-${index + 1}.jpeg`;
//       await sharp(file.buffer)
//         // await sharp(req.files.images[index].buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/scriptures/${filename}`);

//       req.body.images.push(filename);
//     }),
//   );

//   console.log('====================================');
//   console.log(req.body);
//   console.log('====================================');

//   next();
// });

exports.deleteScripture = factory.deleteOne(Scripture);
exports.getAllScriptures = factory.getAll(Scripture, { path: 'comments' });
exports.getSingleScripture = factory.getOne(Scripture, { path: 'comments' });
exports.addNewScripture = factory.createOne(Scripture);
exports.updateScripture = factory.updateOne(Scripture);
exports.updateScriptureReaction = factory.updateArray(Scripture);

// exports.getScriptureStats = catchAsync(async (req, res, next) => {
//   const stats = await Scripture.aggregate([
//     {
//       $match: { ratingsAverage: { $gte: 1.0 } },
//     },
//     {
//       $group: {
//         _id: { $toUpper: '$difficulty' },
//         numScriptures: { $sum: 1 },
//         numRatings: { $sum: '$ratingsQuantity' },
//         avgRating: { $avg: '$ratingsAverage' },
//         avgPrice: { $avg: '$price' },
//         minPrice: { $min: '$price' },
//         maxPrice: { $max: '$price' },
//       },
//     },
//     {
//       $sort: { avgPrice: 1 },
//     },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: stats,
//   });
// });
