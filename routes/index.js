var express = require('express');
const UsersModel = require('../models/Users');
var router = express.Router();

var request = require('sync-request');

// dotenv
if(!process.env.DB_INFO) {
  require('dotenv').config()
}

var apikey = process.env.REACT_APP_NEWS_API_KEY


// encryption security
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')
var uid2 = require('uid2')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/************      SIGN_UP     ************/
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
        alert: 'All good',
        token: newUser.token
      })
    }
  }
})

/************         SIGN_IN        ************/
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
          alert: 'all good', 
          token: myrequest[0].token
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

/************     GET SOURCES FROM API      ************/
router.get('/getapi', async function(req, res, next) {
  var language = req.query.language
  var myRequest = request('GET', (`https://newsapi.org/v2/sources?language=${language}&apiKey=${apikey}`))
  myRequest = JSON.parse(myRequest.getBody())
  res.json(myRequest)
})


/************     GET SOURCES FROM API      ************/
router.get('/getsources', async function(req, res, next) {
  var sources = req.query.sources
  var myRequest = request('GET', (`https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apikey}`))
  myRequest = JSON.parse(myRequest.getBody())
  res.json(myRequest)
})


/************     GET SOURCES FROM API      ************/
router.put('/addarticle', async function(req, res, next) {
  var user = await UsersModel.findOne(
    {token: req.body.token}
  )
  if (!user) {
    res.json({succes: true, error: 'user must be log-in'})
  } else {
    user.articles.push({
      title: req.body.title,
      content: req.body.content,
      description: req.body.description,
      urlToImage: req.body.urlToImage,
      language: req.body.language
  })
  user = await user.save()
  res.json({succes: true, user})
  }

})




module.exports = router;
