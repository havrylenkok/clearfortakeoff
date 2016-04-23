/**
 * Created by robben1 on 4/14/16.
 */

var request = require('sync-request');
var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);
var metarjs = require('metar-js');

var parseMetar = function (airport, hoursFromNow) {

    if(!((''+airport).match(/[a-zA-Z]+/))) return null;

    console.log("AIRPORT: " + airport + " HOURS: " + hoursFromNow);
    // console.log(humanifyMetar(getMetar(airport))[0]);
    var data = humanifyMetar(getMetar(airport, hoursFromNow));
    console.log("MY DATA: ");
    console.log(data);
    if (data.result == null) {
        return null;
    }
    else {
        return data;
    }

    // var result = "";

    // for (var i = 0; i < data.length; i++) result += JSON.stringify(data[i]) + "\n";
    // console.log("parseMetar result: " + result);
    // return result;
};

var getMetar = function (airport, hoursFromNow) {
    // console.log(airport);
    var result = true;

    var adress1 = "http://www.aviationweather.gov/adds/metars/?station_ids=";
    var adress2 = "&std_trans=standard&chk_metars=on&hoursStr=most+recent+only&chk_tafs=on&submitmet=Submit";

    var contents = request('GET', adress1 + airport + adress2);
    // console.log("CONTENTS getMetar: ");
    // console.log(contents);
    var text = contents.getBody('utf8');
    // console.log("TEXT: ");
    // console.log(text);

    var html = $.parseHTML(text);
    // console.log("HTML: ");
    // console.log(html);

    var meteoData = $(html).find("font");
    // console.log("METEODATA: ");
    // console.log(meteoData);
    var metar = $(meteoData.get(0)).text();
    var taf = $(meteoData.get(1)).text();
    console.log("CHECKED METAR: " + metar);
    console.log("CHECKED TAF :" + taf);
    if (metar == null || metar == undefined) result = false;


    return {edge: null, metar: metar, taf: taf, airport: airport, hours: hoursFromNow, result: result};

};

var humanifyMetar = function (data) {
        if (data.result == false) return null;

        if (data.metar.match(/SNOCLO/)) return {edge: 'bad', result: metarToJs(data.metar)};
        if (data.metar.match(/CAVOK/)) return {edge: 'good', result: metarToJs(data.metar)};
        // console.log("HUMANIFY START: " + data.metar + " " + data.taf);

        var curTime = new Date().getHours();
        var neededTime = curTime + data.hoursFromNow;
        var tafParsed = data.taf.split('\n');

        // delete TAF
        if(tafParsed[0].match(/TAF/)) tafParsed[0] = tafParsed[0].slice(3);
        // console.log(tafParsed);

        var issueTime = tafParsed[0].match(/\d+Z/);
        var firstSymbols = data.airport + " " + issueTime;
        // console.log("ISSUE TIME: " + issueTime + "\n");
        // var timeRangeForecast = tafParsed[0].match(/[\d]+\/+[\d]+/);
        // console.log("TIME: " + timeRangeForecast);

        var result = [];
        var time;
        var range;
        var j = 1;

        if (data.hoursFromNow < 2) {
            result[0] = metarToJs(data.metar);
            // console.log(result[0]);
        } else {

            console.log("TAFPARSED0:");
            // console.log(tafParsed[0]);
            result[0] = metarToJs(tafParsed[0]);
            // console.log(result[0]);
            for (var i = 1; i < tafParsed.length; i++) {
                if (tafParsed[i].match(/FM/)) {
                    time = tafParsed[i].match(/FM ?[\d]+/);
                    // console.log(tafParsed);
                    // console.log(tafParsed[i]);
                    // console.log(time);
                    // console.log(time[0]);
                    // console.log("FM: " + time);
                    if(time != null) {
                        time = time[0];
                        time = time.substring(time.length - 4, time.length - 2);
                        if (time <= neededTime) {
                            result[j] = compareTaf(result[j - 1], tafToJs(tafParsed[i], firstSymbols));
                            j++;
                        }
                    }
                } else if (tafParsed[i].match(/becmg/) || tafParsed[i].match(/TEMPO/)) {
                    if (tafParsed[i] != null) {
                    range = timeRange(tafParsed[i]);

                        // console.log("BECMG|TEMPO: " + range);
                        if (neededTime < range.end && neededTime > range.start) {
                            result[j] = compareTaf(result[j - 1], tafToJs(tafParsed[i], firstSymbols));
                            j++;
                            break;
                        }
                    }
                }
                else if (tafParsed[i].match(/PROB/)) {
                    // console.log("PROB: " + tafParsed[i]);
                    time = tafParsed[i].match(/PROB\d\d [\d]+/);
                    // console.log("TIME: " + time);
                    if (time != null) {
                        range = {start: time.substring(9, 11), end: time.substring(time.length - 2, time.length)};
                        if (neededTime < range.end && neededTime > range.start) {
                            result[j] = compareTaf(result[j - 1], tafToJs(tafParsed[i], firstSymbols));
                            j++;
                            break;
                        }
                    }
                }
            }

        }
        // console.log("RESULT HUMANIFY: ");
        // console.log(result);
        // console.log("RESULT HUMANIFY j-1: ");
        // console.log(result[j - 1]);
// console.log("HEY HO");
// console.log(metarToJs('METAR KBLV 011657Z AUTO 25015G30KT 210V290 3/8SM R32L/1000FT +FZRA BKN005'));
// console.log("humanify result: " + result[j-1]);
// console.log(result[j-1]);
        return {
            edge: null,
            result: result[j - 1]
        };


// result[0] = metarToJs(data.metar);
// result[1] = metarToJs(tafParsed[0]);
// result[2] = metarToJs(tafParsed[1]);

// console.log("Metar: \n" + data.metar);
// console.log("Taf: \n" + data.taf);
//
// console.log("Taf parsed: \n" + tafParsed);
//
// console.log("Json metar: \n");
// console.log(metarToJs(data.metar));
// console.log("Json tafParsed[0] \n");
// console.log(metarToJs(tafParsed[0]));
//
// console.log("Json tafParsed[1] \n");
// console.log(metarToJs(tafParsed[1]));

// return result;
    }
    ;


var metarToJs = function (metar) {
    return metarjs.parseMetar(metar);
};

var timeRange = function (string) {
    var time = '' + string.match(/.+ [\d]+\/[\d]+/);
    var timeEnd = time.substring(time.length - 2, time.length);
    var timeStart = time.substring(6, 8);
    return {start: timeStart, end: timeEnd};
};

var tafToJs = function (tafString, firstSymbols) {
    tafString = tafString.replace(/\w+\b/, firstSymbols);
    return metarToJs(tafString);
};

module.exports = {
    parse: parseMetar,
    pureMetar: getMetar
};

var compareTaf = function (prev, cur) {
    if (!cur.wind) cur.wind = prev.wind;
    if (!cur.clouds) cur.clouds = prev.clouds;
    if (!cur.visibility) cur.visibility = prev.visibility;
    if (!cur.rvr) cur.rvr = prev.rvr;
    if (!cur.weather) cur.weather = prev.weather;
    return cur;
};