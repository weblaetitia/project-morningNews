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
  var newUser = new UsersModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  var newUser = await newUser.save()

  console.log(newUser)
  res.json(newUser)

})

/*         SIGN_IN        */
/*   Chek if user exist   */
router.get('/sign-in/:email/:password', async function(req, res, next) {
    var myrequest = await UsersModel.find({
    email: req.params.email,
    password: req.params.password
  })

  console.log(myrequest)

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
})









module.exports = router;
