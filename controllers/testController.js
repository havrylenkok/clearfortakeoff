/**
 * Method: GET
 * URI: /test
 * */
var metar = require('./../service/metarParser');
var app = require('./../app');

var text = "connection failed";

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'victor',
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD|| 'qwerty',
    port :  process.env.OPENSHIFT_MYSQL_DB_PORT || '3306'
});

connection.connect();

connection.query('SELECT 1', function(err, rows, fields) {
    if (err) {console.log(err)}
    else {
        console.log('Connected');
        text = "Connected";
    }
});

connection.end();


exports.main = function(req, res, next) {
    res.render('test', { title: 'Clear for take off', weather: metar('UKKK'), db : text });
};