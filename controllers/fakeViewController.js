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

var results = {};

var callbackCity = function (res) {
    // console.log(res);
    addToResults('city', res);
};

var addToResults = function (name, res) {
    results[name] = res;
    console.log(results[name]);
    renderPage();
};

var renderPage = function () {
    if(results.length > 1) {
        renderer.render('fakeView', {
            title: 'blah',
            fake: results['city'],
            metar: results['metar']
        });
    }     
};

exports.main = function(req, res, next) {
    var metarobj = metar.parse('UKKK', 0);
    // console.log("PARSED METAR: "); console.log(metarobj);
    var probability = prob(metarobj, 0, 2);
    // console.log(metarobj.wind.speed);
    // console.log("PROBABILITY: "); console.log(probability);
    //
    //var request = require("request")
    //


    metarApi('UKKK', 0, 2, 0, 'UUDD', 10, 2, 0, callbackMetar);
    city('Kiev', callbackCity);
    var jfkMetarPure = metar.parse('KJFK', 0);
    //console.log("KJFK PURE METAR");
    //console.log(jfkMetarPure);
    parseFlight();

    // console.log("TYPE OF: " + callbackCity);
    // city('Kiev', callbackCity);
};