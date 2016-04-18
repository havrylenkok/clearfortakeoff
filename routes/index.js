var express = require('express');
var metar = require('./../service/metarParser');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("REMOTE IN INDEXJS: " + metar);
  res.render('index', { title: 'Clear for take off', weather: metar });
});

module.exports = router;
