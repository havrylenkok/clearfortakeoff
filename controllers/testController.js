/**
 * Method: GET
 * URI: /test
 * */
var metar = require('./../service/metarParser');
var prob = require('./../service/metarToDelay');
var metarApi = require('./../service/metarApi');

exports.main = function(req, res, next) {
    var metarobj = metar.parse('UKKK', 0);
    // console.log("PARSED METAR: "); console.log(metarobj);
    var probability = prob(metarobj, 0, 2);
    // console.log(metarobj.wind.speed);
    // console.log("PROBABILITY: "); console.log(probability);
    //
    //var request = require("request")
    //
    var url = "https://transit.navitime.com/en/flight/schedule/result?depCity=&depAirport=KBP&arvCity=&arvAirport=LHR&date=2016-04-23T00%3A00%3A00"
    //
    //request({
    //    url: url,
    //    json: true
    //}, function (error, response, body) {
    //
    //    if (!error && response.statusCode === 200) {
    //        console.log('g') // Print the json response
    //        console.log(body) // Print the json response
    //    }
    //})
    var request = require("request");
    var jsdom = require('jsdom').jsdom;
    var document = jsdom('<html></html>', {});
    var window = document.defaultView;
    var $ = require('jquery')(window);

    request(url, function(error, response, body) {
        //var html = $.parseHTML(body);
        $html = $(body)
        var data = $html.filter('.flight_no');
        console.log(response)

    });

    var fakeView = metarApi('UKKK', 0, 2, 'UUDD', 10, 2);
    var jfkMetarPure = metar.parse('KJFK', 0);
    //console.log("KJFK PURE METAR");
    //console.log(jfkMetarPure);


    res.render('test', {
        title: 'Clear for take off',
        metar: metarobj,
        pureMetar: metar.pureMetar('UKKK'),
        prob: probability,
        host: process.env.OPENSHIFT_MYSQL_DB_HOST,
        port: process.env.OPENSHIFT_MYSQL_DB_PORT,
        name: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
        pass: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
        url: process.env.OPENSHIFT_MYSQL_DB_URL,
        fake: fakeView,
        jfkMetarPure: jfkMetarPure
    });
};