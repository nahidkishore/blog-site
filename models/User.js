// name, email,profile, password

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

/* const Profile = require('./Profile'); */

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);
module.exports = User;
