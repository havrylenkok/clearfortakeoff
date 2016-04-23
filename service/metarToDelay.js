/**
 * Created by robben1 on 4/21/16.
 */

var countProbability = function (jsMetar
                                 // , baseDelay
) {
    var edges = jsMetar.edge;
    if (edges != null) {
        if (edges == 'good') return {probability: 1, delay: 5};
        if (edges == 'bad') return {probability: 100, delay: 720};
    }

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
        console.log("JS METAR: " + jsMetar);

        // TODO: wind course. Compare to route course?
        if(jsMetar.wind != null) {

            // TODO: wind speed
            // MPS
            if (jsMetar.wind.speed > 7) {
                probabilityOfDelay += 20;
                delayInMins += 25;
            }
            if(jsMetar.wind.ghost != 0) {
                probabilityOfDelay += 5;
            }

        }
        // TODO: visibility
        if (jsMetar.visibility < 200) {
            probabilityOfDelay += 50;
            delayInMins += 25;
        }

        // TODO: clouds
        if(jsMetar.clouds != null && jsMetar.clouds.code !== undefined) {
            base = jsMetar.clouds.base || 999;
            if(jsMetar.clouds.code.match(/BKN/) || jsMetar.clouds.code.match(/OVC/)) {
                if (jsMetar.clouds.base < 1){minCategory = 3;} //<=30m
                else if (jsMetar.clouds.base < 2 && minCategory < 3){minCategory = 2;}
            }
        }

        // TODO: rvr (only when visibility is bad)
        
        // TODO: compare ILS CAT & minCategory
        
        // TODO: weather (rain, snow, etc.)
        if (jsMetar.weather != null ) {
            descriptor = jsMetar.weather.descriptor||"";
            condition = jsMetar.weather.condition||"";
            if (descriptor.match(/FZ/) || (descriptor.match(/SH/)&&condition.match(/SN/)) || descriptor.match(/PE/)) {
                probabilityOfDelay += 50;
                delayInMins += 30;
            }
        }


    }

    if(probabilityOfDelay > 99) probabilityOfDelay = 99;
    if(probabilityOfDelay < 1) probabilityOfDelay = 1;
    console.log("Prob" + probabilityOfDelay + " time: " + delayInMins);
    return {probability: probabilityOfDelay, delay: delayInMins};
};

module.exports = countProbability;
