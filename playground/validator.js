const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Flash=require('../utils/Flash')
router.get('/validator', (req, res, next) => {
  console.log(Flash.getMessage(req))
  res.render('playground/signup', { title: 'validator playground' });
});

router.post(
  '/validator',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage(`Email can not be empty`)
      .isLength({ max: 15 })
      .withMessage(`Username can not be greater than 15 characters`)
      .trim(),
    check('email')
      .isEmail()
      .withMessage(`please provide a valid email address`)
      .normalizeEmail()
      ,
    check('password').custom((value) => {
      if (value.length < 5) {
        throw new Error('Password must be greater than 5 characters');
      }
      return true;
    }),
    check('confirmPassword').custom((value,{req}) => {
      if(value!= req.body.password){
        throw new Error('password does not matched')
      }
      return true;

    })
  ],
  (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
      req.flash('fail','There is some error')

    }
    else {
      req.flash('Success','There is no error')
    }
    res.redirect('/playground/validator')
  }
);

module.exports = router;
