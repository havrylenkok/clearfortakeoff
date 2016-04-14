/**
 * Created by robben1 on 4/14/16.
 */

var request = require('request');
var jsdom = require('jsdom');


var Parser = function (airport) {
    this.$ = null;
    this.adress1 = "http://www.aviationweather.gov/adds/metars?station_ids=";
    this.adress2 = "&std_trans=translated&chk_metars=on&hoursStr=most+recent+only&chk_tafs=on&submitmet=Submit";
    this.airport = airport;
    this.set$();
};

Parser.prototype.set$ = function () {
    request({
        uri: this.adress1 + this.airport + this.adress2
    }, function (err, res, body) {
        var self = this;
        self.items = new Array();
        if(err && res.statusCode !== 200) {
            console.log('Request error.');
        }
        jsdom.env({
            html: body,
            scripts: ['http://code.jquery.com/jquery-2.2.3.min.js']
        }, function (err, window) {
            var $ = window.jQuery;
            console.log($('title').text());
            this.$ = $('title').text();
            res.end($('title').text());
        });
    });

    // this.$ = cheerio.load(this.adress1 + this.airport + this.adress2).html();
    // console.log(this.$);
};

var example = new Parser("UKKK");
module.exports = example;