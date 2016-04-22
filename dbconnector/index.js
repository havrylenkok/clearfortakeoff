var mysql = require('mysql');
var metarParser()

var text = "connection failed";
var connection = mysql.createConnection({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'victor',
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'qwerty',
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
    database : 'Clearfortakeoff'
});

connection.connect();

connection.query('SELECT id, icao FROM airport', function(err, rows, fields) {
    if (err) {
        console.log(err);
    }
    else {
        for(var i = 0; i < rows.length; i++) {

            console.log(rows[i]);
        }

    }
});

connection.end();

var dbresult = function () {
    return text;
};

module.exports = dbresult;


