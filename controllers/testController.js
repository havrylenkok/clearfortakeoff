/**
 * Method: GET
 * URI: /test
 * */
var metar = require('./../service/metarParser');
var prob = require('./../service/metarToDelay');
var metarApi = require('./../service/metarApi');
var parseFlight = require('./../service/parseFlight');
var city = require('./../service/parseCityInfo');

var callbackCity = function (res) {
    console.log(res);
};


exports.main = function(req, res, next) {
    console.log(req.body);
    metar.parse('UKKK', 0, function (metarobject) {
        metarobj = metarobject;
        console.log(metarobj);
        var probability = prob(metarobj, 0, 2);
        metarApi('UKKK', 0, 2, [0,10], 'LEBL', 10, 2, [0,15], function (fake) {
            var fakeView = fake;
            metar.parse('KJFK', 0, function (pureJfk) {
            //     console.log("PUREJFK " + pureJfk);
                var jfkMetarPure = pureJfk;
                // parseFlight(function (res) {
                    city('Kiev', callbackCity);
                    res.render('test', {
                        title: 'Clear for take off',
                        metar: metarobj,
                        // pureMetar: jfkMetarPure,
                        prob: probability,
                        host: process.env.OPENSHIFT_MYSQL_DB_HOST,
                        port: process.env.OPENSHIFT_MYSQL_DB_PORT,
                        name: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
                        pass: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
                        url: process.env.OPENSHIFT_MYSQL_DB_URL,
                        fake: fakeView,
                        jfkMetarPure: jfkMetarPure
                    });
                // });
                
            })
        })
    });
    // console.log("PARSED METAR: "); console.log(metarobj);
    
    // console.log(metarobj.wind.speed);
    // console.log("PROBABILITY: "); console.log(probability);
    //
    //var request = require("request")
    //
    
    
    //console.log("KJFK PURE METAR");
    //console.log(jfkMetarPure);
   

    // console.log("TYPE OF: " + callbackCity);
    


    
    
};