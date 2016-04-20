/**
 * Method: GET
 * URI: /test
 * */
var metar = require('./../service/metarParser');

exports.main = function(req, res, next) {
    res.render('test', { title: 'Clear for take off', metar: metar('UKKK'), taf: "" });
};