/**
 * Method: GET
 * URI: /test
 * */
var metar = require('./../service/metarParser');
var prob = require('./../service/metarToDelay');
var dbconnector = require('./../dbconnector');


exports.main = function(req, res, next) {
    var metarobj = metar.parse('UKKK', 0);
    console.log("PARSED METAR: "); console.log(metarobj);
    var probability = prob(metarobj, 0);
    // console.log(metarobj.wind.speed);
    console.log("PROBABILITY: "); console.log(probability);
    


    res.render('test', {
        title: 'Clear for take off',
        metar: metarobj,
        pureMetar: metar.pureMetar('UKKK'),
        prob: probability,
        host: process.env.OPENSHIFT_MYSQL_DB_HOST,
        port: process.env.OPENSHIFT_MYSQL_DB_PORT,
        name: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
        pass: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
        url: process.env.OPENSHIFT_MYSQL_DB_URL,
        db: dbconnector()
    });
};