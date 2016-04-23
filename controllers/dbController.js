
var db = require('./../dbconnector');

db.testConnection(function(err, data){
    if(err) {
        console.log('Database error : ' + err);
    }
    else {
        console.log('Data from db : ' + JSON.stringify(data));
    }
});

db.getIcaoOrIata('UKKK', function (err, data) {
    if(err) {
        console.log('Database error : ' + err);
    }
    else {
        console.log('Data from db : ' + data.iata);
    }
});

db.getIcaoOrIata('IEV', function (err, data) {
    if(err) {
        console.log('Database error : ' + err);
    }
    else {
        console.log('Data from db : ' + data.icao);
    }
});

db.updateTop({prob:3, delay:3, icao:'UKKG'});

db.getTop({limit:3}, function(err, data){

    if(err) {
        console.log('Database error ' + err);
    }
    else {
        console.log('Data from db : '+ JSON.stringify(data));
    }
});

exports.main = function (req, res, next) {

    db.getList(function (err, data) {
        if(err) {
            console.log('Database error : ' + err);
        }
        else {
            res.render('dbtest', {fromdb : JSON.stringify(data)});
        }
    });
};