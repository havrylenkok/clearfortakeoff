var app = require('../app');
var mysql = require('mysql');

app.set('mysqlHost', process.env.OPENSHIFT_MYSQL_DB_HOST || '570d06917628e1b588000241-sometools.rhcloud.com');
app.set('mysqlPort', process.env.OPENSHIFT_MYSQL_DB_PORT || 59056);
app.set('mysqlUser', process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'adminRAYKbP1');
app.set('mysqlPass', process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'jbDvw4S1le-U');
app.set('mysqlDb', process.env.OPENSHIFT_MYSQL_DB_URL || 'ClearForTakeoff');
app.set('mysqlString', 'mysql://' + app.get('mysqlUser') + ':' + app.get('mysqlPass') + '@' + app.get('mysqlHost') + ':' + app.get('mysqlPort') + '/' + app.get('mysqlDb'));

var mysqlClient = mysql.createConnection(app.get('mysqlString'));

mysqlClient.connect();

var text = "qwerty";

var testConnection = function () {

  return text;
};

module.exports = testConnection;