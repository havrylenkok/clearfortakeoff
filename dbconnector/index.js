var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100,
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'victor',
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'qwerty',
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
    database : 'Clearfortakeoff'
});


function executeQuery(query, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return callback(err, null);
        }
        else if (connection) {
            connection.query(query, function (err, rows, fields) {
                connection.release();
                if (err) {
                    return callback(err, null);
                }
                return callback(null, rows);
            })
        }
        else {
            return callback(true, "No Connection");
        }
    });
}

function getResult(query,callback) {
    executeQuery(query, function (err, rows) {
        if (!err) {
            callback(null,rows);
        }
        else {
            callback(true,err);
        }
    });
}

function get()
{
    getResult("SELECT icao FROM airport WHERE id = 1",function(err,rows){
        if(!err){
            return rows;
        }else{
            console.log(err);
        }
    });

}

module.exports = get;


