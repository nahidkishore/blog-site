const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();

//auth routes

const authRoutes = require('./routes/authRoute');

//setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//middleware array

const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({ extended: true }),
  express.json(),
];
app.use(middleware);

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello Blog post project is working fine',
  });
});

const port = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/nahid-blog?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('database connected')
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    return console.log(err);
  });
