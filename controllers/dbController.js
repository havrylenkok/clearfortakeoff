
var db = require('./../dbconnector');

exports.main = function (req, res, next) {

    var showDataFromDb = function(err, data) {
        if(err) {
            console.log('Database error : ' + err);
        }
        else {
            console.log('Data from db : ' + JSON.stringify(data));
        }
    };

    db.testConnection(showDataFromDb);

    db.getIcaoOrIata('UKKK', showDataFromDb);

    db.getIcaoOrIata('IEV', showDataFromDb);

    db.updateTop({prob:3, delay:3, icao:'UKKG'});

    db.getTop({limit:3}, showDataFromDb);

    db.getCources({iata:"BMK"}, showDataFromDb);

    db.getNearestAirport({userLat:48.49, userLng:32.21, limit:5}, function(err, data) {
        if(err) {
            console.log('Database error : ' + err);
        }
        else {
            res.render('dbtest', {fromdb : JSON.stringify(data)});
        }
    });

};