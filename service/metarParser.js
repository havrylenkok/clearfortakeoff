/**
 * Created by robben1 on 4/14/16.
 */

var request = require('request');
var EventEmitter = require("events").EventEmitter;
var jsdom = require('jsdom');
var contents = new EventEmitter();

var parseMetar = function (airport) {
    var adress1 = "http://www.aviationweather.gov/adds/metars/?station_ids=";
    var adress2 = "&std_trans=standard&chk_metars=on&hoursStr=most+recent+only&chk_tafs=on&submitmet=Submit";


    request(adress1 + airport + adress2, function (error, res, body) {
        contents.data = body;
        contents.emit('update');
    });
    contents.on('update', function () {
        console.log(contents.data);
    });
    
    return contents.data;
};


var METAR = parseMetar('UKKK');
console.log("BEFORE EXPORT: " + METAR);

module.exports = METAR;