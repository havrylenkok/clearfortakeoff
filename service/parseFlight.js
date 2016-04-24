/**
 * Created by robben1 on 4/24/16.
 */
var request = require("request");
var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);

module.exports = function () {

    var url = "https://transit.navitime.com/en/flight/schedule/result?depCity=&depAirport=JFK&arvCity=&arvAirport=LHR&date=2016-04-24T00%3A00%3A00"

    request(url, function (error, response, body) {
        var t = $(body).find('.flight_info .flight_no').text();
        var count = 0;
        var pos = 0;

        while (pos !== -1) {
            count++;
            pos = t.indexOf('-', pos + 1);
        }

        for (var i=0;i<count; i++){
            var no = $(body).find('.flight_info').eq(i).text();

           $(body).find('.time_area').eq(i*2).text()
          $(body).find('.time_area').eq(i*2+1).text()
        }

        //console.log($(body).find('.flight_info .flight_no:first').text())
        //console.log($(body).find('.date:first').text())
        //console.log($(body).find('.time.dep:first').text())
        //console.log($(body).find('.date').eq(1).text())
        //console.log($(body).find('.time.arv:first').text())
        //console.log($(body).find('.flight_time:first').text())
        //console.log($(body).find('.airport_name.dep:first').text().substring(0, 3));
        //console.log($(body).find('.airport_name.arv:first').text().substring(0, 3))
    });
}