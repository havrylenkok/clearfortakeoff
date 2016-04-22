/**
 * Method: GET
 * URI: /test
 * */
var metar = require('./../service/metarParser');
var prob = require('./../service/metarToDelay');
var metarApi = require('./../service/metarApi');
var db = require('./../dbconnector');

exports.main = function(req, res, next) {
    var metarobj = metar.parse('UKKK', 0);
    console.log("PARSED METAR: "); console.log(metarobj);
    var probability = prob(metarobj, 0);
    // console.log(metarobj.wind.speed);
    console.log("PROBABILITY: "); console.log(probability);
    var fakeView = metarApi('UKKK', 0, 'UUDD', 10);
    
    db.testConnection(function(err, data){
       if(err) {
           console.log('Database error : ' + err);
       }
       else {
           console.log('Data from db : ' + JSON.stringify(data));
       }
    });

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
        fake: fakeView
    });
};