
const Flash= require('../utils/Flash')
exports.dashboardController =(req, res, next)=>{
  res.render('pages/dashboard/dashboard',
  {
    title:'My Dashboard',
    flashMessage: Flash.getMessage(req),
  })
}