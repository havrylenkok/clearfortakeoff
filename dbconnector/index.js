var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'adminRAYKbP1',
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'jbDvw4S1le-U',
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT || 59056,
    database : 'clearfortakeoff'
});

var testConnection = function(callback) {

    connection.connect();
    connection.query({sql: "SELECT * FROM airport WHERE icao = ?", values:['UKKK']}, function (err, rows) {
        if(err) {
            console.log("Catch error: " + err);
            callback(err, null);
        }
        else {
            console.log("Successfully selected : " + rows[0].id);
            callback(null, rows[0]);
        }
        connection.end();
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
    
    connection.query({sql: query, values:data}, function (err, rows) {
        if(err) {
            console.log("Catch error: " + err);
            callback(err, null);
        }
        else {
            console.log("Successfully selected : " + JSON.stringify(rows));
            callback(null, rows[0]);
        }
    })
};

var getList = function(callback) {
    connection.query('SELECT icao, iata, name, town FROM airport', function (err, rows) {
        if(err) {
            console.log("Catch error: " + err);
            callback(err, null);
        }
        else {
            console.log("Successfully selected");
            callback(null, rows);
        }
    })
};

var updateTop = function(data) {


    connection.query('UPDATE airport SET prob = (prob + ?)/(counter+1), delay = (delay + ?)/(counter+1), ' +
                                  'counter = counter + 1 WHERE icao = ?;', [data.prob, data.delay, data.icao],
    function (err, rows) {
        if(err) {
            console.log("Error of update " + err);
        }
        else {
            console.log("Successfully updated " + rows.affectedRows + " rows");
        }
    })

};

var getTop = function(data, callback) {

    data.limit = data.limit || 40;

    connection.query('SELECT icao, iata, name, town, delay, prob FROM airport WHERE counter > 0 ORDER BY prob LIMIT ?;',
         [data.limit],
         function(err, rows){
            if(err) {
                console.log("Error to select " + err);
                callback(err, null);
            }        
            else {
                console.log("Success selected top");
                callback(null, rows);
            } 
    });
};

var getNearestAirport = function (data, callback) {

    data.limit = data.limit || 1;

    connection.query({sql:'SELECT icao, iata, name, town, sqrt(pow(? - lat, 2) + pow(? - lng,2)) as len ' +
               'FROM airport  ORDER BY len LIMIT ?', values: [data.userLat, data.userLng, data.limit]},
        function(err, rows){
            if(err) {
                console.log("Error to select " + err);
                callback(err, null);
            }
            else {
                console.log("Success selected nearest airports");
                callback(null, rows);
            }
        });
};

var getInfo = function(data, callback) {

    connection.query('SELECT a.ils, a.icao, r.cource FROM runways r INNER JOIN ' +
                     '(SELECT ils, id, icao FROM airport WHERE iata = ?) a on r.airport_id = a.id;',[data.iata],
    function (err, rows) {
        if(err) {
            console.log("Error to select " + err);
            callback(err, null);
        }
        else {
            console.log("Success selected courses");
            callback(null, rows);
        }
    });
};

module.exports = {
                  testConnection: testConnection, 
                  getIcaoOrIata: getIcaoOrIata,
                  getList : getList,
                  updateTop : updateTop,
                  getTop : getTop,
                  getNearestAirport : getNearestAirport,
                  getInfo : getInfo 
                 };


