var express = require('express');
var metar = require('./../bin/metarParser');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clear for take off', weather: metar });
});

module.exports = router;
