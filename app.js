const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//import routes

const authRoutes = require('./routes/authRoute');
const dashboardRoutes = require('./routes/dashboardRoute')
//import auth middleware
const { bindUserWithRequest } = require('./middleware/authMiddleware');
const setLocals = require('./middleware/setLocals');
//playground validator

/* const playgroundValidators =require('./playground/validator') // todo should be remove */

const app = express();

// mongodb session store

const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/nahid-blog?retryWrites=true&w=majority`,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2,
});

//setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//middleware array

const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRET_KEY || 'SECRET_KEY',
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
  bindUserWithRequest(),
  setLocals(),
];
app.use(middleware);

app.use('/auth', authRoutes);
app.use('/dashboard',dashboardRoutes);
/* app.use('/playground',playgroundValidators); // todo should be remove */

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
    console.log('database connected');
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    return console.log(err);
  });
