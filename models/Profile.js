// user(user id), title, bio, profile Picture, social link(fb,twitter,github, linkedin)

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Post = require('./Post');
const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: string,
      trim: true,
      maxLength: 100,
    },
    bio: {
      type: string,
      trim: true,
      maxLength: 500,
    },
    profilePicture: {
      type: string,
    },
    links: {
      website: string,
      facebook: string,
      twitter: string,
      github: string,
      linkedin: string,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: Post,
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: Post,
      },
    ],
  },
  { timestamps: true }
);
const Profile = model('Profile', profileSchema);
module.exports = Profile;
