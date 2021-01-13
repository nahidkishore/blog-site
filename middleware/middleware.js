
const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');


const { bindUserWithRequest } = require('./authMiddleware');
const setLocals = require('./setLocals');


const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/nahid-blog?retryWrites=true&w=majority`,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2,
});
const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  }),

  bindUserWithRequest(),
  setLocals(),
  flash(),

];

module.exports =app=>{
  middleware.forEach((m)=>{
    app.use(m)
  })
}