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

    if(jsMetar == null) {
        probabilityOfDelay = 0;
        delayInMins = 0;
    } else {
        console.log("JS METAR: " + jsMetar);

        // TODO: wind course. Compare to route course?

        // TODO: wind speed
        // MPS
        if (jsMetar.wind.speed > 7) {
            probabilityOfDelay += 20;
            delayInMins += 25;
        }

        // TODO: wind ghost

        // TODO: visibility
        if (jsMetar.visibility > 800) {
            probabilityOfDelay += 20;
            delayInMins += 25;
        }

        // TODO: clouds

        // TODO: rvr (only when visibility is bad)

        // TODO: weather (wind, right?)


    }

    return {probability: probabilityOfDelay, delay: delayInMins};
};

module.exports = countProbability;