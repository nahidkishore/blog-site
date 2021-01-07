const express = require('express');
const morgan = require('morgan')
const app = express();

//setup view engine
app.set("view engine", "ejs");
app.set('views', 'views');

//middleware array

const middleware = [
  morgan('dev'),
  express.static('public'),
  express.urlencoded({ extended: true }),
  express.json(),
]
app.use(middleware);

app.get('/', (req,res) => {

  res.render('pages/auth/signup', {title: 'Create an new Account'});
  res.json({
    message: 'Hello Blog post project is working fine',
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
