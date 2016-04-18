var express = require('express');
var metar = require('./../service/metarParser');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clear for take off', weather: metar('UKKK') });
});

module.exports = router;
