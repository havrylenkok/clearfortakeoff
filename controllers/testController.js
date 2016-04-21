/**
 * Method: GET
 * URI: /test
 * */
var metar = require('./../service/metarParser');
var prob = require('./../service/metarToDelay');

exports.main = function(req, res, next) {
    var metarobj = metar.parse('UUDD', 0);
    // console.log(metarobj.wind.speed);


    res.render('test', {
        title: 'Clear for take off',
        metar: metarobj,
        pureMetar: metar.pureMetar('UUDD'),
        prob: prob(metarobj, 0)
    });
};