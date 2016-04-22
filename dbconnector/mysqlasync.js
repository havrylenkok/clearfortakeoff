var mysql = require('mysql');

var request = require('request');
var async = require("asyncawait/async");
var await = require("asyncawait/await");

var connectionOptions = {
	host: "localhost",
	user: "root",
	password: "",
	database: "Clearfortakeoff"
};
var connection;

var asyncblock = async(function () {
	try {
		connection = await(mysqlConnectAsync(connectionOptions));
	} catch (e) {
		console.log(e);
		return;
	}

	for (var i = 0; i <= 10; i++) {
		try {
			var rows = await(mysqlQuery("SELECT * FROM airport WHERE id = ?", { id: i }));
			console.log(rows[0].name);
		} catch (e) {
			console.log(e);
		}
	}

});

asyncblock();



function mysqlConnectAsync(options) {
	return function (callback) {

		var con = mysql.createConnection(options);

		con.connect(function(err) {
			if (err) {
				console.log('Error connecting to Db');
				callback(err, null);
				return;
			}
			console.log('Connection established');
			callback(null, con);
		});

		con.end(function(err) {
			// The connection is terminated gracefully
			// Ensures all previously enqueued queries are still
			// before sending a COM_QUIT packet to the MySQL server.
		});

//		request(options, function (error, response, body) {
//			setTimeout(function() {
//				callback(error, { response: response, body: body })
//			}, 0);
//		});
	}
}

function mysqlQuery(sql, params, conn) {
	conn = conn || connection;
	return function (callback) {
		conn.query(sql, params, function(err, rows) {
			setTimeout(function() {
				callback(err, rows);
			}, 0);
		});
	}
}

function requestAsync(options) {
	return function (callback) {
		request(options, function (error, response, body) {
			setTimeout(function() {
				callback(error, { response: response, body: body })
			}, 0);
		});
	}
}
