/**
 * Method: GET
 * URI: /test
 * */
var metar = require('./../service/metarParser');
var prob = require('./../service/metarToDelay');

var mysql = require('mysql');
var text = "connection failed";
var connection = mysql.createConnection({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'victor',
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'qwerty',
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306
});

connection.connect();

connection.query('SELECT 1', function(err, rows, fields) {
    if (err) {
        console.log(err);
    }
    console.log('Connected');
    text = "connected";
});

connection.end();


exports.main = function(req, res, next) {
    var metarobj = metar.parse('UUDD', 0);
    // console.log(metarobj.wind.speed);


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
        db: text
    });
};