var express = require('express');
const UsersModel = require('../models/Users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*      SIGN_UP     */
/*   Add new user   */
router.post('/sign-up', async function(req, res, next) {
  // check if all inputs are field
  if ((req.body.name == 'undefined') || (req.body.email == 'undefined') || (req.body.password == 'undefined')) {
    console.log('All fields must be provided')
    res.json({
      succes: false,
      alert: 'All fields must be provided'
    })
  } else {
     // chek if user alredy exist
    var userExist = await UsersModel.findOne({
      email: req.body.email
    })
    if (userExist != null) {
      res.json({
        succes: false,
        alert: 'User with this email already exists'
      })
    } else {
      // user not already exist -> record in database
      var newUser = new UsersModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      var newUser = await newUser.save()
    
      res.json({
        succes: true,
        alert: 'All good'
      })
    }
  }
})

/*         SIGN_IN        */
/*   Chek if user exist   */
router.get('/sign-in/:email/:password', async function(req, res, next) {
  // Check if all inputs are field
  if ((req.params.email == 'undefined') || (req.params.password == 'undefined')) {
    res.json({
      succes: false,
      alert: 'All fields must be provided'
    })
  } else {
    var myrequest = await UsersModel.find({
      email: req.params.email,
      password: req.params.password
      })    
    if (myrequest.length != 0) {
      res.json({
        succes: true,
        alert: 'all good'
      })
    } else {
      res.json({
        succes: false,
        alert: 'wrong user name or password'
      })
    }
  }
})









module.exports = router;
