var mysql = require('mysql');
var text = "connection failed";
var connection = mysql.createConnection({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'victor',
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'qwerty',
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
    database : 'Clearfortakeoff'
});

connection.connect();

connection.query('ALTER TABLE airport ADD flag TINYINT DEFAULT 0', function(err, rows, fields) {
    if (err) {
        console.log(err);
    }
    console.log('true');
    text = "true";
});

connection.end();

var dbresult = function () {
    return text;
};

module.exports = dbresult;


