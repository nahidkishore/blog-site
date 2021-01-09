const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/validator', (req, res, next) => {
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
    const formatter = (error) => error.msg;

    console.log(errors.mapped());
    console.log(errors.array());
    console.log(errors.isEmpty());
    console.log(errors);
    console.log(errors.formatWith(formatter).mapped());
    console.log(req.body.username, req.body.email)
    res.render('playground/signup', { title: 'validator playground' });
  }
);

module.exports = router;
