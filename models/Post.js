//title,body, author,tags,thumbnail.read time,likes,dislikes,comments

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
/* const User = require('./User'); */
const Comment = require('./Comment');

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxLength: 100,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectIdb,
      ref: 'User',
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    thumbnail: { type: String },

    readTime: { type: String },
    likes: [
      {
        type: Schema.Types.ObjectIdb,
        ref: 'User',
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectIdb,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectIdb,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

const Post = model('Post', postSchema);
module.exports = Post;
