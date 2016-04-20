/**
 * Created by robben1 on 4/14/16.
 */

var request = require('sync-request');
var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);
var metarjs = require('metar-js');

var getMetar = function (airport) {
    
    var adress1 = "http://www.aviationweather.gov/adds/metars/?station_ids=";
    var adress2 = "&std_trans=standard&chk_metars=on&hoursStr=most+recent+only&chk_tafs=on&submitmet=Submit";

    var contents = request('GET', adress1 + airport + adress2);
    var text = contents.getBody('utf8');

    var html = $.parseHTML(text);

    var meteoData = $(html).find("font");
    var metar = $(meteoData.get(0)).text();
    var taf = $(meteoData.get(1)).text();

    var tafParsed = taf.split('\n');

    

    console.log(metarToJson(metar));
    console.log(metarToJson(taf));
    
    
    // TODO: get metar + taf, split it by \n
    // TODO: у каждого рядка taf заменить идентификаторы времени на код аэропорта, для корректной работы. Забирать
    // TODO: из массива только то, что необходимо. При этом будет обычный json с погодой, на основе которой можно выдать
    // TODO: вероятность


    // TODO: don't forget to put here right var, not the pure text, but array of metars
    return metar +  " --- " + tafParsed;
};

var metarToJson = function (metar) {
    return metarjs.parseMetar(metar);
};

module.exports = getMetar;