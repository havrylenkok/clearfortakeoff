/**
 * Created by robben1 on 4/24/16.
 */
var request = require("request");
var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);

module.exports = function (airport1, airport2, date, callback) {
    if(date == null || date == undefined) date = '2016-05-12T00%3A00%3A00';
    if(date == null || date == undefined) airport1 = 'LHR';
    if(date == null || date == undefined) airport2 = 'JFK';
    var obj = [];
    var url1 = 'https://transit.navitime.com/en/flight/schedule/result?depCity=&depAirport=';
    var url2 = '&arvCity=&arvAirport=';
    var url3 = '&date=';
    var url = url1 + airport1 + url2 + airport2 + url3 + date + 'T00%3A00%3A00';

    request(url, function (err, contents, body) {

        console.log("PARSE FLIGHT BODY: " + body);

        // var body = contents.getBody('utf8');
        var t = $(body).find('.flight_info .flight_no').text();
        var count = 0;
        var pos = 0;

        /* while (pos !== -1) {
         count++;
         pos = t.indexOf('-', pos + 1);
         }*/

        count = 2;

        for (var i = 0; i < count - 1; i++) {
            var no = $(body).find('.flight_info').eq(i).text();
            var dep = $(body).find('.time_area').eq(i * 2).text();
            var timeDep = dep.match(/\d\d:\d\d/)[0];
            var arr = $(body).find('.time_area').eq(i * 2 + 1).text();
            var timeArr = arr.match(/[\d]+:[\d]+/)[0];
            var depDate = dep.match(/[\d]+\/[\d]+\/[\d]+ /)[0];
            // console.log($(body).find('.airport_name.arv').text())
            if (new Date(depDate).getDate() == new Date().getDate()) {
                obj.push({
                    'flight_no': '' + no.match(/[A-Z]+-[\d]+/),
                    'dep_time': timeDep,
                    'dep_date': dep.match(/[\d]+\/[\d]+\/[\d]+ [a-zA-Z]+/)[0],
                    'arr_time': timeArr,
                    'arr_date': arr.match(/[\d]+\/[\d]+\/[\d]+ [a-zA-Z]+/)[0],
                    'city_from': $(body).find('.airport_name.dep').text().match(/([a-zA-Z]+)[\s]([a-zA-Z]+)[\s]/)[0],
                    'city_to': $(body).find('.airport_name.arv').text().match(/([a-zA-Z]+)[\s]([a-zA-Z]+)[\s]/)[0]
                })
            }
        }
        // console.log('obj', obj.length);

        //console.log($(body).find('.airport_name.dep:first').text().substring(0, 3));
        //console.log($(body).find('.airport_name.arv:first').text().substring(0, 3))

        console.log("OBJ: " + obj);
        callback(obj);
    });
};
