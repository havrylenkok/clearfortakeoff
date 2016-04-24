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
var db = require('./../dbconnector/index');


exports.main = function(req, res, next) {
    
    db.getIcaoOrIata('UKKK', function (err, res) {
        if(!err) {
            db.getIcaoOrIata('KJFK', function (err2, res2) {
                metarApi(res, 0, )
            })
        }
    })
};