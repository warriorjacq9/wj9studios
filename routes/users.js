var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users',{title: 'WJ9 Studios・Users'})
});

module.exports = router;
