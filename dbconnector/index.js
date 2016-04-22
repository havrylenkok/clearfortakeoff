var mysql = require('mysql');

var pool = mysql.createPool({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'victor',
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'qwerty',
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
    database : 'Clearfortakeoff',
    connectionLimit : 10
});

var testConnection = function(callback) {

    pool.query({sql: "SELECT * FROM airport WHERE icao = ?", values:['UKKK']}, function (err, rows) {
        if(err) {
            console.log("Catch error: " + err);
            callback(err, null);
        }
        else {
            console.log("Successfully connected : " + rows.id);
            callback(null, rows[0]);
        }
    })
};


module.exports = {testConnection : testConnection};


