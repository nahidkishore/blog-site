const authRoute = require('./authRoute');
const dashboardRoute = require('./dashboardRoute');

const routes = [
  {
    path: '/auth',
    handler: authRoute,
  },
  {
    path: '/dashboard',

    handler: dashboardRoute,
  },
  {
    path: '/',

    handler: (req, res) => {
      /* res.json({
        message: 'Hello Blog post project is working fine',
      }); */
      res.send('<h1>Hello Blog post project is working fine</h1>')
    },
  },
];

module.exports = (app) => {
  routes.forEach((r) => {
    if(r.path ==='/'){
      app.get(r.path,r.handler)
    } else{
      app.use(r.path, r.handler);
    }
  });
};
