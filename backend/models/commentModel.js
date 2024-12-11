// comment / rating / createdAt / ref to scripture / ref to user
const mongoose = require('mongoose');
const Scripture = require('./scriptureModel');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment can not be empty!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    scripture: {
      type: mongoose.Schema.ObjectId,
      ref: 'Scripture',
      required: [true, 'Comment must belong to a scripture.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// commentSchema.index({ scripture: 1, user: 1 }, { unique: true });

commentSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'scripture',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
