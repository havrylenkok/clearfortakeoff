/**
 * Created by robben1 on 4/14/16.
 */

var request = require('sync-request');
var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);
var metarjs = require('metar-js');

var parseMetar = function (airport) {
    
    //console.log(humanifyMetar(getMetar(airport))[0]);
    var data = humanifyMetar(getMetar(airport));
    var result = "";

    for(var i=0; i<data.length; i++) result += JSON.stringify(data[i]) + "\n";
    return result
};

var getMetar = function (airport) {
    
    var adress1 = "http://www.aviationweather.gov/adds/metars/?station_ids=";
    var adress2 = "&std_trans=standard&chk_metars=on&hoursStr=most+recent+only&chk_tafs=on&submitmet=Submit";

    var contents = request('GET', adress1 + airport + adress2);
    var text = contents.getBody('utf8');

    var html = $.parseHTML(text);

    var meteoData = $(html).find("font");
    var metar = $(meteoData.get(0)).text();
    var taf = $(meteoData.get(1)).text();
    
    
    return {metar: metar, taf:  taf, airport : airport};
    
    // TODO: get metar + taf, split it by \n
    // TODO: у каждого рядка taf заменить идентификаторы времени на код аэропорта, для корректной работы. Забирать
    // TODO: из массива только то, что необходимо. При этом будет обычный json с погодой, на основе которой можно выдать
    // TODO: вероятность

};

var humanifyMetar = function (data) {
    
    var tafParsed = data.taf.split('\n');

    tafParsed[0] = tafParsed[0].slice(3);

    var time = tafParsed[0].match(/\d+Z/);
    tafParsed[1] = tafParsed[1].replace(/\w+\b/, data.airport + " " + time);
    
    var result = [];
    
    result[0] = metarToJson(data.metar);
    result[1] = metarToJson(tafParsed[0]);
    result[2] = metarToJson(tafParsed[1]);
    
    console.log("Metar: \n" + data.metar);
    console.log("Taf: \n" + data.taf);

    console.log("Taf parsed: \n" + tafParsed);

    console.log("Json metar: \n");
    console.log(metarToJson(data.metar));
    console.log("Json tafParsed[0] \n");
    console.log(metarToJson(tafParsed[0]));

    console.log("Json tafParsed[1] \n");
    console.log(metarToJson(tafParsed[1]));
    
    return result;
};

var metarToJson = function (metar) {
    return metarjs.parseMetar(metar);
};

module.exports = parseMetar;