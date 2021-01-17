const express = require('express');
const router = express.Router();
const Flash = require('../utils/Flash');

const upload= require('../middleware/uploadMiddleware')
router.get('/play', (req, res, next) => {
  res.render('playground/play', {
    title: 'playground',
    flashMessage: {},
  });
});

router.post('/play',upload.single('my-file'), (req, res, next) => {
  if(req.file){
    console.log(req.file)
  }
  res.redirect('/playground/play');
});

module.exports = router;
