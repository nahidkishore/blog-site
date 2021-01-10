const User = require('../models/User');

exports.bindUserWithRequest = () => {
  return async (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return next();
    }
    try {
      let user = await User.findById(req.session.user_id);
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
};

exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/auth/login');
  }
  next();
};
exports.isUnAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect('/dashboard');
  }
  next();
};
