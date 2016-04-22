/**
 * Created by robben1 on 4/21/16.
 */

var countProbability = function (jsMetar
                                 // , baseDelay
) {
    var delayInMins = 0
    // + baseDelay;
        ;
    var probabilityOfDelay = 0;
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

            // TODO: wind ghost

        }
        // TODO: visibility
        if (jsMetar.visibility < 200) {
            probabilityOfDelay += 50;
            delayInMins += 25;
        }

        // TODO: clouds
        if(jsMetar.clouds != null) {
            if(!jsMetar.clouds.code.match(/BKN/) && !jsMetar.clouds.code.match(/OVC/)) {
                probabilityOfDelay += 5;
                delayInMins += 10;
            }
        }

        // TODO: rvr (only when visibility is bad)

        // TODO: weather (wind, right?)
        if (jsMetar.weather != null) {
            descriptor = jsMetar.weather.descriptor;
            if (descriptor.match(/FZ/) || descriptor.match(/SHSN/) || descriptor.match(/PE/)) {
                probabilityOfDelay += 50;
                delayInMins += 30;
            }
        }


    }

    if(probabilityOfDelay > 100) probabilityOfDelay = 100;
    console.log("Prob" + probabilityOfDelay + " time: " + delayInMins);
    return {probability: probabilityOfDelay, delay: delayInMins};
};

module.exports = countProbability;