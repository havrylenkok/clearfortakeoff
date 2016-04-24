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


exports.main = function(req, res, next) {
    
    db.getList(function (err1, res1) {
        if(!err1) {
            db.getList(function (err2, res2) {
               if(!err2) {
                   console.log("res1 = " + res1[0] + "\n res2 = " + res2[0]);
               }

            })
        }
    })
};