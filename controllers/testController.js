/**
 * Method: GET
 * URI: /test
 * */
var metar = require('./../service/metarParser');
var prob = require('./../service/metarToDelay');
var dbconnector = require('./../dbconnector');


exports.main = function(req, res, next) {
    var metarobj = metar.parse('UKKG', 0);
    // console.log(metarobj.wind.speed);

    console.log(dbconnector());

    res.render('test', {
        title: 'Clear for take off',
        metar: metarobj,
        pureMetar: metar.pureMetar('UUDD'),
        prob: prob(metarobj, 0),
        host: process.env.OPENSHIFT_MYSQL_DB_HOST,
        port: process.env.OPENSHIFT_MYSQL_DB_PORT,
        name: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
        pass: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
        url: process.env.OPENSHIFT_MYSQL_DB_URL,
        db: dbconnector()
    });
};