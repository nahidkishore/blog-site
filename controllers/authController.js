const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const errorFormatter = require('../utils/validationErrorFormatter');
exports.signupGetController = (req, res, next) => {
  res.render('pages/auth/signup', {
    title: 'Create a new account',
    error: {},
    value: {},
  });
};
exports.signupPostController = async (req, res, next) => {
  /*  console.log(req.body); */
  let { username, email, password } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.render('pages/auth/signup', {
      title: 'Create a new account',
      error: errors.mapped(),
      value: {
        username,
        email,
        password,
      },
    });
  }
  try {
    let hashPassword = await bcrypt.hash(password, 11);
    let user = new User({
      username,
      email,
      password: hashPassword,
    });
    let createUser = await user.save();
    console.log('created user successfully', createUser);
    res.render('pages/auth/signup', { title: 'Create a new account' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.loginGetController = (req, res, next) => {
  res.render('pages/auth/login', { title: 'login your account' ,error:{}});
};
exports.loginPostController = async (req, res, next) => {
  let { email, password } = req.body;
  let errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.render('pages/auth/login', {
      title: 'login your account',
      error: errors.mapped(),
    });
  }
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: 'Invalid Credential' });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ message: 'Invalid Credential' });
    }
   /*  console.log('successfully Logged in', user); */
    res.render('pages/auth/login', { title: 'login your account',error:{} });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logoutController = (req, res, next) => {};
