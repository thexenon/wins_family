const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const scriptureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A title must be set'],
      trim: true,
      maxlength: [40, 'Title can not exceed 50 character'],
      minlength: [10, 'Title should exceed 10 character'],
    },
    slug: String,
    typeSRC: {
      type: String,
      required: [true, 'Type of file must be set'],
      enum: {
        values: ['Picture', 'Video'],
        message: 'Type of file is either ||Picture|Video||',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Summary must be set'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Description must be set'],
    },
    fileSRC: {
      type: String,
      required: [true, 'Image or Video file is required'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    reactions: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

scriptureSchema.index({ slug: 1 });

scriptureSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'scripture',
  localField: '_id',
});

scriptureSchema.virtual('reactionsTotal').get(function () {
  return this.reactions.length;
});

// scriptureSchema.virtual('commentsTotal').get(function () {
//   return this.comments.length;
// });

// Document middleware before save(), create() but not insertMany()
scriptureSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  console.log(this.slug);
  next();
});

// Query middleware
// scriptureSchema.pre(/^find/, function (next) {
//   // scriptureSchema.pre('find', function(next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

scriptureSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'reactions',
    // select: '-__v -passwordChangedAt',
  });
  next();
});

// scriptureSchema.post(/^find/, function (doc, next) {
//   this.find({ secretTour: { $ne: true } });
//   // console.log(`${Date.now()}`);
//   // console.log(`Query lasted: ${Date.now() - this.start} milliseconds`);

//   next();
// });

const Scripture = mongoose.model('Scripture', scriptureSchema);

module.exports = Scripture;
