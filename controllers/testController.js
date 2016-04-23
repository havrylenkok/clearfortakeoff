/**
 * Method: GET
 * URI: /test
 * */
var metar = require('./../service/metarParser');
var prob = require('./../service/metarToDelay');
var metarApi = require('./../service/metarApi');
var flightInfo = require('./../service/flightInfo');

exports.main = function(req, res, next) {
    var metarobj = metar.parse('UKKK', 0);
    // console.log("PARSED METAR: "); console.log(metarobj);
    var probability = prob(metarobj, 0, 2);
    // console.log(metarobj.wind.speed);
    // console.log("PROBABILITY: "); console.log(probability);
    
   flightInfo({from:"kbp", to:"lhr", data:new Date().toJSON().slice(0,10)}, function(err, body){
       if(err) {
           console.log("error " + err);
       }
       else {
           console.log("Returned body\n" + body);
       }
   });

    var fakeView = metarApi('UKKK', 0, 2, 'UUDD', 10, 2);
    var jfkMetarPure = metar.parse('KJFK', 0);
    console.log("KJFK PURE METAR");
    console.log(jfkMetarPure);


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
        fake: fakeView,
        jfkMetarPure: jfkMetarPure
    });
};