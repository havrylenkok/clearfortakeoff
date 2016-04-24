/**
 * Created by robben1 on 4/24/16.
 */

var request = require("request");

module.exports = function (city, callback) {
    if(!('' + city.match('[a-zA-Z]+'))) return null;

    var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=';
    var res;
  
    request(url + city, function (err, res, body) {
        if(err && res.statusCode != 200) return null;

        result = JSON.parse(body);
        // result = body.extract;
        // console.log(result);
        // console.log(result.query.pages);
        var keys = [];
        for(var k in result.query.pages) keys.push(k);
        var pageId = keys[0];
        // console.log(pageId);
        res = result.query.pages[pageId].extract;
        if (typeof callback === 'function') {
            return callback(res);
        }
    });
    
};