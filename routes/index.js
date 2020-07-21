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
  console.log(req.body.name)
  console.log(req.body.email)
  console.log(req.body.password)
  var newUser = new UsersModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  var newUser = await newUser.save()
  res.json(newUser)
})










module.exports = router;
