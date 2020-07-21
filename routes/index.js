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
    name: req.params.name,
    email: req.params.name,
    password: req.params.password,
  })
  var newUser = await newUser.save()
})










module.exports = router;
