var request = require('request');

var getFlightInfo = function(params, callback) {

    var options = {
        method: 'GET',
        url: 'https://transit.navitime.com/en/flight/schedule/result?' +
                                          'depAirport=' + params.from +
                                          '&arvAirport=KBP&' + params.to +
                                          '&date=' + params.data + 'T00:00:00',

        headers: {
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Content-Type':'text/html;charset=UTF-8',
            'Cache-Control':'max-age=0',
            'Connection':'keep-alive',
            'Host':'transit.navitime.com',
            'Upgrade-Insecure-Requests':'1',
            'User-Agent':'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36'
        }
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Successfully got info");
            callback(null, body);
        }
        else {
            console.log("Request is failed");
            callback(error, null);
        }
    });
};

module.exports = getFlightInfo;


