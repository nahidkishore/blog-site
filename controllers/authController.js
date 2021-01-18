const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Flash = require('../utils/flash');
const errorFormatter = require('../utils/validationErrorFormatter');


exports.signupGetController = (req, res, next) => {
  res.render('pages/auth/signup', {
    title: 'Create a new account',
    error: {},
    value: {},
    flashMessage: Flash.getMessage(req),
  });
};
exports.signupPostController = async (req, res, next) => {
  /*  console.log(req.body); */
  let { username, email, password } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);


  if (!errors.isEmpty()) {
    req.flash('fail','Please check your Form')
    return res.render('pages/auth/signup', {
      title: 'Create a new account',
      error: errors.mapped(),
      value: {
        username,
        email,
        password,
      },
      flashMessage: Flash.getMessage(req),
    });
  }
  try {
    let hashPassword = await bcrypt.hash(password, 11);
    let user = new User({
      username,
      email,
      password: hashPassword,
    });

    await user.save();
    req.flash('success',' User Successfully created')
    res.redirect('/auth/login');
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.loginGetController = (req, res, next) => {
  /* console.log(req.get('Cookie')) */
  /*   console.log(req.session.isLoggedIn, req.session.user); */
  res.render('pages/auth/login', {
    title: 'login your account',
    error: {},
    flashMessage: Flash.getMessage(req),
  });
};
exports.loginPostController = async (req, res, next) => {
  let { email, password } = req.body;

  let errors = validationResult(req).formatWith(errorFormatter);
  
  if (!errors.isEmpty()) {
    req.flash('fail','Please check your Form')
    return res.render('pages/auth/login', {
      title: 'login your account',
      error: errors.mapped(),
   
      flashMessage: Flash.getMessage(req),
    });
  }
  try {
    let user = await User.findOne({ email });

    if (!user) {
      req.flash('fail','Please Provide valid credentials')
      return res.render('pages/auth/login', {
        title: 'login to your account',
        error: {},
      
        flashMessage: Flash.getMessage(req),
      });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash('fail','Please Provide valid credentials')
      return res.render('pages/auth/login', {
        title: 'login your account',
        error: {},
      
        flashMessage: Flash.getMessage(req),
      });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      req.flash('success','Successfully Logged In')
      res.redirect('/dashboard');
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logoutController = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
 /*    req.flash('success','Successfully Logout') */
    return res.redirect('/auth/login');
  });
};
