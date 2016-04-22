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


var getIcaoOrIata = function(data, callback) {
    
    if(!data || !/^[A-Z]{3,4}$/.test(data)) {
        callback("Wrong params", null);
        return;
    }
    var values, query;
    if(data.length == 4) {query = "SELECT iata FROM airport WHERE icao = ?"}
    else if(data.length == 3) {query = "SELECT icao FROM airport WHERE iata = ?"}
    
    pool.query({sql: query, values:data}, function (err, rows) {
        if(err) {
            console.log("Catch error: " + err);
            callback(err, null);
        }
        else {
            console.log("Successfully connected : " + JSON.stringify(rows));
            callback(null, rows[0]);
        }
    })
};

var getList = function(callback) {
    pool.query('SELECT icao, iata, name, town FROM airport', function (err, rows) {
        if(err) {
            console.log("Catch error: " + err);
            callback(err, null);
        }
        else {
            console.log("Successfully connected");
            callback(null, rows);
        }
    })
};

module.exports = {
                  testConnection: testConnection, 
                  getIcaoOrIata: getIcaoOrIata,
                  getList : getList
                 };


