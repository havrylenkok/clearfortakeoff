/**
 * Created by robben1 on 4/24/16.
 */
/**
 * Method: GET
 * URI: /fakeView
 * */
var metar = require('./../service/metarParser');
var prob = require('./../service/metarToDelay');
var metarApi = require('./../service/metarApi');
var parseFlight = require('./../service/parseFlight');
var city = require('./../service/parseCityInfo');
var db = require('./../dbconnector');
var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);



exports.main = function(req, res, next) {
    


    var showDataFromDb = function(err, data) {
        if(err) {
            console.log('Database error : ' + err);
        }
        else {
            console.log('Data from db : ' + JSON.stringify(data));
            res.end("OK");
        }
    };



    //db.getTop({limit:40}, showDataFromDb);
    
    db.getInfo('KBP',function (err1, res1) {
        if(!err1) {
            db.getInfo('LHR', function (err2, res2) {
                if(!err2){
                    console.log("res1 = " + res1[0].icao + "\n res2 = " + res2[0].icao);
                    res.end("OK");
                }
            })
        }
    });
};