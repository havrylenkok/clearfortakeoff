/**
 * Created by robben1 on 4/21/16.
 */

/**
 * Calculates probability of delay
 * @param jsMetar metar object
 * @param type 0 - departure, 1 - arrival
 * @param ils ILS category of airport
 */
var countProbability = function (jsMetar, type, ils, course)
// , baseDelay)
    {
        if (jsMetar == null) return {probability: 1, delay: 5};

        if (jsMetar.edge != null) {
            var edges = jsMetar.edge;
            if (edges == 'good') return {probability: 1, delay: 5};
            if (edges == 'bad') return {probability: 100, delay: 720};
        }
        
        if(jsMetar.result == null) { return {probability: 1, delay: 5}; }

        
        jsMetar = jsMetar.result;

        var delayInMins = 0
        // + baseDelay;
            ;
        var probabilityOfDelay = 0;
        var minCategory = 1;
        // if (baseDelay > 30) probabilityOfDelay += 50;

        if (jsMetar == null) {
            probabilityOfDelay = 0;
            delayInMins = 0;
        } else {
            // console.log("JS METAR: " + jsMetar);

            // TODO: wind course. Compare to route course?

            if (jsMetar.wind != null) {

                // TODO: wind speed
                // MPS
                if (jsMetar.wind.speed > 7) {
                    probabilityOfDelay += 20 + jsMetar.wind.speed * 0.25;
                    delayInMins += 25;
                }
                if (jsMetar.wind.ghost != 0) {
                    probabilityOfDelay += 5;
                }

            }

            if (jsMetar.clouds != null && jsMetar.clouds.code !== undefined) {
                base = jsMetar.clouds.base || 999;
                if (jsMetar.clouds.code.match(/BKN/) || jsMetar.clouds.code.match(/OVC/)) {
                    if (jsMetar.clouds.base < 1) {
                        minCategory = 3;
                    } //<=30m
                    else if (jsMetar.clouds.base < 2 && minCategory < 3) {
                        minCategory = 2;
                    }
                }
            }

            // compare ILS CAT & minCategory
            if (type == 1 && !compareIls(minCategory, ils)) {
                probabilityOfDelay += 70;
                delayInMins += 60;
            } else if (type == 0) {
                if (jsMetar.visibility < 200) {
                    probabilityOfDelay += 50;
                    delayInMins += 25;
                }
            } else {
                switch (minCategory) {
                    case 1:
                        if (compareIls(minCategory, ils)) {
                            if (jsMetar.visibility > 800) ;// ok
                        } else {
                            probabilityOfDelay += 70;
                            delayInMins += 60;
                        }
                        break;
                    // ils2-4 rvr
                    case 2:
                        if (compareIls(minCategory, ils)) {
                            if (js.metar.rvr != null && jsMetar.rvr !== undefined) {
                                if (js.metar.rvr.visibility != null && js.metar.rvr.visibility != undefined) {
                                    var vis = js.metar.rvr.visibility;
                                    if (vis < 1200) {//350m
                                        probabilityOfDelay += 70;
                                        delayInMins += 60;
                                    }
                                }
                            }
                        } else {
                            probabilityOfDelay += 70;
                            delayInMins += 60;
                        }
                    case 3:
                        if (compareIls(minCategory, ils)) {
                            if (js.metar.rvr != null && jsMetar.rvr !== undefined) {
                                if (js.metar.rvr.visibility != null && js.metar.rvr.visibility != undefined) {
                                    var vis = js.metar.rvr.visibility;
                                    if (vis < 700) {//200m
                                        probabilityOfDelay += 70;
                                        delayInMins += 60;
                                    }
                                }
                            }
                        } else {
                            probabilityOfDelay += 70;
                            delayInMins += 60;
                        }

                }


            }

            // weather (rain, snow, etc.)
            if (jsMetar.weather != null) {
                descriptor = jsMetar.weather.descriptor || "";
                condition = jsMetar.weather.condition || "";
                if (descriptor.match(/FZ/) || (descriptor.match(/SH/) && condition.match(/SN/)) || condition.match(/PE/) || condition.match(/PO/) || condition.match(/FC/) || condition.match(/TS/) || condition.match(/VA/)) {
                    probabilityOfDelay += 50;
                    delayInMins += 30;
                }
            }


        }

        if (probabilityOfDelay > 99) probabilityOfDelay = 99;
        if (probabilityOfDelay < 1) probabilityOfDelay = 1;
        console.log("Prob" + probabilityOfDelay + " time: " + delayInMins);
        return {probability: probabilityOfDelay, delay: delayInMins};
    }

    ;

var compareIls = function (min, cur) {
    if (min > cur) return false;
    else return true;
};

module.exports = countProbability;
