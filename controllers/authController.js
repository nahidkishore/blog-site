const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signupGetController = (req, res, next) => {
  res.render('pages/auth/signup', { title: 'Create a new account' });
};
exports.signupPostController = async (req, res, next) => {
  /*  console.log(req.body); */
  let { username, email, password } = req.body;

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
  res.render('pages/auth/login', { title: 'login your account' });
};
exports.loginPostController = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: 'Invalid Credential' });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ message: 'Invalid Credential' });
    }
    console.log('successfully Logged in', user);
    res.render('pages/auth/login', { title: 'login your account' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logoutController = (req, res, next) => {};
