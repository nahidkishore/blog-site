const { body } = require('express-validator');

module.exports=[
  body('email')
  .not().isEmpty().withMessage('Email Address can not be empty'),

  body('password')
  .not().isEmpty().withMessage('Password can not be empty'),
]