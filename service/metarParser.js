/**
 * Created by robben1 on 4/14/16.
 */

var request = require('sync-request');
var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);
// var parseMETAR = require('metar');
var metarjs = require('metar-js');

var getMetar = function (airport) {
    var adress1 = "http://www.aviationweather.gov/adds/metars/?station_ids=";
    var adress2 = "&std_trans=standard&chk_metars=on&hoursStr=most+recent+only&chk_tafs=on&submitmet=Submit";

    var contents = request('GET', adress1 + airport + adress2);

    var text = contents.getBody('utf8');
    text = $(text).text();
    var pattern = /(.+\/metars\/\s?)(.+)/;
    // TODO: get metar + taf, split it by \n
    // TODO: у каждого рядка taf заменить идентификаторы времени на код аэропорта, для корректной работы. Забирать
    // TODO: из массива только то, что необходимо. При этом будет обычный json с погодой, на основе которой можно выдать
    // TODO: вероятность


    var res = text[1].split(/\r?\n/);
    // TODO: don't forget to put here right var, not the pure text, but array of metars
    return text;
};

var metarToJson = function (metar) {
    return metarjs.parseMetar(metar);
};

// console.log(metarToJson('UKKK 181730Z 01004MPS CAVOK 13/08 Q1013 R08/70D NOSIG'));
// console.log(metarToJson('UKKK 181701Z 1818/1918 35005G10MPS 6000 BKN030 TEMPO 1818/1824 2100 -SHRA BR BKN007 SCT020CB PROB40 TEMPO 1818/1824 36009G15MPS -TSRA BKN015CB TEMPO 1900/1906 2000 -SHRA BR SCT005 SCT015CB TEMPO 1906/1912 28005G10MPS 3000 -SHRA BKN010 SCT020CB'));
// console.log(metarjs.parseMetar('UKKK 181730Z 01004MPS CAVOK 13/08 Q1013 R08/70D NOSIG'));
// console.log(metarToJson('UKKK 181701Z 1818/1918 35005G10MPS 6000 BKN030 TEMPO 1818/1824 2100 -SHRA BR BKN007' +
//     ' SCT020CB PROB40' +
// ' TEMPO 1818/1824 36009G15MPS -TSRA BKN015CB TEMPO 1900/1906 2000 -SHRA BR SCT005 SCT015CB TEMPO 1906/1912 28005G10MPS 3000 -SHRA BKN010 SCT020CB'));
module.exports = getMetar;