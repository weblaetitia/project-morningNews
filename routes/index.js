var express = require('express');
const UsersModel = require('../models/Users');
var router = express.Router();

// encryption security
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')
var uid2 = require('uid2')

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
      var userSalt = uid2(32)
      var newUser = new UsersModel({
        name: req.body.name,
        email: req.body.email,
        salt: userSalt, 
        token: uid2(32),
        password: SHA256(req.body.password + userSalt).toString(encBase64),
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
      })    

    if (myrequest.length != 0) {
      var hash = SHA256(req.params.password + myrequest[0].salt).toString(encBase64)
      if (hash == myrequest[0].password) {
        res.json({
          succes: true,
          alert: 'all good'
        })
      } else {
        res.json({
          succes: false,
          alert: 'wrong password'
        })
      }
      
    } else {
      res.json({
        succes: false,
        alert: 'User not exists'
      })
    }
  }
})









module.exports = router;
