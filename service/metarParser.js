/**
 * Created by robben1 on 4/14/16.
 */

var request = require('sync-request');

var parseMetar = function (airport) {
    var adress1 = "http://www.aviationweather.gov/adds/metars/?station_ids=";
    var adress2 = "&std_trans=standard&chk_metars=on&hoursStr=most+recent+only&chk_tafs=on&submitmet=Submit";

    var contents = request('GET', adress1 + airport + adress2);

    return contents.getBody();
};


var METAR = parseMetar('UKKK');
console.log("BEFORE EXPORT: " + METAR);

module.exports = METAR;