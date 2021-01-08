// user(user id), title, bio, profile Picture, social link(fb,twitter,github, linkedin)

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
/* const Post = require('./Post'); */

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
    title: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    profilePicture: {
      type: String,
    },
    links: {
      website: String,
      facebook: String,
      twitter: String,
      github: String,
      linkedin: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref:' Post',
      },
    ],
  },
  { timestamps: true }
);
const Profile = model('Profile', profileSchema);
module.exports = Profile;
