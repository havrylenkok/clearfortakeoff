/**
 * Created by robben1 on 4/22/16.
 */

var metar = require('./../service/metarParser');
var prob = require('./../service/metarToDelay');

module.exports = function (airport1, hours1, ils1, airport2, hours2, ils2) {
  var metar1 =  prob(metar.parse(airport1, hours1), 0, ils1);
    var metar2 = prob(metar.parse(airport2, hours2), 1, ils2);
    return { sourceProb: metar1.probability, sourceTime: metar1.delay, destProb: metar2.probability, destTime: metar2.delay }
};