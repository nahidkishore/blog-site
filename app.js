const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');


const setMiddleware =require('./middleware/middleware')
//import routes
const setRoutes = require('./routes/routes')





const app = express();

//setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//using middleware from middleware directory

setMiddleware(app);

//using routes from route directory

setRoutes(app)

app.use((req, res, next) =>{
  let error=new Error('404 page not found')
  error.status=404
  next(error)
})

app.use((error,req, res, next) =>{
if(error.status===404){
  return res.render('pages/error/404', {flashMessage:{}})
}
res.render('pages/error/500', {flashMessage:{}})
})

const port = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jolmh.mongodb.net/nahid-blog?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log(chalk.yellow('database connected'));
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    return console.log(err);
  });
