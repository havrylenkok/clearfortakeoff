var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('metar-test', { title: 'Clear for take off' });
});

module.exports = router;
